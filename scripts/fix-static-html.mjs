import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const prerenderedDir = join(packageRoot, 'dist/server/prerendered-routes');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

let files;
try {
  files = await walk(prerenderedDir);
} catch {
  console.warn(
    '[postbuild] no prerendered routes found, skipping html lang fix',
  );
  process.exit(0);
}

let updated = 0;
for (const file of files) {
  if (!file.endsWith('.html')) continue;

  const relativePath = relative(prerenderedDir, file).split(sep).join('/');
  const isEnglish =
    relativePath === 'en.html' || relativePath.startsWith('en/');
  const lang = isEnglish ? 'en' : 'zh-CN';

  const html = await readFile(file, 'utf8');
  const next = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  if (next === html) continue;

  await writeFile(file, next);
  updated += 1;
  console.log(`[postbuild] ${relativePath} -> lang="${lang}"`);
}

console.log(`[postbuild] updated html lang in ${updated} file(s)`);
