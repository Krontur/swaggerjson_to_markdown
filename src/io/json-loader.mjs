import fs from "node:fs";
import { UserError } from "../shared/user-error.mjs";

export function loadJsonFile(filePath) {
  if (!fs.existsSync(filePath)) throw new UserError(`Input file not found: ${filePath}`);
  try { return JSON.parse(fs.readFileSync(filePath, "utf8")); }
  catch (error) {
    if (error instanceof SyntaxError) throw new UserError(`Invalid JSON file: ${filePath}`, error.message);
    throw new UserError(`Cannot read input file: ${filePath}`, error.message);
  }
}
