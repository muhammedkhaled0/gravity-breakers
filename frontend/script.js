import {
  state,
  UI_STRINGS,
  STORY_DATA,
  t,
  currentStory,
  loadStateFromStorage,
  saveStateToStorage,
  resetProgress,
  toArabicNum,
} from "./src/state.js";
import { AudioNarrationManager } from "./src/audio.js";
import { initQuiz, startQuiz, renderQuizQuestion, setQuizAstronautText } from "./src/quiz.js";
import { renderGallery } from "./src/gallery.js";

const realEarthGlobeImg = "images/earth-globe.jpg";
const realEarthTextureImg = "images/earth-texture.jpg";
const realEarthOrbitImg = "images/earth-orbit.jpg";
const realMoonSurfaceImg = "images/moon-surface.jpg";
const realMarsSurfaceImg = "images/mars-surface.jpg";
const realDeepSpaceImg = "images/deep-space.jpg";

// =========================================================
// INLINE SVG HELPERS (Astronaut Guide & Sound Icons)
// =========================================================
function createAstronautSVG() {
  return `
    <svg class="astronaut-svg" viewBox="0 0 120 150" aria-hidden="true">
      <rect x="64" y="54" width="32" height="46" rx="10" fill="#9C92D8" stroke="#3B4566" stroke-width="3" />
      <path d="M94 74 C108 74, 108 98, 92 104" fill="none" stroke="#9C92D8" stroke-width="6" stroke-linecap="round" />
      <path d="M94 74 C108 74, 108 98, 92 104" fill="none" stroke="#3B4566" stroke-width="2" stroke-linecap="round" />

      <g class="astronaut-pointing-arm">
        <path d="M40 68 C26 62, 16 54, 12 46" fill="none" stroke="#3B4566" stroke-width="16" stroke-linecap="round" />
        <path d="M40 68 C26 62, 16 54, 12 46" fill="none" stroke="#FFFFFF" stroke-width="10.5" stroke-linecap="round" />
        <circle cx="11" cy="44" r="7.5" fill="#8E98B8" stroke="#3B4566" stroke-width="2.5" />
      </g>

      <rect x="40" y="96" width="16" height="28" rx="7" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <rect x="60" y="96" width="16" height="28" rx="7" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <rect x="36" y="120" width="21" height="14" rx="7" fill="#8E98B8" stroke="#3B4566" stroke-width="3" />
      <rect x="59" y="120" width="21" height="14" rx="7" fill="#8E98B8" stroke="#3B4566" stroke-width="3" />

      <rect x="36" y="56" width="44" height="48" rx="16" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <path d="M45 58 L45 102" stroke="#7A6EC2" stroke-width="5" stroke-linecap="round" />
      <path d="M71 58 L71 102" stroke="#7A6EC2" stroke-width="5" stroke-linecap="round" />
      <rect x="37" y="82" width="42" height="7" rx="3" fill="#7A6EC2" />

      <path d="M78 68 C86 78, 76 88, 62 86" fill="none" stroke="#3B4566" stroke-width="15" stroke-linecap="round" />
      <path d="M78 68 C86 78, 76 88, 62 86" fill="none" stroke="#FFFFFF" stroke-width="9.5" stroke-linecap="round" />
      <circle cx="60" cy="86" r="7" fill="#8E98B8" stroke="#3B4566" stroke-width="2.5" />

      <circle cx="58" cy="36" r="26" fill="#FFFFFF" stroke="#3B4566" stroke-width="3" />
      <circle cx="55" cy="37" r="18" fill="#2E3A5C" stroke="#3B4566" stroke-width="2.5" />
      <ellipse cx="47" cy="29" rx="5.5" ry="3.2" transform="rotate(-28 47 29)" fill="#FFFFFF" />
      <circle cx="54" cy="25" r="2" fill="#FFFFFF" />
    </svg>
  `;
}

function createSoundIconSVG(isMuted) {
  if (isMuted) {
    return `
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
        <path d="M16 9L22 15M22 9L16 15" stroke="#D93848" stroke-width="2.8" stroke-linecap="round" />
      </svg>
    `;
  }
  return `
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
      <path d="M15.5 8.5C16.8 9.8 17.5 11.4 17.5 13C17.5 14.6 16.8 16.2 15.5 17.5L14.1 16.1C15 15.2 15.5 14.1 15.5 13C15.5 11.9 15 10.8 14.1 9.9L15.5 8.5Z" fill="currentColor" />
    </svg>
  `;
}

// =========================================================
// AUDIO NARRATION MANAGER INSTANCE & HOOKS
// =========================================================
const audioManager = new AudioNarrationManager();

audioManager.onSubtitleUpdate = (screenId, lines, activeIndex) => {
  renderGuideDialogue(screenId, lines, activeIndex);
};

audioManager.onCardAudioStart = (card) => {
  setFactAudioButtonState(true);
};

audioManager.onCardAudioEnd = (card) => {
  setFactAudioButtonState(false);
};

audioManager.onCardAudioPause = (card) => {
  setFactAudioButtonState(false);
};

// Global user interaction listener to unlock audio on first touch
function installGlobalAudioUnlocker() {
  const unlockEvents = ["click", "touchstart", "pointerdown", "keydown"];
  const handleInteraction = () => {
    audioManager.unlockAudio();
    unlockEvents.forEach((evt) => document.removeEventListener(evt, handleInteraction, true));
  };
  unlockEvents.forEach((evt) => document.addEventListener(evt, handleInteraction, true));
}

// =========================================================
// MOUNT REAL PHOTOGRAPHS & ASTRONAUT SVGS
// =========================================================
function mountRealSpacePhotos() {
  const earthScene = document.getElementById("scene-img-earth");
  if (earthScene) earthScene.src = realEarthOrbitImg;

  const moonScene = document.getElementById("scene-img-moon");
  if (moonScene) moonScene.src = realMoonSurfaceImg;

  const marsScene = document.getElementById("scene-img-mars");
  if (marsScene) marsScene.src = realMarsSurfaceImg;

  const bonusScene = document.getElementById("scene-img-bonus");
  if (bonusScene) bonusScene.src = realDeepSpaceImg;
}

function initRealisticSpinningEarth() {
  const canvas = document.getElementById("intro-earth-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const S = canvas.width;
  const half = S / 2;
  const R = S * 0.435;
  const TILT = (23.4 * Math.PI) / 180;
  const cosT = Math.cos(TILT);
  const sinT = Math.sin(TILT);

  const lx = -0.52;
  const ly = -0.32;
  const lz = 0.792;

  const frameImg = ctx.createImageData(S, S);
  const out = frameImg.data;

  const spherePixels = [];
  const sphereU = [];
  const sphereV = [];
  const sphereLight = [];
  const sphereRim = [];

  for (let py = 0; py < S; py++) {
    const sy = (py - half) / R;
    for (let px = 0; px < S; px++) {
      const sx = (px - half) / R;
      const r2 = sx * sx + sy * sy;
      const idx4 = (py * S + px) * 4;

      if (r2 <= 1.0) {
        const sz = Math.sqrt(1.0 - r2);
        const ndotl = sx * lx + sy * ly + sz * lz;
        const lit = Math.min(1.08, 0.08 + 0.98 * Math.max(0, ndotl));
        const sunSide = Math.max(0, ndotl + 0.28);
        const fresnel = Math.pow(1 - sz, 2.8) * (0.22 + 0.78 * Math.min(1, sunSide));

        const tx = sx * cosT + sy * sinT;
        const ty = -sx * sinT + sy * cosT;
        const lat = Math.asin(Math.max(-1, Math.min(1, ty)));
        const lon = Math.atan2(tx, sz);

        spherePixels.push(idx4);
        sphereU.push(lon / (Math.PI * 2) + 0.5);
        sphereV.push(0.5 + lat / Math.PI);
        sphereLight.push(lit);
        sphereRim.push(Math.min(0.85, fresnel * 0.95));
      } else {
        const dist = Math.sqrt(r2) - 1.0;
        if (dist < 0.16) {
          const ndotlEdge = sx * lx + sy * ly;
          const haloBoost = 0.45 + 0.55 * Math.max(0, ndotlEdge + 0.35);
          const alpha = Math.pow(1 - dist / 0.16, 2.3) * 0.62 * haloBoost;
          out[idx4] = 86;
          out[idx4 + 1] = 178;
          out[idx4 + 2] = 255;
          out[idx4 + 3] = Math.round(alpha * 255);
        }
      }
    }
  }

  const count = spherePixels.length;
  const pIdx = new Int32Array(spherePixels);
  const pU = new Float32Array(sphereU);
  const pV = new Float32Array(sphereV);
  const pLight = new Float32Array(sphereLight);
  const pRim = new Float32Array(sphereRim);

  const img = new Image();
  img.src = realEarthTextureImg;

  img.onload = () => {
    const texW = 1024;
    const texH = 512;
    const texCanvas = document.createElement("canvas");
    texCanvas.width = texW;
    texCanvas.height = texH;
    const texCtx = texCanvas.getContext("2d");
    texCtx.drawImage(img, 0, 0, texW, texH);

    const texDataObj = texCtx.getImageData(0, 0, texW, texH);
    const tex = texDataObj.data;
    const seamW = Math.floor(texW * 0.05);
    for (let y = 0; y < texH; y++) {
      const row = y * texW;
      for (let x = 0; x < seamW; x++) {
        const tVal = x / seamW;
        const leftI = (row + x) * 4;
        const rightI = (row + (texW - seamW + x)) * 4;
        for (let c = 0; c < 3; c++) {
          const avg = Math.round(tex[leftI + c] * tVal + tex[rightI + c] * (1 - tVal));
          tex[rightI + c] = avg;
        }
      }
    }

    const pRow = new Int32Array(count);
    for (let i = 0; i < count; i++) {
      const ty = Math.min(texH - 1, Math.max(0, Math.floor(pV[i] * texH)));
      pRow[i] = ty * texW;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phase = 0.04;
    let lastTime = performance.now();

    function renderFrame(now) {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (!reducedMotion && state.currentScreen === "home") {
        phase = (phase + dt / 32) % 1;
      }

      for (let i = 0; i < count; i++) {
        let u = pU[i] - phase;
        if (u < 0) u += 1;
        const tx = Math.floor(u * texW);
        const sIdx = (pRow[i] + tx) * 4;
        const dIdx = pIdx[i];

        const lit = pLight[i];
        const rim = pRim[i];
        const invRim = 1 - rim;

        const r = tex[sIdx] * lit * invRim + 95 * rim;
        const g = tex[sIdx + 1] * lit * invRim + 185 * rim;
        const b = tex[sIdx + 2] * lit * invRim + 255 * rim;

        out[dIdx] = r > 255 ? 255 : r;
        out[dIdx + 1] = g > 255 ? 255 : g;
        out[dIdx + 2] = b > 255 ? 255 : b;
        out[dIdx + 3] = 255;
      }

      ctx.putImageData(frameImg, 0, 0);

      if (!reducedMotion) {
        requestAnimationFrame(renderFrame);
      }
    }

    requestAnimationFrame(renderFrame);
  };
}

function mountAstronautFigures() {
  document.querySelectorAll(".astronaut-figure").forEach((el) => {
    el.innerHTML = createAstronautSVG();
  });
}

// =========================================================
// BILINGUAL I18N SYNC
// =========================================================
function applyLanguage(lang) {
  state.lang = lang === "en" ? "en" : "ar";
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll(".js-lang-toggle").forEach((btn) => {
    btn.textContent = t("langToggleLabel");
  });

  const quizSvgWord = document.getElementById("map-quiz-svg-label");
  if (quizSvgWord) quizSvgWord.textContent = t("quizSvgWord");
  const q1 = document.getElementById("map-quiz-q1");
  const q2 = document.getElementById("map-quiz-q2");
  const badgeQ = document.getElementById("quiz-badge-q");
  if (q1) q1.textContent = t("quizSvgQ");
  if (q2) q2.textContent = t("quizSvgQ");
  if (badgeQ) badgeQ.textContent = t("quizSvgQ");

  const nameInput = document.getElementById("cert-name-input");
  const emailInput = document.getElementById("cert-email-input");
  if (nameInput) nameInput.placeholder = t("certNamePlaceholder");
  if (emailInput) emailInput.placeholder = t("certEmailPlaceholder");

  syncSoundButtons();
  updateMapProgressUI();
  setFactAudioButtonState(false);
  saveStateToStorage();

  // Refresh active fact card if open
  if (state.activeCardScreen && state.activeCardKey) {
    openFactCard(state.activeCardScreen, state.activeCardKey, { silent: true });
  }

  // Refresh active screen narration or quiz question
  if (state.currentScreen === "quiz") {
    const victoryCard = document.getElementById("quiz-victory-card");
    if (victoryCard && victoryCard.hidden) {
      setQuizAstronautText(t("quizIntroPrompt"));
      renderQuizQuestion();
    } else {
      setQuizAstronautText(t("quizVictoryPrompt"));
    }
  }
}

function syncSoundButtons() {
  document.querySelectorAll(".js-sound-toggle").forEach((btn) => {
    const slot = btn.querySelector(".sound-icon-slot");
    const label = btn.querySelector(".sound-label");
    btn.setAttribute("aria-pressed", state.isMuted ? "true" : "false");
    if (slot) slot.innerHTML = createSoundIconSVG(state.isMuted);
    if (label) {
      const isHomeMap = Boolean(btn.closest(".map-header") || btn.closest(".intro-top-controls"));
      if (isHomeMap) {
        label.textContent = state.isMuted ? t("soundOffHome") : t("soundOnHome");
      } else {
        label.textContent = state.isMuted ? t("soundOffShort") : t("soundOnShort");
      }
    }
  });
}

function renderGuideDialogue(screenId, lines, activeIndex) {
  const guide = document.querySelector(`.astronaut-companion[data-guide="${screenId}"]`);
  if (!guide) return;

  const textEl = guide.querySelector(".speech-text");
  const dotsEl = guide.querySelector(".speech-dots");
  const line = lines ? lines[activeIndex] : null;
  if (textEl && line) {
    textEl.textContent = line.text;
  }

  if (dotsEl && lines) {
    dotsEl.innerHTML = "";
    if (lines.length > 1) {
      lines.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.className = "speech-dot";
        if (idx === activeIndex) dot.classList.add("is-active");
        else if (idx < activeIndex) dot.classList.add("is-done");
        dotsEl.appendChild(dot);
      });
    }
  }
}

function updateMapProgressUI() {
  const earthBtn = document.querySelector('.map-stop[data-stop="earth"]');
  const moonBtn = document.querySelector('.map-stop[data-stop="moon"]');
  const marsBtn = document.querySelector('.map-stop[data-stop="mars"]');
  const quizBtn = document.querySelector('.map-stop[data-stop="quiz"]');
  const bonusBtn = document.querySelector('.map-stop[data-stop="bonus"]');

  if (earthBtn) earthBtn.classList.toggle("is-visited", state.visited.earth);
  if (moonBtn) moonBtn.classList.toggle("is-visited", state.visited.moon);
  if (marsBtn) marsBtn.classList.toggle("is-visited", state.visited.mars);

  if (state.visited.moon && state.visited.mars) {
    state.quizUnlocked = true;
  }

  if (quizBtn) {
    quizBtn.classList.toggle("is-locked", !state.quizUnlocked);
    quizBtn.classList.toggle("is-visited", state.quizPassed);
    const meta = document.getElementById("quiz-stop-meta");
    if (meta) meta.textContent = state.quizUnlocked ? t("stopQuizMetaOpen") : t("stopQuizMetaLocked");
  }

  if (bonusBtn) {
    bonusBtn.classList.toggle("is-locked", !state.quizPassed);
    bonusBtn.classList.toggle("is-visited", state.visited.bonus);
    const meta = document.getElementById("bonus-stop-meta");
    if (meta) meta.textContent = state.quizPassed ? t("stopBonusMetaOpen") : t("stopBonusMetaLocked");
  }

  saveStateToStorage();
}

// =========================================================
// FACT CARD MODAL (Vehicle Sound on Tap + Audio Button)
// =========================================================
function setFactAudioButtonState(isPlaying) {
  const btn = document.getElementById("btn-fact-audio");
  const label = document.getElementById("fact-audio-label");
  if (!btn || !label) return;
  btn.classList.toggle("is-playing", isPlaying);

  if (state.lang === "ar") {
    label.textContent = isPlaying ? "الرائد بيحكي... (دوس للإيقاف)" : "اسمعها من الرائد";
  } else {
    label.textContent = isPlaying ? "Astronaut speaking... (Tap to pause)" : "Hear from the Astronaut";
  }
}

function openFactCard(screenId, cardKey, opts = {}) {
  const screenData = currentStory()[screenId];
  if (!screenData || !screenData.cards || !screenData.cards[cardKey]) return;
  const card = screenData.cards[cardKey];
  state.activeCardScreen = screenId;
  state.activeCardKey = cardKey;

  document.querySelectorAll(".hotspot").forEach((h) => {
    const match = h.dataset.screen === screenId && h.dataset.card === cardKey;
    h.classList.toggle("is-selected", match);
  });

  const thumbImg = document.getElementById("fact-card-img");
  if (thumbImg) {
    thumbImg.src = card.img;
    thumbImg.alt = card.title;
    thumbImg.style.objectPosition = card.focus || "50% 50%";
    thumbImg.style.transformOrigin = card.focus || "50% 50%";
    thumbImg.style.transform = `scale(${card.scale || 1.4})`;
  }

  document.getElementById("fact-card-title").textContent = card.title;
  document.getElementById("fact-card-tag").textContent = card.tag;
  document.getElementById("fact-card-text").textContent = card.text;

  // Status badge
  const statusBadge = document.getElementById("fact-card-status");
  if (statusBadge) {
    if (card.status) {
      statusBadge.hidden = false;
      const statusIcon = card.status === "active" ? "🟢" : card.status === "retired" ? "⚪" : "🟡";
      const statusLabel =
        card.status === "active"
          ? t("statusActive")
          : card.status === "retired"
            ? t("statusRetired")
            : t("statusSilent");
      statusBadge.textContent = `${statusIcon} ${statusLabel}`;
      statusBadge.className = `fact-status-badge is-${card.status}`;
    } else {
      statusBadge.hidden = true;
    }
  }

  // Chips
  const chipsContainer = document.getElementById("fact-card-chips");
  if (chipsContainer) {
    if (Array.isArray(card.chips) && card.chips.length > 0) {
      chipsContainer.hidden = false;
      chipsContainer.innerHTML = card.chips
        .map((c) => `<span class="fact-chip"><strong>${c.label}:</strong> ${c.value}</span>`)
        .join("");
    } else {
      chipsContainer.hidden = true;
      chipsContainer.innerHTML = "";
    }
  }

  // Gallery
  const galleryEl = document.getElementById("fact-card-gallery");
  renderGallery(card.images, state.lang, galleryEl);

  // Collapsible "More details"
  const detailsSection = document.getElementById("fact-card-details-section");
  const detailsContent = document.getElementById("fact-card-details-content");
  const detailsToggle = document.getElementById("btn-toggle-fact-details");
  const detailsToggleText = document.getElementById("fact-details-toggle-text");

  if (detailsSection && detailsContent && detailsToggle) {
    const hasDetails = Boolean(
      card.details &&
        (card.details.facts?.length ||
          card.details.timeline?.length ||
          card.details.highlights?.length ||
          card.details.people?.length ||
          card.details.instruments?.length)
    );

    if (hasDetails) {
      detailsSection.hidden = false;
      detailsContent.hidden = true;
      detailsToggle.setAttribute("aria-expanded", "false");
      if (detailsToggleText) detailsToggleText.textContent = t("moreDetails") || "تفاصيل أكتر";

      let blocksHtml = "";

      if (card.details.facts?.length) {
        blocksHtml += `
          <div class="fact-details-block">
            <h4>${state.lang === "ar" ? "حقائق وأرقام" : "Key Facts"}</h4>
            <ul>${card.details.facts.map((f) => `<li><strong>${f.label}:</strong> ${f.value}</li>`).join("")}</ul>
          </div>
        `;
      }

      if (card.details.highlights?.length) {
        blocksHtml += `
          <div class="fact-details-block">
            <h4>${state.lang === "ar" ? "أبرز الإنجازات" : "Highlights"}</h4>
            <ul>${card.details.highlights.map((h) => `<li><strong>${h.title}:</strong> ${h.description}</li>`).join("")}</ul>
          </div>
        `;
      }

      if (card.details.people?.length) {
        blocksHtml += `
          <div class="fact-details-block">
            <h4>${state.lang === "ar" ? "رواد الفضاء" : "Crew"}</h4>
            <ul>${card.details.people.map((p) => `<li><strong>${p.name}:</strong> ${p.role}</li>`).join("")}</ul>
          </div>
        `;
      }

      if (card.details.instruments?.length) {
        blocksHtml += `
          <div class="fact-details-block">
            <h4>${state.lang === "ar" ? "الأجهزة العلمية" : "Scientific Instruments"}</h4>
            <ul>${card.details.instruments.map((i) => `<li><strong>${i.name}:</strong> ${i.purpose}</li>`).join("")}</ul>
          </div>
        `;
      }

      if (card.details.timeline?.length) {
        blocksHtml += `
          <div class="fact-details-block">
            <h4>${state.lang === "ar" ? "تواريخ مهمة" : "Key Dates"}</h4>
            <ul>${card.details.timeline.map((t) => `<li><strong>${t.date}:</strong> ${t.event}</li>`).join("")}</ul>
          </div>
        `;
      }

      detailsContent.innerHTML = blocksHtml;
    } else {
      detailsSection.hidden = true;
      detailsContent.innerHTML = "";
    }
  }

  // Update astronaut speech bubble on screen
  const guideText = document.querySelector(`.planet-screen:not([hidden]) .speech-text`);
  if (guideText) {
    guideText.textContent = card.text;
  }

  document.getElementById("fact-card-modal").hidden = false;

  // Scroll card to top for fresh content
  const factCardEl = document.getElementById("fact-card-modal");
  if (factCardEl) factCardEl.scrollTop = 0;

  // USER REQUIREMENT: PLAY SOUND ON TAP!
  if (!opts.silent) {
    audioManager.playChime("tap");
    if (card.audio) {
      audioManager.playCardAudio(card);
    }
  }
}

function closeFactCard() {
  audioManager.stopCardAudio();
  state.activeCardKey = null;
  state.activeCardScreen = null;
  const modal = document.getElementById("fact-card-modal");
  if (modal) modal.hidden = true;
  document.querySelectorAll(".hotspot").forEach((h) => h.classList.remove("is-selected"));
  setFactAudioButtonState(false);
}

// =========================================================
// INTRO TRIGGER HANDLER (Plays on first tap!)
// =========================================================
function handleStartIntro() {
  audioManager.unlockAudio();
  audioManager.playChime("tap");

  const startBtn = document.getElementById("btn-start-journey");
  if (startBtn) {
    startBtn.disabled = true;
    startBtn.textContent = state.lang === "ar" ? "🚀 انطلاااق! الرائد بيحكي..." : "🚀 Blast off! Astronaut speaking...";
  }

  // Play intro audio with countdown
  audioManager.playIntro(() => {
    // When finished, blast off to Moon!
    audioManager.playChime("unlock");
    showScreen("moon");
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.textContent = t("introCta");
    }
  });
}

// =========================================================
// CERTIFICATE SUBMISSION (Retained feature with n8n Webhook + Server Fallback)
// =========================================================
async function handleCertificateSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("cert-name-input");
  const emailInput = document.getElementById("cert-email-input");
  const statusEl = document.getElementById("cert-form-status");
  const submitBtn = document.getElementById("btn-submit-cert");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  statusEl.classList.remove("is-error");

  if (name.length < 2) {
    statusEl.classList.add("is-error");
    statusEl.textContent =
      state.lang === "ar" ? "اكتب اسمك الأول يا بطل!" : "Please enter your name first!";
    nameInput.focus();
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.classList.add("is-error");
    statusEl.textContent =
      state.lang === "ar"
        ? "من فضلك اكتب بريد إلكتروني صحيح."
        : "Please enter a valid email address.";
    emailInput.focus();
    return;
  }

  state.lastCertName = name;
  saveStateToStorage();
  submitBtn.disabled = true;
  statusEl.textContent = t("certSending");

  const CERTIFICATE_ENDPOINT =
    "https://omaribrahim5589.app.n8n.cloud/webhook/762125c4-a2f2-427e-856d-e371401a4ef0";

  try {
    let res;
    let isSuccess = false;
    let errorMsg = "";

    try {
      res = await fetch(CERTIFICATE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          lang: state.lang,
        }),
      });
      isSuccess = res.ok;
    } catch (primaryErr) {
      console.warn("Direct n8n webhook fetch failed, trying local server fallback:", primaryErr);
      res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          lang: state.lang,
        }),
      });
      isSuccess = res.ok;
    }

    if (res && res.ok) {
      try {
        const payload = await res.json();
        if (payload && payload.ok === false) {
          isSuccess = false;
          errorMsg = payload.error || payload.message || "";
        }
      } catch {
        isSuccess = true;
      }
    }

    if (isSuccess) {
      audioManager.playChime("unlock");
      statusEl.textContent = t("certSentOk");
      setQuizAstronautText(t("certSentOk"));
    } else {
      statusEl.textContent = errorMsg || t("certReadyLocal");
      setQuizAstronautText(t("certReadyLocal"));
    }
  } catch (err) {
    console.warn("Certificate network request handled locally:", err);
    statusEl.textContent = t("certReadyLocal");
    setQuizAstronautText(t("certReadyLocal"));
  } finally {
    submitBtn.disabled = false;
  }
}

// =========================================================
// SCREEN ROUTING & PROGRESS
// =========================================================
const VALID_SCREENS = new Set(["home", "earth", "moon", "mars", "quiz", "bonus"]);

function showScreen(screenId, options = {}) {
  const { fromHash = false, scrollToMap = false } = options;
  const target = VALID_SCREENS.has(screenId) ? screenId : "home";

  audioManager.stopAll();
  closeFactCard();

  // Reset intro button text if we're navigating away mid-intro
  const startBtn = document.getElementById("btn-start-journey");
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.textContent = t("introCta");
  }

  document.querySelectorAll(".screen").forEach((screen) => {
    screen.hidden = screen.id !== `screen-${target}`;
  });

  state.currentScreen = target;

  if (!fromHash) {
    const expectedHash = `#${target}`;
    if (window.location.hash !== expectedHash) {
      window.location.hash = expectedHash;
    }
  }

  if (target === "earth" || target === "moon" || target === "mars" || target === "bonus") {
    state.visited[target] = true;
    updateMapProgressUI();
  }

  if (target === "home") {
    if (scrollToMap) {
      const mapEl = document.getElementById("journey-map");
      if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    const mapGuideText = document.getElementById("map-speech-text");
    if (mapGuideText) {
      mapGuideText.textContent =
        state.lang === "ar"
          ? "أهلًا يا بطل! أنا رائد الفضاء اللي هيحكيلك الحكاية. اختار أي مركبة عشان تسمع حكايتها!"
          : "Hello, hero! Pick any spacecraft to hear its true story!";
    }
  } else if (target === "quiz") {
    state.quizUnlocked = true;
    updateMapProgressUI();
    startQuiz();
  } else {
    // Show planet initial guide text
    const guideText = document.querySelector(`#screen-${target} .speech-text`);
    if (guideText && currentStory()[target]?.lines?.[0]) {
      guideText.textContent = currentStory()[target].lines[0].text;
    }
    centerSceneViewportOnMobile(target);
  }
}

function updateSceneScale() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.max(vw / 1440, vh / 900);
  document.documentElement.style.setProperty("--scene-scale", String(scale));
}

function centerSceneViewportOnMobile(screenId) {
  if (window.innerWidth > 680) return;
  const screenEl = document.getElementById(`screen-${screenId}`);
  const vp = screenEl ? screenEl.querySelector(".scene-viewport") : null;
  if (!vp) return;
  requestAnimationFrame(() => {
    const maxScroll = vp.scrollWidth - vp.clientWidth;
    if (maxScroll > 0) {
      vp.scrollLeft = maxScroll / 2;
    }
  });
}

// =========================================================
// INITIALIZATION
// =========================================================
function init() {
  installGlobalAudioUnlocker();
  loadStateFromStorage();

  mountRealSpacePhotos();
  initRealisticSpinningEarth();
  mountAstronautFigures();

  // Initialize quiz module
  initQuiz(
    audioManager,
    () => {
      // on victory callback
      updateMapProgressUI();
    },
    (reviewCardKey) => {
      // on review card click: navigate to the planet and open the card
      const findScreenForCard = (ck) => {
        for (const s of ["earth", "moon", "mars", "bonus"]) {
          if (currentStory()[s]?.cards?.[ck]) return s;
        }
        return "moon";
      };
      const screenId = findScreenForCard(reviewCardKey);
      showScreen(screenId);
      setTimeout(() => openFactCard(screenId, reviewCardKey), 350);
    }
  );

  applyLanguage(state.lang || "ar");
  updateSceneScale();

  window.addEventListener("resize", updateSceneScale);

  // Esc key closes fact cards (accessibility)
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFactCard();
    }
  });

  // Language Toggle Buttons
  document.querySelectorAll(".js-lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      applyLanguage(state.lang === "ar" ? "en" : "ar");
    });
  });

  // Intro triggers (Earth click / Start button -> Starts Intro Audio immediately!)
  document.getElementById("btn-intro-earth")?.addEventListener("click", handleStartIntro);
  document.getElementById("btn-start-journey")?.addEventListener("click", handleStartIntro);

  document.getElementById("btn-scroll-map")?.addEventListener("click", () => {
    audioManager.unlockAudio();
    const mapEl = document.getElementById("journey-map");
    if (mapEl) mapEl.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("btn-map-fly")?.addEventListener("click", () => {
    audioManager.playChime("tap");
    showScreen("moon");
  });

  // Map Stop Clicks
  document.querySelectorAll(".map-stop").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.unlockAudio();
      const stop = btn.dataset.stop;
      if (stop === "quiz" && !state.quizUnlocked) {
        audioManager.playChime("tap");
        audioManager.playSingleHint("map", currentStory().map.lockedQuiz);
        return;
      }
      if (stop === "bonus" && !state.quizPassed) {
        audioManager.playChime("tap");
        audioManager.playSingleHint("map", currentStory().map.lockedBonus);
        return;
      }
      audioManager.playChime("tap");
      showScreen(stop);
    });
  });

  // Sound Toggles
  document.querySelectorAll(".js-sound-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.unlockAudio();
      audioManager.setMuted(!state.isMuted);
      syncSoundButtons();
    });
  });

  // Back to Map buttons
  document.querySelectorAll(".js-go-map").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      showScreen("home", { scrollToMap: true });
    });
  });

  // Next Stop buttons
  document.querySelectorAll(".js-next-stop").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      showScreen(btn.dataset.next);
    });
  });

  // Replay Story buttons
  document.querySelectorAll(".js-replay-story").forEach((btn) => {
    btn.addEventListener("click", () => {
      audioManager.playChime("tap");
      const screenId = btn.dataset.screen;
      if (screenId === "map") {
        handleStartIntro();
      } else {
        const lines = currentStory()[screenId]?.lines;
        if (lines) audioManager.playSequence(screenId, lines, 0);
      }
    });
  });

  // Hotspots: TAPPING ANY VEHICLE OPENS CARD & PLAYS ITS SOUND!
  document.querySelectorAll(".hotspot").forEach((btn) => {
    btn.addEventListener("click", () => {
      openFactCard(btn.dataset.screen, btn.dataset.card);
    });
  });

  // Fact Card Close Button
  document.getElementById("btn-close-fact")?.addEventListener("click", closeFactCard);

  // Fact Card Audio Play/Pause Button
  document.getElementById("btn-fact-audio")?.addEventListener("click", () => {
    if (state.activeCardScreen && state.activeCardKey) {
      const card = currentStory()[state.activeCardScreen]?.cards?.[state.activeCardKey];
      if (card) audioManager.toggleCardAudio(card);
    }
  });

  // Collapsible Fact Details toggle
  document.getElementById("btn-toggle-fact-details")?.addEventListener("click", () => {
    const content = document.getElementById("fact-card-details-content");
    const toggle = document.getElementById("btn-toggle-fact-details");
    const toggleText = document.getElementById("fact-details-toggle-text");
    if (!content || !toggle) return;

    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    content.hidden = isExpanded;
    if (toggleText) {
      toggleText.textContent = isExpanded
        ? t("moreDetails") || "تفاصيل أكتر"
        : t("hideDetails") || "إخفاء التفاصيل";
    }
  });

  // Certificate Form & Bonus Buttons
  document.getElementById("certificate-form")?.addEventListener("submit", handleCertificateSubmit);

  document.getElementById("btn-open-bonus")?.addEventListener("click", () => {
    audioManager.playChime("unlock");
    showScreen("bonus");
  });

  // Hash Routing
  const handleHashRoute = () => {
    const raw = window.location.hash.replace("#", "").trim().toLowerCase();
    const target = VALID_SCREENS.has(raw) ? raw : "home";
    if (target === "bonus" && !state.quizPassed) {
      showScreen("home", { scrollToMap: true });
      return;
    }
    showScreen(target, { fromHash: true });
  };

  window.addEventListener("hashchange", handleHashRoute);

  const initialHash = window.location.hash.replace("#", "").trim().toLowerCase();
  if (initialHash && VALID_SCREENS.has(initialHash)) {
    handleHashRoute();
  } else {
    showScreen("home");
  }
}

document.addEventListener("DOMContentLoaded", init);
