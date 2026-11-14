import { buildUIStrings, buildStoryData } from "./data/loader.js";

export const UI_STRINGS = buildUIStrings();
export const STORY_DATA = buildStoryData();

const STORAGE_KEY = "gravity_breakers_progress_v2";

export const state = {
  lang: "ar",
  currentScreen: "home",
  isMuted: false,
  visited: {
    earth: false,
    moon: false,
    mars: false,
    bonus: false,
  },
  quizUnlocked: false,
  quizPassed: false,
  quizScore: 0,
  firstTryCorrect: [],
  quizIndex: 0,
  quizAnsweredCurrent: false,
  activeCardKey: null,
  activeCardScreen: null,
  lastCertName: "",
};

export function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      if (parsed.lang === "ar" || parsed.lang === "en") state.lang = parsed.lang;
      if (typeof parsed.isMuted === "boolean") state.isMuted = parsed.isMuted;
      if (parsed.visited && typeof parsed.visited === "object") {
        state.visited = { ...state.visited, ...parsed.visited };
      }
      if (typeof parsed.quizUnlocked === "boolean") state.quizUnlocked = parsed.quizUnlocked;
      if (typeof parsed.quizPassed === "boolean") state.quizPassed = parsed.quizPassed;
      if (typeof parsed.quizScore === "number") state.quizScore = parsed.quizScore;
      if (typeof parsed.lastCertName === "string") state.lastCertName = parsed.lastCertName;
    }
  } catch (err) {
    console.warn("Could not load state from localStorage:", err);
  }
}

export function saveStateToStorage() {
  try {
    const toSave = {
      lang: state.lang,
      isMuted: state.isMuted,
      visited: state.visited,
      quizUnlocked: state.quizUnlocked,
      quizPassed: state.quizPassed,
      quizScore: state.quizScore,
      lastCertName: state.lastCertName,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.warn("Could not save state to localStorage:", err);
  }
}

export function resetProgress() {
  state.visited = { earth: false, moon: false, mars: false, bonus: false };
  state.quizUnlocked = false;
  state.quizPassed = false;
  state.quizScore = 0;
  state.firstTryCorrect = [];
  state.quizIndex = 0;
  state.quizAnsweredCurrent = false;
  saveStateToStorage();
}

export function t(key) {
  return UI_STRINGS[state.lang]?.[key] || UI_STRINGS.ar[key] || "";
}

export function currentStory() {
  return STORY_DATA[state.lang];
}

export function toArabicNum(num) {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num)
    .split("")
    .map((d) => digits[Number(d)] ?? d)
    .join("");
}

