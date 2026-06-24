import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

mkdirSync(join(standalone, ".next"), { recursive: true });
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), {
  recursive: true,
});

const publicDirectory = join(root, "public");
if (existsSync(publicDirectory)) {
  cpSync(publicDirectory, join(standalone, "public"), { recursive: true });
}
