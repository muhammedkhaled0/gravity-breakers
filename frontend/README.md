# Gravity Breakers Frontend

The Longest Journey in the World

A story-driven, bilingual (Arabic RTL + English LTR) web experience for children about NASA hardware left on the Moon, Mars, and Deep Space.

---

## 🚀 Quick Start

From repository root:
```bash
npm install:all
npm run dev
```

Or from `frontend/`:
```bash
cd frontend
npm install
npm run dev
```

To build for production:
```bash
npm run build
npm run preview
```

---

## 📊 Data Commands

- **Check Data Schemas & Bilingual Completeness**:
  ```bash
  npm run data:check
  ```
  Validates `ui.json`, `journey.json`, `moon.json`, `mars.json`, and `quiz.json`. Ensures 100% bilingual coverage, camelCase schemas, matching card keys, and asset presence.

- **Scan & Attach Audio Recordings**:
  ```bash
  npm run data:audio
  ```
  Scans `frontend/public/audio/ar` and `frontend/public/audio/en`, pairs audio files to JSON narration and card blocks, and outputs a missing/orphan audio report.

---

## 🎙️ Audio Naming Convention

Audio files are placed in:
- Arabic: `public/audio/ar/<name>.mp3`
- English: `public/audio/en/<name>.mp3`

Standard names:
- Journey Map: `map-1.mp3` .. `map-4.mp3`, `locked-quiz.mp3`, `locked-bonus.mp3`
- Earth: `earth-1.mp3` .. `earth-5.mp3`, `earth-card-{air,earth,moon}.mp3`
- Moon: `moon-1.mp3` .. `moon-3.mp3`, `moon-card-{eagle,intrepid,rover}.mp3`
- Mars: `mars-1.mp3` .. `mars-3.mp3`, `mars-card-{viking,pathfinder,sojourner}.mp3`
- Deep Space: `bonus-1.mp3` .. `bonus-3.mp3`, `bonus-card-{eros,kepler}.mp3`

*(If an MP3 file is not yet recorded, the app automatically falls back to timed animated subtitles.)*

---

## 🛠️ Adding a New Machine

To add a new machine to `moon.json` or `mars.json`:
1. Add an entry to the `machines` array of the appropriate world.
2. Structure:
   ```jsonc
   {
     "id": "my-machine-id",
     "world": "moon", // or "mars" / "deepspace"
     "name": { "ar": "اسم المركبة", "en": "Machine Name" },
     "cosparId": "YYYY-NNNA",
     "alternateNames": ["Alias"],
     "type": "lander", // lander | rover | orbiter | telescope
     "status": "silent", // silent | active | retired
     "location": { "lat": 0.0, "lon": 0.0 },
     "coordinatesText": "0.0° N, 0.0° E",
     "card": {
       "cardKey": "my-card",
       "title": { "ar": "...", "en": "..." },
       "tag": { "ar": "...", "en": "..." },
       "kidText": { "ar": "...", "en": "..." },
       "audio": { "ar": null, "en": null },
       "hero": { "src": "images/moon-surface.jpg", "focus": "50% 50%", "scale": 2.0 }
     },
     "chips": [
       { "icon": "calendar", "label": { "ar": "...", "en": "..." }, "value": { "ar": "...", "en": "..." } }
     ],
     "images": [],
     "summary": { "ar": "...", "en": "..." },
     "facts": [],
     "timeline": [],
     "highlights": [],
     "people": [],
     "instruments": [],
     "quizFacts": [],
     "sources": ["https://nssdc.gsfc.nasa.gov/..."],
     "needsReview": false
   }
   ```
3. Run `npm run data:check` to verify your addition.

