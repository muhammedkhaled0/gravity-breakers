import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.resolve(rootDir, "backend/data");
const audioBaseDir = path.resolve(rootDir, "frontend/public/audio");

const isStrict = process.argv.includes("--strict");

const languages = ["ar", "en"];
const expectedFiles = new Set();
const missingAudio = [];

function checkAndSetAudio(audioObj, expectedFilenameBase, locationDesc) {
  if (!audioObj) audioObj = {};
  for (const lang of languages) {
    const expectedRelPath = `/audio/${lang}/${expectedFilenameBase}.mp3`;
    const fullPath = path.join(audioBaseDir, lang, `${expectedFilenameBase}.mp3`);
    expectedFiles.add(path.normalize(fullPath).toLowerCase());

    if (fs.existsSync(fullPath)) {
      audioObj[lang] = expectedRelPath;
    } else {
      audioObj[lang] = null;
      missingAudio.push({ lang, file: expectedRelPath, location: locationDesc });
    }
  }
  return audioObj;
}

console.log("Scanning audio attachments across data files...");

// 1. journey.json
const journeyPath = path.join(dataDir, "journey.json");
if (fs.existsSync(journeyPath)) {
  const journey = JSON.parse(fs.readFileSync(journeyPath, "utf8"));

  journey.map?.lines?.forEach((line, i) => {
    line.audio = checkAndSetAudio(line.audio, `map-${i + 1}`, `map narration line ${i + 1}`);
  });

  if (journey.map?.lockedQuiz) {
    journey.map.lockedQuiz.audio = checkAndSetAudio(journey.map.lockedQuiz.audio, "locked-quiz", "map locked quiz hint");
  }
  if (journey.map?.lockedBonus) {
    journey.map.lockedBonus.audio = checkAndSetAudio(journey.map.lockedBonus.audio, "locked-bonus", "map locked bonus hint");
  }

  journey.earth?.lines?.forEach((line, i) => {
    line.audio = checkAndSetAudio(line.audio, `earth-${i + 1}`, `earth narration line ${i + 1}`);
  });

  if (journey.earth?.cards) {
    for (const [k, card] of Object.entries(journey.earth.cards)) {
      card.audio = checkAndSetAudio(card.audio, `earth-card-${card.cardKey}`, `earth card ${card.cardKey}`);
    }
  }

  fs.writeFileSync(journeyPath, JSON.stringify(journey, null, 2), "utf8");
}

// 2. moon.json & mars.json
function processWorldFile(filename) {
  const p = path.join(dataDir, filename);
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, "utf8"));

  for (const world of data.worlds || []) {
    const prefix = world.id === "deepspace" ? "bonus" : world.id;

    world.narration?.forEach((line, i) => {
      line.audio = checkAndSetAudio(line.audio, `${prefix}-${i + 1}`, `${world.id} narration line ${i + 1}`);
    });

    for (const m of world.machines || []) {
      if (m.card) {
        m.card.audio = checkAndSetAudio(m.card.audio, `${prefix}-card-${m.card.cardKey}`, `${world.id} machine card ${m.card.cardKey}`);
      }
    }

    for (const sc of world.storyCards || []) {
      sc.audio = checkAndSetAudio(sc.audio, `${prefix}-card-${sc.cardKey}`, `${world.id} storyCard ${sc.cardKey}`);
    }
  }

  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

processWorldFile("moon.json");
processWorldFile("mars.json");

// Find orphan audio files
const orphanAudio = [];
for (const lang of languages) {
  const langDir = path.join(audioBaseDir, lang);
  if (fs.existsSync(langDir)) {
    const files = fs.readdirSync(langDir);
    for (const f of files) {
      if (f.endsWith(".mp3")) {
        const full = path.normalize(path.join(langDir, f)).toLowerCase();
        if (!expectedFiles.has(full)) {
          orphanAudio.push(`${lang}/${f}`);
        }
      }
    }
  }
}

// Report
console.log("\n================ AUDIO ATTACHMENT REPORT ================");
console.log(`Missing audio entries: ${missingAudio.length}`);
if (missingAudio.length > 0) {
  console.log("Note: Missing audio will automatically fallback to subtitle narration.");
  missingAudio.slice(0, 10).forEach((m) => console.log(`  - [${m.lang}] ${m.file} (${m.location})`));
  if (missingAudio.length > 10) console.log(`  ... and ${missingAudio.length - 10} more.`);
}

console.log(`\nOrphan audio files: ${orphanAudio.length}`);
orphanAudio.forEach((f) => console.log(`  - ${f}`));

console.log("=========================================================");

if (isStrict && missingAudio.length > 0) {
  console.error("Strict mode: Fails on missing audio.");
  process.exit(1);
} else {
  console.log("Audio scan & attachment updated successfully.");
  process.exit(0);
}
