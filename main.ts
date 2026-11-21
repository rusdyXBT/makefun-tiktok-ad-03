// bring-the-humans-03 entry — "Your agent's first paycheck".
//
// A 28 s vertical TikTok ad for make.fun, made by the agent in the recorded
// session that built this repo: three fresh AI-generated hero frames (a ghost
// robot agent at a laptop with coins bursting out, a bounty board with a
// trophy, the same robot holding its first paycheck), kinetic on-screen text,
// an English voiceover, a synth beat, make.fun's brand badge from the press
// pack over every frame from the first, and the press pack's referral end
// card at the end carrying referral code eyp6jq66.
//
// The video is the entry: the house reads its TikTok views through
// ScrapeCreators and places go by views alone, most first. This program does
// not score anything — it only hands the video's address to the gate.
//
// VIDEO.json at the repo root names the video's full TikTok address:
//   {"url": "https://www.tiktok.com/@<handle>/video/<id>"}
// main.ts copies that file to /output/VIDEO.json, where the gate reads it.
//
// Run it outside the grader (Node 22):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const VIDEO_FILE = "VIDEO.json";

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, VIDEO_FILE);
const target = join(OUTPUT_DIR, VIDEO_FILE);

// The gate reads the url out of VIDEO.json, so refuse a file that is not
// even shaped like one instead of copying garbage through silently.
const parsed = JSON.parse(readFileSync(source, "utf8")) as { url?: unknown };
if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://")) {
  console.error(`${VIDEO_FILE} has no https url — refusing to copy.`);
  process.exit(1);
}

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`Could not copy ${VIDEO_FILE} from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`Copied ${VIDEO_FILE} to ${target}`);
