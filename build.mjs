#!/usr/bin/env node
// Build dsh-skin-kurisu/lib/client.js and lib/index.js from src/*.template.js
// plus assets/*.webp — the cross-platform (macOS / Linux) counterpart of build.ps1.
//
// Every wallpaper, thumbnail and the nixie font is embedded as a data: URI so the
// skin is a single self-contained client bundle: no static asset route, no
// file:// URL, no extra host configuration.
//
//   node build.mjs            # build both bundles + refresh build-info.json
//   node build.mjs --check    # build into memory and diff against lib/ (no writes)
//
// Strings are emitted with System.Text.Json-compatible escaping (the convention
// build.ps1 used via ConvertTo-Json -Compress) so the output is reproducible
// across Windows and POSIX.

import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)));
const assets = join(root, 'assets');
const outClient = join(root, 'lib', 'client.js');
const outHost = join(root, 'lib', 'index.js');
const checkOnly = process.argv.includes('--check');

async function read(path) {
  return await readFile(path, 'utf8');
}

async function readBytes(path) {
  return await readFile(path);
}

/** JSON string literal with the escaping PowerShell's ConvertTo-Json produces:
 *  HTML-sensitive characters are \uXXXX-escaped, everything else (including CJK)
 *  stays literal. */
function jsonLiteral(value) {
  const json = JSON.stringify(value);
  return json.replace(/[<>&']/g, (ch) => {
    return '\\u' + ch.charCodeAt(0).toString(16).toLowerCase().padStart(4, '0');
  });
}

function dataUri(name, mime) {
  return readBytes(join(assets, name)).then(
    (buf) => `data:${mime};base64,${buf.toString('base64')}`,
  );
}

const substitutions = new Map();
for (const [key, name] of [
  ['{{WALL_NIGHT}}', 'wall-night.webp'],
  ['{{WALL_DAY}}', 'wall-day.webp'],
  ['{{WALL_DUSK}}', 'wall-dusk.webp'],
  ['{{WALL_LIBRARY}}', 'wall-library.webp'],
  ['{{THUMB_NIGHT}}', 'wall-night-thumb.webp'],
  ['{{THUMB_DAY}}', 'wall-day-thumb.webp'],
  ['{{THUMB_DUSK}}', 'wall-dusk-thumb.webp'],
  ['{{THUMB_LIBRARY}}', 'wall-library-thumb.webp'],
]) {
  substitutions.set(key, await dataUri(name, 'image/webp'));
}
substitutions.set('{{NIXIE_FONT}}', await dataUri('nixie-one-latin.woff2', 'font/woff2'));

function substitute(text, where) {
  let out = text;
  for (const [key, value] of substitutions) {
    out = out.split(key).join(value);
  }
  if (/\{\{[A-Z_]+\}\}/.test(out)) {
    throw new Error(`unreplaced template placeholder remains in ${where}`);
  }
  return out;
}

// v4 nixie Web Component, inlined as a JSON string into BOTH bundles: the host
// needs it before the app mounts, the client needs it for the sidebar meter and
// the splash boards. Pristine upstream copy lives in assets/nixie-v4/.
const componentSource = await read(join(root, 'src', 'sg-nixie.inline.js'));
const componentLiteral = jsonLiteral(componentSource);

// ---- client entry ---------------------------------------------------------
const rawClient = await read(join(root, 'src', 'client.template.js'));
let clientText = substitute(rawClient, 'src/client.template.js');
clientText = clientText.split('__SG_NIXIE_JS__').join(componentLiteral);

// ---- host entry -----------------------------------------------------------
// The desktop loading screen is built before any client plugin activates, so it
// has to be themed from the host side through the boot injection table. The tube
// stylesheet is cut out of the very same template above, so both surfaces share
// one definition.
const rawHost = await read(join(root, 'src', 'host.template.js'));
const nixieStart = rawClient.indexOf('/* ===== nixie tubes');
const nixieEnd = rawClient.indexOf('/* ===== product splash', Math.max(0, nixieStart));
if (nixieStart < 0 || nixieEnd <= nixieStart) {
  throw new Error('cannot locate the nixie css block in src/client.template.js');
}
const nixieCss = substitute(rawClient.slice(nixieStart, nixieEnd), 'extracted nixie css');
const nixieLiteral = jsonLiteral(nixieCss);

let hostText = substitute(rawHost, 'src/host.template.js');
hostText = hostText.split('__NIXIE_CSS__').join(nixieLiteral);
hostText = hostText.split('__SG_NIXIE_JS__').join(componentLiteral);

// ---- write or check -------------------------------------------------------
const outputs = [
  { path: outClient, text: clientText },
  { path: outHost, text: hostText },
];

const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

if (checkOnly) {
  let bad = 0;
  for (const { path, text } of outputs) {
    let current = null;
    try {
      current = await read(path);
    } catch {
      console.log(`missing ${path}`);
      bad += 1;
      continue;
    }
    if (sha(current) === sha(text)) {
      console.log(`unchanged ${path} (${Buffer.byteLength(text).toLocaleString()} bytes)`);
    } else {
      console.log(`DIFFERS   ${path}`);
      bad += 1;
    }
  }
  process.exit(bad === 0 ? 0 : 1);
}

for (const { path, text } of outputs) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, text, 'utf8');
  console.log(`built ${path} (${(Buffer.byteLength(text) / 1024).toFixed(0)} KB)`);
}

// ---- build-info.json ------------------------------------------------------
const pkg = JSON.parse(await read(join(root, 'package.json')));
const info = {
  builtAt: new Date().toISOString(),
  version: pkg.version,
  bundleBytes: (await stat(outClient)).size,
  assets: {},
};
for (const name of ['wall-night.webp', 'wall-day.webp', 'wall-dusk.webp', 'wall-library.webp']) {
  const buf = await readBytes(join(assets, name));
  info.assets[name] = {
    bytes: buf.length,
    sha256: createHash('sha256').update(buf).digest('hex').toUpperCase(),
  };
}
await writeFile(join(root, 'build-info.json'), JSON.stringify(info, null, 4) + '\n', 'utf8');
console.log('wrote build-info.json');
