import fs from "node:fs";
import path from "node:path";
import { UserError } from "../shared/user-error.mjs";

export function writeMarkdownFile(filePath, markdown) {
  try { fs.mkdirSync(path.dirname(filePath), { recursive: true }); fs.writeFileSync(filePath, markdown, "utf8"); }
  catch (error) { throw new UserError(`Cannot write output file: ${filePath}`, error.message); }
}
