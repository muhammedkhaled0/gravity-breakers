import uiData from "@data/ui.json";
import journeyData from "@data/journey.json";
import moonData from "@data/moon.json";
import marsData from "@data/mars.json";
import quizData from "@data/quiz.json";

function toArabicNum(num) {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num)
    .split("")
    .map((d) => digits[Number(d)] ?? d)
    .join("");
}

export function buildUIStrings() {
  const strings = { ar: {}, en: {} };
  for (const [key, val] of Object.entries(uiData)) {
    strings.ar[key] = val.ar;
    strings.en[key] = val.en;
  }
  return strings;
}

export function buildStoryData() {
  const moonWorld = moonData.worlds.find((w) => w.id === "moon");
  const marsWorld = marsData.worlds.find((w) => w.id === "mars");
  const deepspaceWorld = marsData.worlds.find((w) => w.id === "deepspace");

  const buildCards = (world, lang) => {
    const cards = {};
    if (!world) return cards;

    // Machines with cards
    for (const m of world.machines || []) {
      if (m.card) {
        cards[m.card.cardKey] = {
          cardKey: m.card.cardKey,
          title: m.card.title[lang],
          tag: m.card.tag[lang],
          text: m.card.kidText[lang],
          audio: m.card.audio?.[lang] || null,
          audioStartTime: m.card.audioStartTime || 0,
          img: m.card.hero?.src || "",
          focus: m.card.hero?.focus || "50% 50%",
          scale: m.card.hero?.scale || 1.0,
          status: m.status || null,
          chips: m.chips?.map((c) => ({
            icon: c.icon,
            label: c.label[lang],
            value: c.value[lang],
          })) || [],
          images: m.images || [],
          details: {
            summary: m.summary?.[lang] || "",
            facts: m.facts?.map((f) => ({ label: f.label[lang], value: f.value[lang] })) || [],
            timeline: m.timeline?.map((t) => ({ date: t.date, event: t.event[lang] })) || [],
            highlights: m.highlights?.map((h) => ({ title: h.title[lang], description: h.description[lang] })) || [],
            people: m.people?.map((p) => ({ name: p.name[lang], role: p.role[lang] })) || [],
            instruments: m.instruments?.map((i) => ({ name: i.name[lang], purpose: i.purpose[lang] })) || [],
          },
        };
      }
    }

    // Story-only cards (Pathfinder, Sojourner, Eros)
    for (const sc of world.storyCards || []) {
      cards[sc.cardKey] = {
        cardKey: sc.cardKey,
        title: sc.title[lang],
        tag: sc.tag[lang],
        text: sc.kidText[lang],
        audio: sc.audio?.[lang] || null,
        audioStartTime: sc.audioStartTime || 0,
        img: sc.hero?.src || "",
        focus: sc.hero?.focus || "50% 50%",
        scale: sc.hero?.scale || 1.0,
        isStoryOnly: true,
      };
    }

    // Backward compatibility aliases
    if (cards["falcon"] && !cards["rover"]) {
      cards["rover"] = cards["falcon"];
    }

    return cards;
  };

  const buildLines = (lines, lang) => {
    return (lines || []).map((l) => ({
      text: l.text[lang],
      audio: l.audio?.[lang] || null,
    }));
  };

  const buildLangStory = (lang) => {
    return {
      map: {
        lines: buildLines(journeyData.map.lines, lang),
        lockedQuiz: {
          text: journeyData.map.lockedQuiz.text[lang],
          audio: journeyData.map.lockedQuiz.audio?.[lang] || null,
        },
        lockedBonus: {
          text: journeyData.map.lockedBonus.text[lang],
          audio: journeyData.map.lockedBonus.audio?.[lang] || null,
        },
      },
      earth: {
        lines: buildLines(journeyData.earth.lines, lang),
        cards: Object.fromEntries(
          Object.entries(journeyData.earth.cards).map(([k, c]) => [
            k,
            {
              cardKey: c.cardKey,
              title: c.title[lang],
              tag: c.tag[lang],
              text: c.kidText[lang],
              audio: c.audio?.[lang] || null,
              img: c.hero.src,
              focus: c.hero.focus,
              scale: c.hero.scale,
              isEarthCard: true,
            },
          ])
        ),
      },
      moon: {
        lines: buildLines(moonWorld?.narration, lang),
        cards: buildCards(moonWorld, lang),
      },
      mars: {
        lines: buildLines(marsWorld?.narration, lang),
        cards: buildCards(marsWorld, lang),
      },
      bonus: {
        lines: buildLines(deepspaceWorld?.narration, lang),
        cards: buildCards(deepspaceWorld, lang),
      },
      quiz: {
        passScore: quizData.passScore || 0.6,
        stepFormat: (cur, total) =>
          lang === "ar"
            ? `السؤال ${toArabicNum(cur)} من ${toArabicNum(total)}`
            : `Question ${cur} of ${total}`,
        rawQuestions: quizData.questions,
        questions: quizData.questions.map((q) => ({
          id: q.id,
          world: q.world,
          question: q.question[lang],
          options: q.options.map((opt) => opt.text[lang]),
          correctIndex: q.options.findIndex((opt) => opt.id === q.correctId),
          correctId: q.correctId,
          rawOptions: q.options,
          explanation: q.explanation[lang],
          learnMoreCard: q.learnMoreCard,
        })),
      },
    };
  };

  return {
    ar: buildLangStory("ar"),
    en: buildLangStory("en"),
  };
}

export { uiData, journeyData, moonData, marsData, quizData };

