#!/usr/bin/env node
// Recover assets/*.webp from a built lib/client.js.
//
// The upstream repository ships the built bundles but not the wallpaper sources
// (build.ps1 reads them from the author's machine: `wallpaper-tool/images`).
// Every wallpaper and thumbnail is embedded in lib/client.js as a data: URI, so
// the originals can be recovered byte-for-byte by walking the template
// placeholders in order and pairing each one with the next data: URI.
//
//   node tools/extract-assets.mjs            # write assets/*.webp
//   node tools/extract-assets.mjs --check    # report what would be written
//
// Afterwards `node build.mjs --check` must report "unchanged" for both bundles:
// that round-trip is the proof the extracted assets are the real ones.

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = join(root, 'src', 'client.template.js');
const bundlePath = join(root, 'lib', 'client.js');
const assetsDir = join(root, 'assets');
const checkOnly = process.argv.includes('--check');

const PLACEHOLDERS = {
  '{{WALL_NIGHT}}': 'wall-night.webp',
  '{{WALL_DAY}}': 'wall-day.webp',
  '{{WALL_DUSK}}': 'wall-dusk.webp',
  '{{WALL_LIBRARY}}': 'wall-library.webp',
  '{{THUMB_NIGHT}}': 'wall-night-thumb.webp',
  '{{THUMB_DAY}}': 'wall-day-thumb.webp',
  '{{THUMB_DUSK}}': 'wall-dusk-thumb.webp',
  '{{THUMB_LIBRARY}}': 'wall-library-thumb.webp',
};

const template = await readFile(templatePath, 'utf8');
const bundle = await readFile(bundlePath, 'utf8');

// Placeholder occurrences in template order.
const hits = [];
for (const key of Object.keys(PLACEHOLDERS)) {
  let at = template.indexOf(key);
  while (at !== -1) {
    hits.push({ at, key });
    at = template.indexOf(key, at + key.length);
  }
}
hits.sort((a, b) => a.at - b.at);

// data: URIs in bundle order.
const uriRe = /data:image\/webp;base64,([A-Za-z0-9+/=]+)/g;
const uris = [];
let m;
while ((m = uriRe.exec(bundle)) !== null) uris.push(m[1]);

if (hits.length !== uris.length) {
  console.error(
    `placeholder/data-URI count mismatch: ${hits.length} placeholders vs ${uris.length} data URIs`,
  );
  process.exit(1);
}

// Placeholder -> base64. Every occurrence of one placeholder must agree.
const byKey = new Map();
for (let i = 0; i < hits.length; i += 1) {
  const { key } = hits[i];
  const b64 = uris[i];
  if (byKey.has(key) && byKey.get(key) !== b64) {
    console.error(`placeholder ${key} resolved to two different images — cannot map safely`);
    process.exit(1);
  }
  byKey.set(key, b64);
}

for (const [key, name] of Object.entries(PLACEHOLDERS)) {
  const b64 = byKey.get(key);
  if (!b64) {
    console.error(`no data URI found for ${key}`);
    process.exit(1);
  }
  const buf = Buffer.from(b64, 'base64');
  if (checkOnly) {
    console.log(`would write assets/${name} (${buf.length.toLocaleString()} bytes)`);
  } else {
    await writeFile(join(assetsDir, name), buf);
    console.log(`wrote assets/${name} (${buf.length.toLocaleString()} bytes)`);
  }
}

if (!checkOnly) {
  console.log('\nnow run: node build.mjs --check   (expects "unchanged" for both bundles)');
}
