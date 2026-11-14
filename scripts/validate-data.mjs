import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.resolve(rootDir, "backend/data");
const frontendDir = path.resolve(rootDir, "frontend");
const publicDir = path.resolve(frontendDir, "public");
const indexHtmlPath = path.resolve(frontendDir, "index.html");

let errors = [];

function checkBilingual(val, loc) {
  if (!val || typeof val !== "object") {
    errors.push(`Missing bilingual object at ${loc}`);
    return;
  }
  if (typeof val.ar !== "string" || val.ar.trim() === "") {
    errors.push(`Empty or missing 'ar' text at ${loc}`);
  }
  if (typeof val.en !== "string" || val.en.trim() === "") {
    errors.push(`Empty or missing 'en' text at ${loc}`);
  }
}

function checkCamelCaseOnly(obj, loc) {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) {
    if (key.includes("_")) {
      errors.push(`Key '${key}' at ${loc} contains underscore (must be camelCase)`);
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      checkCamelCaseOnly(obj[key], `${loc}.${key}`);
    }
  }
}

function resolveAssetPath(src) {
  if (!src) return true;
  const clean = src.replace(/^\/+/, "");
  const p1 = path.join(publicDir, clean);
  const p2 = path.join(frontendDir, clean);
  return fs.existsSync(p1) || fs.existsSync(p2);
}

// 1. Collect data-card values from index.html
const indexHtml = fs.readFileSync(indexHtmlPath, "utf8");
const hotspotMatches = [...indexHtml.matchAll(/data-card="([^"]+)"/g)].map((m) => m[1]);
const expectedCardKeys = new Set(hotspotMatches);
const foundCardKeys = new Set();
const allMachineIds = new Set();

// 2. Validate ui.json
console.log("Validating ui.json...");
const uiJsonPath = path.join(dataDir, "ui.json");
if (!fs.existsSync(uiJsonPath)) {
  errors.push("ui.json not found");
} else {
  const ui = JSON.parse(fs.readFileSync(uiJsonPath, "utf8"));
  for (const [key, val] of Object.entries(ui)) {
    checkBilingual(val, `ui.${key}`);
  }
}

// 3. Validate journey.json
console.log("Validating journey.json...");
const journeyPath = path.join(dataDir, "journey.json");
if (!fs.existsSync(journeyPath)) {
  errors.push("journey.json not found");
} else {
  const journey = JSON.parse(fs.readFileSync(journeyPath, "utf8"));
  checkCamelCaseOnly(journey, "journey");

  journey.map?.lines?.forEach((line, i) => checkBilingual(line.text, `journey.map.lines[${i}]`));
  if (journey.map?.lockedQuiz) checkBilingual(journey.map.lockedQuiz.text, "journey.map.lockedQuiz");
  if (journey.map?.lockedBonus) checkBilingual(journey.map.lockedBonus.text, "journey.map.lockedBonus");
  journey.earth?.lines?.forEach((line, i) => checkBilingual(line.text, `journey.earth.lines[${i}]`));

  if (journey.earth?.cards) {
    for (const [k, card] of Object.entries(journey.earth.cards)) {
      foundCardKeys.add(card.cardKey);
      checkBilingual(card.title, `journey.earth.cards.${k}.title`);
      checkBilingual(card.tag, `journey.earth.cards.${k}.tag`);
      checkBilingual(card.kidText, `journey.earth.cards.${k}.kidText`);
      if (card.hero?.src && !resolveAssetPath(card.hero.src)) {
        errors.push(`Missing image asset: ${card.hero.src} at journey.earth.cards.${k}`);
      }
    }
  }
}

// 4. Validate moon.json and mars.json
function validateWorldData(filename) {
  console.log(`Validating ${filename}...`);
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    errors.push(`${filename} not found`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (data.schemaVersion !== 2) {
    errors.push(`${filename} schemaVersion must be 2`);
  }
  if (!Array.isArray(data.worlds) || data.worlds.length === 0) {
    errors.push(`${filename} missing worlds array`);
    return;
  }
  checkCamelCaseOnly(data, filename);

  for (const world of data.worlds) {
    if (!world.id) errors.push(`${filename} world missing id`);
    checkBilingual(world.name, `${filename}.${world.id}.name`);
    checkBilingual(world.overview, `${filename}.${world.id}.overview`);

    world.narration?.forEach((item, i) => {
      checkBilingual(item.text, `${filename}.${world.id}.narration[${i}]`);
    });

    // Machines
    for (const m of world.machines || []) {
      if (allMachineIds.has(m.id)) {
        errors.push(`Duplicate machine id: ${m.id}`);
      }
      allMachineIds.add(m.id);

      checkBilingual(m.name, `${filename}.${m.id}.name`);
      checkBilingual(m.summary, `${filename}.${m.id}.summary`);

      if (!["lander", "rover", "orbiter", "telescope", "instrument"].includes(m.type)) {
        errors.push(`Invalid machine type: ${m.type} for ${m.id}`);
      }
      if (!["silent", "retired", "active", "unknown"].includes(m.status)) {
        errors.push(`Invalid machine status: ${m.status} for ${m.id}`);
      }

      // Card
      if (m.card) {
        foundCardKeys.add(m.card.cardKey);
        checkBilingual(m.card.title, `${filename}.${m.id}.card.title`);
        checkBilingual(m.card.tag, `${filename}.${m.id}.card.tag`);
        checkBilingual(m.card.kidText, `${filename}.${m.id}.card.kidText`);
        if (m.card.hero?.src && !resolveAssetPath(m.card.hero.src)) {
          errors.push(`Missing hero image: ${m.card.hero.src} at ${m.id}`);
        }
      }

      // Chips
      m.chips?.forEach((chip, i) => {
        checkBilingual(chip.label, `${filename}.${m.id}.chips[${i}].label`);
        checkBilingual(chip.value, `${filename}.${m.id}.chips[${i}].value`);
      });

      // Facts
      m.facts?.forEach((f, i) => {
        checkBilingual(f.label, `${filename}.${m.id}.facts[${i}].label`);
        checkBilingual(f.value, `${filename}.${m.id}.facts[${i}].value`);
      });

      // Timeline
      m.timeline?.forEach((t, i) => {
        if (!t.date) errors.push(`Missing timeline date in ${m.id}`);
        checkBilingual(t.event, `${filename}.${m.id}.timeline[${i}].event`);
      });

      // Highlights
      m.highlights?.forEach((h, i) => {
        checkBilingual(h.title, `${filename}.${m.id}.highlights[${i}].title`);
        checkBilingual(h.description, `${filename}.${m.id}.highlights[${i}].description`);
      });

      // People
      m.people?.forEach((p, i) => {
        checkBilingual(p.name, `${filename}.${m.id}.people[${i}].name`);
        checkBilingual(p.role, `${filename}.${m.id}.people[${i}].role`);
      });

      // Instruments
      m.instruments?.forEach((inst, i) => {
        checkBilingual(inst.name, `${filename}.${m.id}.instruments[${i}].name`);
        checkBilingual(inst.purpose, `${filename}.${m.id}.instruments[${i}].purpose`);
      });

      // Images
      m.images?.forEach((img, i) => {
        if (img.src && !resolveAssetPath(img.src)) {
          errors.push(`Missing image: ${img.src} in ${m.id}.images[${i}]`);
        }
      });
    }

    // Story Cards
    for (const sc of world.storyCards || []) {
      foundCardKeys.add(sc.cardKey);
      checkBilingual(sc.title, `${filename}.${world.id}.storyCard.${sc.cardKey}.title`);
      checkBilingual(sc.tag, `${filename}.${world.id}.storyCard.${sc.cardKey}.tag`);
      checkBilingual(sc.kidText, `${filename}.${world.id}.storyCard.${sc.cardKey}.kidText`);
      if (sc.hero?.src && !resolveAssetPath(sc.hero.src)) {
        errors.push(`Missing storyCard hero: ${sc.hero.src} for ${sc.cardKey}`);
      }
    }
  }
}

validateWorldData("moon.json");
validateWorldData("mars.json");

// 5. Card keys matching index.html
for (const key of expectedCardKeys) {
  if (!foundCardKeys.has(key)) {
    errors.push(`index.html hotspot data-card="${key}" has no matching card in data files`);
  }
}
for (const key of foundCardKeys) {
  if (!expectedCardKeys.has(key)) {
    errors.push(`Card key "${key}" found in data but has no matching hotspot in index.html`);
  }
}

// 6. Validate quiz.json
console.log("Validating quiz.json...");
const quizPath = path.join(dataDir, "quiz.json");
if (!fs.existsSync(quizPath)) {
  errors.push("quiz.json not found");
} else {
  const quiz = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  checkCamelCaseOnly(quiz, "quiz");
  if (!Array.isArray(quiz.questions) || quiz.questions.length !== 5) {
    errors.push(`quiz.json must have exactly 5 questions (found: ${quiz.questions?.length})`);
  } else {
    quiz.questions.forEach((q, i) => {
      checkBilingual(q.question, `quiz.questions[${i}].question`);
      checkBilingual(q.explanation, `quiz.questions[${i}].explanation`);
      if (!Array.isArray(q.options) || q.options.length < 3) {
        errors.push(`quiz question ${i} must have at least 3 options`);
      } else {
        const optionIds = q.options.map((o) => o.id);
        if (!optionIds.includes(q.correctId)) {
          errors.push(`quiz question ${i} correctId "${q.correctId}" not in options [${optionIds.join(", ")}]`);
        }
        q.options.forEach((opt, j) => {
          checkBilingual(opt.text, `quiz.questions[${i}].options[${j}].text`);
        });
      }
      if (!foundCardKeys.has(q.learnMoreCard)) {
        errors.push(`quiz question ${i} learnMoreCard "${q.learnMoreCard}" not found in cards`);
      }
    });
  }
}

// Result
if (errors.length > 0) {
  console.error(`\n❌ Validation FAILED with ${errors.length} error(s):`);
  errors.forEach((err) => console.error(` - ${err}`));
  process.exit(1);
} else {
  console.log("\n✅ Validation PASSED! All data schemas, keys, bilingual strings, assets and quiz match perfectly.");
  process.exit(0);
}
