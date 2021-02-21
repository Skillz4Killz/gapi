import fs from "fs";
import path from "path";

/** Walks through a directory allowing you to process it with a for await loop */
export async function* walk(dir: string): AsyncGenerator<any, any, unknown> {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* await walk(entry);
        else if (d.isFile()) yield [d.name, require(entry)];
    }
}