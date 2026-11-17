#!/usr/bin/env bash
# Remove dsh-skin-kurisu from a DSH profile — macOS / Linux counterpart of uninstall.ps1.
#
#   ./uninstall.sh                          # remove from ~/.dsh/profiles/desktop
#   ./uninstall.sh --profile /path/to/prof  # remove from another profile
#   ./uninstall.sh --dry-run                # show what would happen, change nothing
#
# Removes the package directory and the `- insert:` row this skin adds to
# cordis.patch.yml. A timestamped .bak-kurisu-uninstall-* copy is kept first.

set -euo pipefail

PROFILE_DIR="${DSH_PROFILE_DIR:-$HOME/.dsh/profiles/desktop}"
DRY_RUN=0

usage() {
  sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

while [ $# -gt 0 ]; do
  case "$1" in
    --profile)   [ $# -ge 2 ] || { echo "missing value for --profile" >&2; exit 2; }; PROFILE_DIR="$2"; shift 2 ;;
    --profile=*) PROFILE_DIR="${1#*=}"; shift ;;
    --dry-run)   DRY_RUN=1; shift ;;
    -h|--help)   usage 0 ;;
    *) echo "unknown argument: $1" >&2; usage 2 ;;
  esac
done

if [ ! -d "$PROFILE_DIR" ]; then
  echo "error: profile directory not found: $PROFILE_DIR" >&2
  exit 1
fi
PROFILE_DIR="$(cd "$PROFILE_DIR" && pwd)"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$PROFILE_DIR/node_modules/dsh-skin-kurisu"
PATCH="$PROFILE_DIR/cordis.patch.yml"

if [ "$(dirname "$DEST")" != "$PROFILE_DIR/node_modules" ]; then
  echo "error: unexpected path: $DEST" >&2
  exit 1
fi

echo "profile : $PROFILE_DIR"
echo

if [ -d "$DEST" ]; then
  if [ "$DRY_RUN" -eq 1 ]; then
    echo "[dry-run] would remove $DEST"
  else
    rm -rf "$DEST"
    echo "removed $DEST"
  fi
else
  echo "package not present, nothing to remove"
fi

# Deregister the link: dependency, otherwise pnpm re-creates the package on the
# next install and the skin keeps coming back.
if command -v node >/dev/null 2>&1 && [ -f "$PROFILE_DIR/package.json" ]; then
  if [ "$DRY_RUN" -eq 1 ]; then
    node "$ROOT/tools/register.mjs" --profile "$PROFILE_DIR" --remove --dry-run
  else
    node "$ROOT/tools/register.mjs" --profile "$PROFILE_DIR" --remove
  fi
fi

if [ -f "$PATCH" ]; then
  if grep -qE 'id:[[:space:]]*dsh-skin-kurisu' "$PATCH"; then
    if [ "$DRY_RUN" -eq 1 ]; then
      echo "[dry-run] would remove the dsh-skin-kurisu insert row from $PATCH"
    else
      STAMP="$(date +%Y%m%d-%H%M%S)"
      cp "$PATCH" "$PATCH.bak-kurisu-uninstall-$STAMP"
      python3 - "$PATCH" <<'PY'
import re, sys

path = sys.argv[1]
with open(path, encoding='utf-8', newline='') as fh:
    text = fh.read()

crlf = '\r\n' in text
lines = text.replace('\r\n', '\n').split('\n')

out, i, removed = [], 0, 0
insert_re = re.compile(r'^\s*-\s*insert:\s*$')
id_re = re.compile(r'^\s*-\s*id:\s*["\']?dsh-skin-kurisu["\']?\s*$')

while i < len(lines):
    if insert_re.match(lines[i]):
        # a block that mentions dsh-skin-kurisu within the next few lines belongs to this skin
        j = i + 1
        hit = False
        while j < len(lines) and j <= i + 6:
            if id_re.match(lines[j]):
                hit = True
                break
            if insert_re.match(lines[j]) or lines[j].startswith('- '):
                break
            j += 1
        if hit:
            # drop the comment line directly above, if it is ours
            if out and 'dsh-skin-kurisu' in out[-1] and out[-1].lstrip().startswith('#'):
                out.pop()
            # drop the whole insert block: until the next top-level "- " line
            k = i + 1
            while k < len(lines) and not lines[k].startswith('- ') and lines[k].strip() != '':
                k += 1
            # skip the blank lines that followed the block
            while k < len(lines) and lines[k].strip() == '':
                k += 1
            removed += 1
            i = k
            continue
    out.append(lines[i])
    i += 1

if removed == 0:
    print("warning: dsh-skin-kurisu row found but could not be parsed — remove it manually", file=sys.stderr)
    sys.exit(0)

new = '\n'.join(out)
new = new.rstrip('\n') + '\n'
if crlf:
    new = new.replace('\n', '\r\n')
with open(path, 'w', encoding='utf-8', newline='') as fh:
    fh.write(new)
print("removed %d insert block(s) from cordis.patch.yml" % removed)
PY
      echo "backup  -> $(basename "$PATCH.bak-kurisu-uninstall-$STAMP")"

      # sanity check the result still parses
      if command -v python3 >/dev/null 2>&1; then
        python3 "$ROOT/tools/validate-patch.py" "$PATCH" || {
          echo "error: $PATCH no longer parses as YAML — restore the backup listed above" >&2
          exit 1
        }
      fi
    fi
  else
    echo "no dsh-skin-kurisu row in cordis.patch.yml"
  fi
fi

echo
echo "Done. Reload the profile (or restart DSH) to drop the skin."
