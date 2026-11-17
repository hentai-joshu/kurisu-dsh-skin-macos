#!/usr/bin/env bash
# Install dsh-skin-kurisu into a DSH profile — macOS / Linux counterpart of install.ps1.
#
#   ./install.sh                          # install into ~/.dsh/profiles/desktop
#   ./install.sh --profile /path/to/prof  # install into another profile
#   ./install.sh --no-patch               # register the dependency only, do not touch cordis.patch.yml
#   ./install.sh --dry-run                # show what would happen, change nothing
#
# Idempotent: re-running only refreshes the symlink; the dependency entry and the patch row are never duplicated.
# Every patch to cordis.patch.yml is preceded by a timestamped .bak-kurisu-* copy.

set -euo pipefail

PROFILE_DIR="${DSH_PROFILE_DIR:-$HOME/.dsh/profiles/desktop}"
NO_PATCH=0
DRY_RUN=0

usage() {
  sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

while [ $# -gt 0 ]; do
  case "$1" in
    --profile)   [ $# -ge 2 ] || { echo "missing value for --profile" >&2; exit 2; }; PROFILE_DIR="$2"; shift 2 ;;
    --profile=*) PROFILE_DIR="${1#*=}"; shift ;;
    --no-patch)  NO_PATCH=1; shift ;;
    --dry-run)   DRY_RUN=1; shift ;;
    -h|--help)   usage 0 ;;
    *) echo "unknown argument: $1" >&2; usage 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f "$ROOT/lib/client.js" ]; then
  echo "error: lib/client.js is missing — run \`node build.mjs\` first (build output is not committed)" >&2
  exit 1
fi

if [ ! -d "$PROFILE_DIR" ]; then
  echo "error: profile directory not found: $PROFILE_DIR" >&2
  echo "       pass --profile <dir> or set DSH_PROFILE_DIR" >&2
  exit 1
fi

PROFILE_DIR="$(cd "$PROFILE_DIR" && pwd)"
DEST="$PROFILE_DIR/node_modules/dsh-skin-kurisu"
EXPECTED_PARENT="$PROFILE_DIR/node_modules"

if [ "$(dirname "$DEST")" != "$EXPECTED_PARENT" ] || [ "$(basename "$DEST")" != "dsh-skin-kurisu" ]; then
  echo "error: refusing to write outside the profile node_modules: $DEST" >&2
  exit 1
fi

echo "profile : $PROFILE_DIR"
echo "package : $DEST"
echo

if [ "$DRY_RUN" -eq 1 ]; then
  echo "[dry-run] would register dsh-skin-kurisu as a link: dependency and install it as a symlink"
  if [ "$NO_PATCH" -eq 1 ]; then
    echo "[dry-run] --no-patch given, cordis.patch.yml untouched"
  elif grep -q '"dsh-skin-kurisu"' "$PROFILE_DIR/package.json" 2>/dev/null \
     && grep -qE 'id:[[:space:]]*dsh-skin-kurisu' "$PROFILE_DIR/cordis.patch.yml" 2>/dev/null; then
    # already registered AND the legacy patch row is still there -> we would report it, not duplicate it
    echo "[dry-run] patch row already present in cordis.patch.yml (kept as-is)"
  else
    # registration goes through package.json's dsh.profile.bundles; the profile patch stays untouched
    echo "[dry-run] cordis.patch.yml stays untouched (the bundle loader applies the package's own patch)"
  fi
  exit 0
fi

mkdir -p "$PROFILE_DIR/node_modules"
rm -rf "$DEST"

# Copying alone is not durable: `pnpm install` prunes any node_modules directory the
# lockfile does not mention, so the skin disappears at the next DSH restart. Register
# it as a real `link:` dependency (package.json + pnpm-lock.yaml) and install it as a
# symlink to this repo, which is exactly what pnpm would create for a link: specifier.
REGISTERED=0
if command -v node >/dev/null 2>&1; then
  if node "$ROOT/tools/register.mjs" --profile "$PROFILE_DIR"; then
    REGISTERED=1
  fi
else
  echo "warning: node not found — skipped dependency registration." >&2
fi

if [ "$REGISTERED" -eq 1 ] && ln -s "$ROOT" "$DEST" 2>/dev/null; then
  echo "installed package -> $DEST (symlink to $ROOT)"
  echo "note: the profile now owns a live link, so edits + \`node build.mjs\` take effect on reload."
else
  mkdir -p "$DEST"
  for item in package.json cordis.patch.yml lib assets README.md; do
    if [ -e "$ROOT/$item" ]; then
      cp -R "$ROOT/$item" "$DEST/"
    fi
  done
  echo "installed package -> $DEST (copied)"
  echo "warning: copied installs are removed by the next 'pnpm install'." >&2
fi


if [ "$NO_PATCH" -eq 1 ]; then
  echo "--no-patch given, cordis.patch.yml untouched"
elif [ "$REGISTERED" -eq 1 ]; then
  # A registered bundle gets its own cordis.patch.yml applied by the bundle loader,
  # so appending the same insert row to the profile patch would register it twice.
  echo "cordis.patch.yml left alone (the bundle loader applies the package's own patch)"
else
  PATCH="$PROFILE_DIR/cordis.patch.yml"
  if [ ! -f "$PATCH" ]; then
    echo "error: profile patch not found: $PATCH" >&2
    exit 1
  fi
  if grep -qE 'id:[[:space:]]*dsh-skin-kurisu' "$PATCH"; then
    echo "patch row already present in $PATCH"
  else
    STAMP="$(date +%Y%m%d-%H%M%S)"
    BACKUP="$PATCH.bak-kurisu-$STAMP"
    cp "$PATCH" "$BACKUP"
    # make sure the file ends with a newline before appending
    if [ -n "$(tail -c 1 "$PATCH")" ]; then
      printf '\n' >> "$PATCH"
    fi
    cat >> "$PATCH" <<'YAML'
# dsh-skin-kurisu: Makise Kurisu theme + switchable wallpapers (Settings -> General).
- insert:
    - id: dsh-skin-kurisu
      name: "dsh-skin-kurisu"
YAML
    echo "patched $PATCH"
    echo "backup  -> $(basename "$BACKUP")"
  fi

  # fail loudly here rather than at the next DSH boot
  if command -v python3 >/dev/null 2>&1; then
    if ! python3 "$ROOT/tools/validate-patch.py" "$PATCH"; then
      echo "error: $PATCH no longer parses as YAML — restore the backup listed above" >&2
      exit 1
    fi
  fi
fi

echo
echo "Done."
echo "Reload the profile (or restart DSH) so the bundle registers."
echo "Then open Settings -> General -> \"Makise Kurisu\" to pick a wallpaper."
