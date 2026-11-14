import { state } from "./state.js";

export class AudioNarrationManager {
  constructor() {
    this.audioEl = new Audio();
    this.audioEl.preload = "auto";
    this.cardAudioEl = new Audio();
    this.fallbackTimer = null;
    this.cardFallbackTimer = null;
    this.audioCtx = null;
    this.sequenceId = 0;
    this.currentScreenId = null;
    this.currentLines = [];
    this.currentIndex = 0;

    // Callbacks hooked by UI
    this.onSubtitleUpdate = null;
    this.onSequenceComplete = null;
    this.onCardAudioStart = null;
    this.onCardAudioEnd = null;
  }

  playChime(type = "tap") {
    if (state.isMuted) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!this.audioCtx) this.audioCtx = new Ctx();
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
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.02);
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
    this.audioEl.load();

    this.cardAudioEl.pause();
    this.cardAudioEl.removeAttribute("src");
    this.cardAudioEl.load();

    if (this.onCardAudioEnd) this.onCardAudioEnd();
  }

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

    // Resolve audio source: object {ar, en} or direct string
    let audioSrc = null;
    if (line.audio) {
      if (typeof line.audio === "object") {
        audioSrc = line.audio[state.lang] || line.audio.ar || null;
      } else if (typeof line.audio === "string") {
        audioSrc = line.audio;
      }
    }

    // Preload next line audio if available
    const nextLine = this.currentLines[index + 1];
    if (nextLine?.audio) {
      const nextSrc = typeof nextLine.audio === "object" ? nextLine.audio[state.lang] : nextLine.audio;
      if (nextSrc) {
        const preloader = new Audio();
        preloader.preload = "auto";
        preloader.src = nextSrc;
      }
    }

    const fallbackDuration = Math.max(3200, (line.text.length * 75) + 1200);

    const proceedToNext = () => {
      if (seqId !== this.sequenceId) return;
      this.fallbackTimer = setTimeout(() => {
        this._playLine(seqId, index + 1);
      }, 700);
    };

    if (!audioSrc || state.isMuted) {
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
      console.warn("Narration audio failed to play, falling back to timed subtitle:", audioSrc);
      this.fallbackTimer = setTimeout(proceedToNext, fallbackDuration);
    };

    this.audioEl.removeEventListener("ended", onEnd);
    this.audioEl.removeEventListener("error", onError);
    this.audioEl.addEventListener("ended", onEnd, { once: true });
    this.audioEl.addEventListener("error", onError, { once: true });

    this.audioEl.src = audioSrc;
    this.audioEl
      .play()
      .catch((err) => {
        console.warn("Autoplay blocked or audio missing:", err);
        onError();
      });

    // Safety timeout in case audio hangs
    this.fallbackTimer = setTimeout(() => {
      if (!resolved) onError();
    }, 24000);
  }

  playSingleHint(screenId, hint) {
    if (!hint) return;
    this.playSequence(screenId, [hint], 0);
  }

  playCardAudio(card) {
    clearTimeout(this.cardFallbackTimer);
    this.cardAudioEl.pause();

    let audioSrc = null;
    if (card.audio) {
      if (typeof card.audio === "object") {
        audioSrc = card.audio[state.lang] || card.audio.ar || null;
      } else if (typeof card.audio === "string") {
        audioSrc = card.audio;
      }
    }

    const fallbackDuration = Math.max(3400, (card.text.length * 75) + 1400);

    if (this.onCardAudioStart) this.onCardAudioStart();

    const onCardDone = () => {
      clearTimeout(this.cardFallbackTimer);
      if (this.onCardAudioEnd) this.onCardAudioEnd();
    };

    if (!audioSrc || state.isMuted) {
      this.cardFallbackTimer = setTimeout(onCardDone, fallbackDuration);
      return;
    }

    const onEnded = () => {
      this.cardAudioEl.removeEventListener("ended", onEnded);
      this.cardAudioEl.removeEventListener("error", onError);
      onCardDone();
    };

    const onError = () => {
      this.cardAudioEl.removeEventListener("ended", onEnded);
      this.cardAudioEl.removeEventListener("error", onError);
      console.warn("Card audio failed to play, using fallback timer:", audioSrc);
      this.cardFallbackTimer = setTimeout(onCardDone, fallbackDuration);
    };

    this.cardAudioEl.removeEventListener("ended", onEnded);
    this.cardAudioEl.removeEventListener("error", onError);
    this.cardAudioEl.addEventListener("ended", onEnded, { once: true });
    this.cardAudioEl.addEventListener("error", onError, { once: true });

    this.cardAudioEl.src = audioSrc;
    this.cardAudioEl
      .play()
      .catch((err) => {
        console.warn("Card audio play error:", err);
        onError();
      });
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
