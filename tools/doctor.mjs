#!/usr/bin/env node
// Post-update health check for the skin's coupling to the host UI.
//
// The skin reaches into host markup for two kinds of things:
//   1. stable hooks the product deliberately publishes (data-* attributes and
//      slot names), and
//   2. class-name *substrings* (`[class*="_centerCol"]`) because the CSS-module
//      hash prefix is regenerated every build.
// Both can silently stop matching after a DSH upgrade — a dead selector looks
// exactly like a working one until you notice the styling is gone. This script
// greps the installed app.asar and prints what still resolves.
//
//   node tools/doctor.mjs [path/to/app.asar]
import { openAsar } from "/tmp/asar-read2.mjs";

const DEFAULT_ASAR = "/Applications/AI助手/DeepSeek Harness.app/Contents/Resources/app.asar";

const DATA_HOOKS = [
  "data-composer-card",
  "data-composer-seat",
  "data-composer-dock",
  "data-composer-input",
  "data-rightbar-col",
  "data-rightbar-fullscreen",
  "data-sidebar-right-panel",
  "data-shell-bottom",
  "data-conversation-region",
  "data-ds-dark-theme",
  "data-platform",
];

const CLASS_SUBSTRINGS = [
  "_frame",
  "_centerCol",
  "_sidebarCol",
  "_bottomRow",
  "_rightbarCol",
  "_toggle",
  "_brandMark",
  "_brandName",
  "_root",
  "_collapsed",
  "_primary",
  "_add",
  "_row",
];

const SLOTS = [
  "settings.general.item",
  "sidebar.brand.mark",
  "sidebar.brand.name",
  "sidebar.footer.action",
  "conversation.hero.brand.mark",
  "webserver/index-inject",
];

const file = process.argv[2] || DEFAULT_ASAR;
const a = openAsar(file);
// Only DeepSeek's own packages can own a host hook; scanning e.g. an SDK's
// vendored bundle would report a false "ok".
const paths = a.list().filter((p) => p.endsWith(".js") && p.includes("/node_modules/@deepseek-ai/"));
const blobs = [];
for (const p of paths) {
  let buf;
  try {
    buf = a.read(p);
  } catch {
    continue;
  }
  if (buf.length > 8 * 1024 * 1024) continue; // skip the multi-MB host bundle
  blobs.push({ path: p, text: buf.toString("latin1") });
}
a.close();

const where = (needle) => {
  for (const b of blobs) if (b.text.includes(needle)) return b.path.replace(/^\/dsh\/node_modules\//, "").replace(/\/lib\/client\.js$/, "");
  return null;
};

let missing = 0;
const row = (label, hit) => {
  if (!hit) missing++;
  console.log(`${hit ? "ok   " : "GONE "} ${label}${hit ? `  (${hit})` : ""}`);
};

console.log(`scanning ${file}`);
console.log(`  ${paths.length} js files, ${blobs.length} scanned\n`);
console.log("data-* hooks");
for (const h of DATA_HOOKS) row(h, where(h));
console.log("\nclass-name substrings");
for (const c of CLASS_SUBSTRINGS) row(c, where(c));
console.log("\nslots / seams");
for (const s of SLOTS) row(s, where(s));

console.log(
  missing === 0
    ? "\nall hooks resolve — nothing to do after this host build."
    : `\n${missing} hook(s) no longer resolve. Update the matching selector in src/client.template.js before the next build.`
);
process.exitCode = missing === 0 ? 0 : 1;
