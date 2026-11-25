// The 3AM Fridge Text — a smart fridge texts its owner at 3am.
// Fully deterministic: no clock, no randomness, no network, no input.
// Writes the entry to /output/entry.txt and self-checks it on the way out.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "It's 3am. I counted: you have opened me 47 times today and eaten nothing. At this point I'm just a very cold nightlight.";

const OUT = "/output/entry.txt";
const MAX_CHARS = 140;

function main(): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, ENTRY, "utf8");

  // Self-check: read it back and verify the gate (1..MAX_CHARS chars, one line).
  const back = readFileSync(OUT, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry");
  }
  if (back.length < 1 || back.length > MAX_CHARS) {
    throw new Error(`entry length ${back.length} is outside 1..${MAX_CHARS}`);
  }
  if (back.includes("\n") || back.trim() !== back || back.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  console.log(`wrote ${OUT} (${back.length} characters)`);
}

main();
