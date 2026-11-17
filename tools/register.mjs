#!/usr/bin/env node
// Register (or unregister) dsh-skin-kurisu as a real dependency of a DSH profile.
//
// Why this exists: copying a package into <profile>/node_modules is not enough.
// `pnpm install` — which DSH runs on profile changes and on some boots — prunes
// every directory that the lockfile does not mention. The skin then vanishes at
// the next restart, which looks exactly like "my theme disappeared".
//
// Keeping the package declared in package.json dependencies + dsh.profile.bundles,
// and recorded in pnpm-lock.yaml importers, makes it survive those reinstalls:
// pnpm re-creates it as a `link:` (symlink to this repo) rather than deleting it.
//
//   node tools/register.mjs --profile ~/.dsh/profiles/desktop
//   node tools/register.mjs --profile ~/.dsh/profiles/desktop --remove
//   node tools/register.mjs --profile ... --dry-run

import fs from "node:fs";
import path from "node:path";

const REL = "dsh-skin-kurisu";

function parseArgs(argv) {
  const out = { profile: process.env.DSH_PROFILE_DIR || path.join(process.env.HOME, ".dsh/profiles/desktop"), remove: false, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--profile") out.profile = argv[++i];
    else if (a.startsWith("--profile=")) out.profile = a.slice("--profile=".length);
    else if (a === "--remove") out.remove = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "-h" || a === "--help") {
      console.log("usage: node tools/register.mjs [--profile <dir>] [--remove] [--dry-run]");
      process.exit(0);
    } else {
      console.error(`unknown argument: ${a}`);
      process.exit(2);
    }
  }
  return out;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  // 2-space indent + trailing newline: matches what the DSH profile writer emits,
  // so a later rewrite by DSH produces a minimal diff.
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

// --- package.json ----------------------------------------------------------

function patchPackageJson(profileDir, linkTarget, remove, dryRun) {
  const file = path.join(profileDir, "package.json");
  const pkg = readJson(file);
  const changed = [];

  pkg.dependencies = pkg.dependencies || {};
  if (remove) {
    if (REL in pkg.dependencies) {
      delete pkg.dependencies[REL];
      changed.push(`dependencies: -${REL}`);
    }
  } else {
    const wanted = `link:${linkTarget}`;
    if (pkg.dependencies[REL] !== wanted) {
      pkg.dependencies[REL] = wanted;
      changed.push(`dependencies: ${REL}=${wanted}`);
    }
  }

  const profile = (pkg.dsh && pkg.dsh.profile) || null;
  if (profile) {
    const bundles = Array.isArray(profile.bundles) ? profile.bundles : [];
    const at = bundles.indexOf(REL);
    if (remove && at !== -1) {
      bundles.splice(at, 1);
      changed.push(`bundles: -${REL}`);
    } else if (!remove && at === -1) {
      bundles.push(REL);
      changed.push(`bundles: +${REL}`);
    }
    profile.bundles = bundles;
    pkg.dsh.profile = profile;
  }

  if (changed.length && !dryRun) writeJson(file, pkg);
  return changed;
}

// --- pnpm-lock.yaml --------------------------------------------------------

function lockEntry(linkTarget) {
  // pnpm stores the specifier verbatim and resolves the target relative to the
  // importer directory. Both are needed; a specifier without the version line
  // makes pnpm treat the lockfile as out of date.
  const rel = path.relative(profileImporterDir, linkTarget);
  return [
    `      ${REL}:`,
    `        specifier: link:${linkTarget}`,
    `        version: link:${rel}`,
    "",
  ].join("\n");
}

let profileImporterDir = "";

function patchLockfile(profileDir, linkTarget, remove, dryRun) {
  const file = path.join(profileDir, "pnpm-lock.yaml");
  if (!fs.existsSync(file)) return [];
  const text = fs.readFileSync(file, "utf8");
  const changed = [];

  const block = new RegExp(`^      ${REL}:\\n(?:        .*\\n)+`, "m");
  const has = block.test(text);

  if (remove) {
    if (!has) return [];
    const next = text.replace(block, "");
    if (!dryRun) fs.writeFileSync(file, next);
    return ["pnpm-lock.yaml: -entry"];
  }

  if (has) {
    // Refresh the specifier/target if the repo moved.
    const next = text.replace(block, lockEntry(linkTarget));
    if (next !== text) {
      if (!dryRun) fs.writeFileSync(file, next);
      changed.push("pnpm-lock.yaml: ~entry");
    }
    return changed;
  }

  // Insert alphabetically inside importers["."].dependencies, matching pnpm's own
  // ordering — a stable insert means pnpm does not rewrite the file on next run.
  const lines = text.split("\n");
  const depsStart = lines.findIndex((l) => l === "    dependencies:");
  if (depsStart === -1) return [];

  let insertAt = -1;   // index of the entry we sort before
  let depsEnd = -1;    // index one past the last dependency entry
  for (let i = depsStart + 1; i < lines.length; i += 1) {
    const m = /^      (\S.*):$/.exec(lines[i]);
    if (!m) {
      if (/^    \S/.test(lines[i]) || /^\S/.test(lines[i])) { depsEnd = i; break; }
      continue;
    }
    const name = m[1].replace(/^'(.*)'$/, "$1");
    if (insertAt === -1 && name > REL) insertAt = i;
  }
  if (depsEnd === -1) depsEnd = lines.length;
  if (insertAt === -1) insertAt = depsEnd;

  const entry = lockEntry(linkTarget).split("\n").filter((l) => l !== "");
  const next = [...lines.slice(0, insertAt), ...entry, ...lines.slice(insertAt)];
  if (!dryRun) fs.writeFileSync(file, next.join("\n"));
  changed.push("pnpm-lock.yaml: +entry");
  return changed;
}

// --- main ------------------------------------------------------------------

const args = parseArgs(process.argv.slice(2));
const profileDir = fs.realpathSync(args.profile);
profileImporterDir = profileDir;
const linkTarget = fs.realpathSync(path.resolve(path.dirname(new URL(import.meta.url).pathname), ".."));

if (!fs.existsSync(path.join(profileDir, "package.json"))) {
  console.error(`error: not a DSH profile (no package.json): ${profileDir}`);
  process.exit(1);
}

const changes = [
  ...patchPackageJson(profileDir, linkTarget, args.remove, args.dryRun),
  ...patchLockfile(profileDir, linkTarget, args.remove, args.dryRun),
];

const verb = args.remove ? "unregistered" : "registered";
if (!changes.length) {
  console.log(`${REL} already ${verb} in ${profileDir} (nothing to do)`);
} else {
  console.log(`${args.dryRun ? "[dry-run] would have " : ""}${verb} ${REL} in ${profileDir}`);
  for (const c of changes) console.log(`  ${c}`);
  if (!args.dryRun) {
    console.log("");
    console.log("Next: run `pnpm install --offline` in the profile so the link is materialised,");
    console.log("then restart DSH. The skin now survives future pnpm reinstalls.");
  }
}
