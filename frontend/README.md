# Frontend — أطول رحلة في الدنيا (The Longest Journey in the World)

Static single-page frontend (`HTML` + `CSS` + `JS`) ready to drop into `gravity-breakers/frontend/`.

## Files
- `index.html` — Single-page app with hash routing (`#home`, `#earth`, `#moon`, `#mars`, `#quiz`, `#bonus`)
- `style.css` — Space backdrop, responsive layout, RTL (`ar`) & LTR (`en`) support, `prefers-reduced-motion`
- `script.js` — Bilingual story data, rotating 3D Canvas Earth, audio narration controller, quiz & certificate form
- `images/` — Scene & globe assets (`earth-globe.jpg`, `earth-texture.jpg`, `earth-orbit.jpg`, `moon-surface.jpg`, `mars-surface.jpg`, `deep-space.jpg`)
- `audio/` — Place Arabic narration `.mp3` files here (and English `.mp3` files in `audio/en/`)

## Expected Audio Filenames
Place Arabic recordings in `audio/` and matching English recordings in `audio/en/`:
- `map-1.mp3`, `map-2.mp3`, `map-3.mp3`, `map-4.mp3`
- `locked-quiz.mp3`, `locked-bonus.mp3`
- `earth-1.mp3` … `earth-5.mp3`
- `earth-card-air.mp3`, `earth-card-earth.mp3`, `earth-card-moon.mp3`
- `moon-1.mp3` … `moon-3.mp3`
- `moon-card-eagle.mp3`, `moon-card-intrepid.mp3`, `moon-card-rover.mp3`
- `mars-1.mp3` … `mars-3.mp3`
- `mars-card-viking.mp3`, `mars-card-pathfinder.mp3`, `mars-card-sojourner.mp3`
- `bonus-1.mp3` … `bonus-3.mp3`
- `bonus-card-eros.mp3`, `bonus-card-kepler.mp3`

*(If any `.mp3` file is missing, the UI automatically falls back to a timed subtitle progression.)*

## Backend Endpoint Contract
When the user finishes the quiz and submits their name and email, `script.js` sends:
- **Method & URL:** `POST /api/certificate`
- **Headers:** `Content-Type: application/json`
- **Body:** `{ "name": "...", "email": "...", "lang": "ar" | "en" }`
- **Expected JSON response:** `{ "ok": true }` (HTTP 200)
