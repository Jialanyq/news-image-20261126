import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copies entry.png byte for byte, so the output is fully deterministic:
// two runs always write the same bytes.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
if (!existsSync(source)) {
  throw new Error("entry.png is missing next to main.ts");
}
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);
const sourceBytes = statSync(source).size;
const targetBytes = statSync(target).size;
if (targetBytes !== sourceBytes) {
  throw new Error(
    `entry.png copy failed: wrote ${targetBytes} bytes, expected ${sourceBytes}`
  );
}
