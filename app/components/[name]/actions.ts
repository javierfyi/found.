"use server";

import { readFile } from "fs/promises";
import path from "path";

export async function getComponentSource(name: string): Promise<string | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "registry",
      "foundry",
      `${name}.tsx`,
    );
    return await readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
