import fs from 'fs';
import path from 'path';

/** Walks through a directory allowing you to process it with a for await loop */
export async function* walk(dir: string): AsyncGenerator<any, any, unknown> {
  const folder = await fs.promises.opendir(dir).catch(console.log);
  if (!folder) return;

  for await (const d of folder) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* await walk(entry);
    
    if (!entry.endsWith('.js')) continue;

    else if (d.isFile()) yield [d.name, require(entry)];
  }
}

/** Walks through a directory selecting the directory names */
export async function directoryNames(dir: string) {
  const folder = await fs.promises.opendir(dir).catch(console.log);
  if (!folder) return [];

  const directories: string[] = [];

  for await (const d of folder) {
    if (d.isDirectory()) directories.push(d.name);
  }

  return directories;
}
