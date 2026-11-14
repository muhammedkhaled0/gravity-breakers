import { state } from "./state.js";

function resolveAudioUrl(src) {
  if (!src) return null;
  if (typeof src !== "string") return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;

  // Strip leading slash so it resolves relatively to the page/base
  const cleanPath = src.replace(/^\/+/, "");
  try {
    const base = document.baseURI || window.location.href;
    return new URL(cleanPath, base).href;
  } catch {
    return cleanPath;
  }
}

export class AudioNarrationManager {
  constructor() {
    this.audioEl = new Audio();
    this.audioEl.preload = "auto";

    this.cardAudioEl = new Audio();
    this.cardAudioEl.preload = "auto";

    this.audioCtx = null;
    this.isUnlocked = false;

    this.sequenceId = 0;
    this.currentScreenId = null;
    this.currentLines = [];
    this.currentIndex = 0;

    this.activeCard = null;
    this.isCardAudioPlaying = false;

    this.fallbackTimer = null;
    this.cardFallbackTimer = null;

    // UI event hooks
    this.onSubtitleUpdate = null;
    this.onSequenceComplete = null;
    this.onCardAudioStart = null;
    this.onCardAudioEnd = null;
    this.onCardAudioPause = null;
  }

  unlockAudio() {
    if (this.isUnlocked) return;
    this.isUnlocked = true;

    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx && !this.audioCtx) {
        this.audioCtx = new Ctx();
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
    } catch (e) {
      console.warn("AudioContext unlock warning:", e);
    }
  }

  playChime(type = "tap") {
    if (state.isMuted) return;
    this.unlockAudio();

    try {
      if (!this.audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) this.audioCtx = new Ctx();
      }
      if (!this.audioCtx) return;
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const notes =
        type === "success"
          ? [523.25, 659.25, 783.99]
          : type === "unlock"
            ? [587.33, 739.99, 880, 1174.66]
            : [520];

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.24);
      });
    } catch (e) {
      console.warn("Chime playback error:", e);
    }
  }

  stopAll() {
    this.sequenceId++;
    clearTimeout(this.fallbackTimer);
    clearTimeout(this.cardFallbackTimer);

    this.audioEl.pause();
    this.audioEl.removeAttribute("src");

    this.cardAudioEl.pause();
    this.cardAudioEl.removeAttribute("src");

    this.isCardAudioPlaying = false;
    this.activeCard = null;

    if (this.onCardAudioEnd) this.onCardAudioEnd();
  }

  stopCardAudio() {
    clearTimeout(this.cardFallbackTimer);
    this.cardAudioEl.pause();
    this.isCardAudioPlaying = false;
    this.activeCard = null;
    if (this.onCardAudioEnd) this.onCardAudioEnd();
  }

  // =========================================================
  // VEHICLE CARD AUDIO PLAYBACK (Autoplays on vehicle click!)
  // =========================================================
  playCardAudio(card) {
    this.unlockAudio();
    clearTimeout(this.cardFallbackTimer);

    // Stop narrative guide audio to let the vehicle speak
    this.audioEl.pause();
    clearTimeout(this.fallbackTimer);

    this.activeCard = card;

    let rawSrc = null;
    if (card && card.audio) {
      if (typeof card.audio === "object") {
        rawSrc = card.audio[state.lang] || card.audio.ar || null;
      } else if (typeof card.audio === "string") {
        rawSrc = card.audio;
      }
    }

    const audioUrl = resolveAudioUrl(rawSrc);

    if (state.isMuted || !audioUrl) {
      console.warn("Card audio skipped (muted or no audio file):", audioUrl);
      this.isCardAudioPlaying = false;
      if (this.onCardAudioEnd) this.onCardAudioEnd(card);
      return;
    }

    this.cardAudioEl.pause();
    this.cardAudioEl.currentTime = 0;
    this.cardAudioEl.src = audioUrl;

    // Support audioStartTime for cards that share a combined recording
    const startTime = card.audioStartTime || 0;

    const onAudioEnded = () => {
      this.isCardAudioPlaying = false;
      this.cardAudioEl.removeEventListener("ended", onAudioEnded);
      this.cardAudioEl.removeEventListener("error", onAudioError);
      if (this.onCardAudioEnd) this.onCardAudioEnd(card);
    };

    const onAudioError = (err) => {
      console.warn("Card audio failed to play from:", audioUrl, err);
      this.isCardAudioPlaying = false;
      this.cardAudioEl.removeEventListener("ended", onAudioEnded);
      this.cardAudioEl.removeEventListener("error", onAudioError);
      if (this.onCardAudioEnd) this.onCardAudioEnd(card);
    };

    this.cardAudioEl.removeEventListener("ended", onAudioEnded);
    this.cardAudioEl.removeEventListener("error", onAudioError);
    this.cardAudioEl.addEventListener("ended", onAudioEnded, { once: true });
    this.cardAudioEl.addEventListener("error", onAudioError, { once: true });

    const playPromise = this.cardAudioEl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (startTime > 0) {
            this.cardAudioEl.currentTime = startTime;
          }
          this.isCardAudioPlaying = true;
          if (this.onCardAudioStart) this.onCardAudioStart(card);
        })
        .catch((err) => {
          console.warn("Card audio play promise rejected:", err);
          onAudioError(err);
        });
    }
  }

  toggleCardAudio(card) {
    if (this.isCardAudioPlaying && this.cardAudioEl.src) {
      this.cardAudioEl.pause();
      this.isCardAudioPlaying = false;
      if (this.onCardAudioPause) this.onCardAudioPause(card);
    } else {
      if (this.cardAudioEl.src && this.cardAudioEl.currentTime > 0 && !this.cardAudioEl.ended) {
        this.unlockAudio();
        this.cardAudioEl
          .play()
          .then(() => {
            this.isCardAudioPlaying = true;
            if (this.onCardAudioStart) this.onCardAudioStart(card);
          })
          .catch(() => this.playCardAudio(card));
      } else {
        this.playCardAudio(card);
      }
    }
  }

  // =========================================================
  // INTRO & OUTRO TRACKS
  // =========================================================
  playIntro(onComplete) {
    this.unlockAudio();
    this.stopAll();

    const introUrl = resolveAudioUrl("/audio/ar/intro.mp3");
    if (state.isMuted || !introUrl) {
      if (onComplete) onComplete();
      return;
    }

    this.audioEl.src = introUrl;
    this.audioEl.currentTime = 0;

    const onEnded = () => {
      this.audioEl.removeEventListener("ended", onEnded);
      this.audioEl.removeEventListener("error", onError);
      if (onComplete) onComplete();
    };

    const onError = () => {
      this.audioEl.removeEventListener("ended", onEnded);
      this.audioEl.removeEventListener("error", onError);
      if (onComplete) onComplete();
    };

    this.audioEl.addEventListener("ended", onEnded, { once: true });
    this.audioEl.addEventListener("error", onError, { once: true });

    this.audioEl
      .play()
      .catch((err) => {
        console.warn("Intro audio play rejected:", err);
        onError();
      });
  }

  playOutro(onComplete) {
    this.unlockAudio();
    this.stopAll();

    const outroUrl = resolveAudioUrl("/audio/ar/outro.mp3");
    if (state.isMuted || !outroUrl) {
      if (onComplete) onComplete();
      return;
    }

    this.audioEl.src = outroUrl;
    this.audioEl.currentTime = 0;

    const onEnded = () => {
      this.audioEl.removeEventListener("ended", onEnded);
      this.audioEl.removeEventListener("error", onError);
      if (onComplete) onComplete();
    };

    const onError = () => {
      this.audioEl.removeEventListener("ended", onEnded);
      this.audioEl.removeEventListener("error", onError);
      if (onComplete) onComplete();
    };

    this.audioEl.addEventListener("ended", onEnded, { once: true });
    this.audioEl.addEventListener("error", onError, { once: true });

    this.audioEl
      .play()
      .catch((err) => {
        console.warn("Outro audio play rejected:", err);
        onError();
      });
  }

  // =========================================================
  // SEQUENCE NARRATION (Step by step guide with subtitles)
  // =========================================================
  playSequence(screenId, lines, startIndex = 0) {
    this.stopAll();
    const mySeq = ++this.sequenceId;
    this.currentScreenId = screenId;
    this.currentLines = lines || [];
    this.currentIndex = startIndex;

    if (!this.currentLines.length) return;
    this._playLine(mySeq, this.currentIndex);
  }

  _playLine(seqId, index) {
    if (seqId !== this.sequenceId) return;
    if (index >= this.currentLines.length) {
      if (this.onSequenceComplete) this.onSequenceComplete(this.currentScreenId);
      return;
    }

    this.currentIndex = index;
    const line = this.currentLines[index];
    if (this.onSubtitleUpdate) {
      this.onSubtitleUpdate(this.currentScreenId, this.currentLines, index);
    }

    let rawSrc = null;
    if (line.audio) {
      if (typeof line.audio === "object") {
        rawSrc = line.audio[state.lang] || line.audio.ar || null;
      } else if (typeof line.audio === "string") {
        rawSrc = line.audio;
      }
    }

    const audioUrl = resolveAudioUrl(rawSrc);
    const fallbackDuration = Math.max(3200, (line.text.length * 75) + 1200);

    const proceedToNext = () => {
      if (seqId !== this.sequenceId) return;
      this.fallbackTimer = setTimeout(() => {
        this._playLine(seqId, index + 1);
      }, 700);
    };

    if (!audioUrl || state.isMuted) {
      this.fallbackTimer = setTimeout(proceedToNext, fallbackDuration);
      return;
    }

    let resolved = false;
    const onEnd = () => {
      if (resolved) return;
      resolved = true;
      this.audioEl.removeEventListener("ended", onEnd);
      this.audioEl.removeEventListener("error", onError);
      clearTimeout(this.fallbackTimer);
      proceedToNext();
    };

    const onError = () => {
      if (resolved) return;
      resolved = true;
      this.audioEl.removeEventListener("ended", onEnd);
      this.audioEl.removeEventListener("error", onError);
      this.fallbackTimer = setTimeout(proceedToNext, fallbackDuration);
    };

    this.audioEl.removeEventListener("ended", onEnd);
    this.audioEl.removeEventListener("error", onError);
    this.audioEl.addEventListener("ended", onEnd, { once: true });
    this.audioEl.addEventListener("error", onError, { once: true });

    this.audioEl.src = audioUrl;
    this.audioEl
      .play()
      .catch(() => {
        onError();
      });

    this.fallbackTimer = setTimeout(() => {
      if (!resolved) onError();
    }, 28000);
  }

  playSingleHint(screenId, hint) {
    if (!hint) return;
    this.playSequence(screenId, [hint], 0);
  }

  setMuted(muted) {
    state.isMuted = muted;
    this.audioEl.muted = muted;
    this.cardAudioEl.muted = muted;
    if (muted) {
      this.stopAll();
    }
  }
}
