# Gravity Breakers — The Longest Journey in the World

> **Designed for children.** Gravity Breakers is a child-friendly, story-driven space exploration experience that introduces young learners to real spacecraft and missions in an accessible way.

Gravity Breakers is a bilingual (Arabic and English) web experience. Children follow a guided journey from Earth to the Moon, Mars, and deep space, explore spacecraft information cards, and finish with a space quiz and certificate request.

## Highlights

- **Four exploration stops:** Earth, the Moon, Mars, and deep space, presented on an illustrated journey map.
- **Astronaut guide:** Short, child-friendly narration introduces each stage and guides the learner through the experience.
- **Mission and spacecraft cards:** Select scene hotspots to learn about missions, vehicles, people, instruments, dates, and achievements. Some story cards are intentionally simplified and do not include full technical details.
- **Bilingual interface:** Switch between Arabic (RTL) and English (LTR). UI labels and educational content are provided in both languages.
- **Narration and sound:** Audio narration and card recordings play when available. Timed on-screen dialogue keeps the story moving when a recording is unavailable. Sound can be muted.
- **Image galleries:** Cards can include related images with captions.
- **Knowledge quiz:** Answer five questions drawn from the journey. Answer choices are shuffled; children receive feedback and explanations, and can review related cards and retry.
- **Progress memory:** Language, mute preference, visited stops, quiz result, and last certificate name are saved in the browser's local storage.
- **Certificate request:** After the quiz, a child can enter a name and email address to request a Space Explorer certificate. Delivery requires a configured webhook or email service.
- **Responsive scenes:** Space scenes and the map adapt to different screen sizes.

## Journey and progression

1. **Launch and Earth:** Start the story, then explore the Earth section and its educational cards.
2. **Moon:** Visit lunar mission hotspots and learn about the hardware left on the Moon.
3. **Mars:** Explore Mars mission and rover cards.
4. **Deep Space:** Continue to the bonus stop and discover selected spacecraft and objects beyond the planets.
5. **Quiz and certificate:** Complete the five-question quiz, see the score, review cards if needed, and submit a certificate request.

The quiz stop unlocks after both the Moon and Mars have been visited. Deep space is an optional bonus stop. The map shows visited and locked stops.

## Technology

- **Frontend:** HTML, CSS, JavaScript ES modules, and Vite.
- **Backend:** Node.js, Express, TypeScript syntax executed with `tsx`, and dotenv.
- **Content:** Bilingual JSON data files in `backend/data/`, imported by the frontend at build time through the Vite alias.
- **Persistence:** Browser `localStorage` for lightweight learner progress; the backend's certificate request records are held in memory while the server process runs.

The frontend can run by itself for the exploration experience. Certificate requests use the backend endpoint; without the backend, the frontend shows a local fallback status instead of sending a request.

## Requirements

- Node.js 18 or later and npm.
- A modern browser.

## Install and run

From the repository root:

```bash
npm run install:all
npm run dev
```

Vite prints the local development URL (normally `http://localhost:3000`). Its development server proxies `/api` requests to `http://localhost:3001`. To enable certificate requests locally, start the backend in a second terminal:

```bash
npm run dev:backend
```

The backend listens on port `3001` by default. Set `PORT` in `backend/.env` to change it. The frontend's certificate form posts to `/api/certificate`; use a reverse proxy or serve the frontend through the backend so that this relative API path reaches the backend.

Build and preview the frontend:

```bash
npm run build
npm run preview
```

## Certificate delivery setup

Copy `backend/.env.example` to `backend/.env` and configure one or both delivery options:

```dotenv
PORT=3001
N8N_WEBHOOK_URL=https://your-n8n-host.example/webhook/your-workflow
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM="The Longest Journey <certificates@example.com>"
```

- `N8N_WEBHOOK_URL` is optional. When set, the backend sends a JSON `POST` containing `name`, `email`, and `lang` (`ar` or `en`). A successful webhook response means the workflow accepted the request; it does not confirm downstream email delivery.
- `RESEND_API_KEY` is optional. When set, the backend also attempts direct email delivery through Resend. `EMAIL_FROM` is optional and defaults to a Resend onboarding sender, which may not be suitable for production.
- If neither service is configured or delivery fails, the API reports a failed delivery. The frontend shows the result to the learner.

Keep secrets in `backend/.env`; do not commit that file. The backend example file documents the available settings.

### API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/certificate` | Validate a name and email, then attempt configured webhook/email delivery. Accepts `{ "name": "A name", "email": "name@example.com", "lang": "en" }`. |
| `GET` | `/api/certificates` | Return certificate request records held in the current server process. |

The certificate endpoint validates that the name contains at least two characters and that the email has a basic valid format. Certificate request records are not persisted to a database and are cleared when the server restarts.

## Project layout

```text
.
├── frontend/
│   ├── index.html              # Screens and accessible UI structure
│   ├── script.js               # Navigation, scenes, language, cards, and certificate form
│   ├── style.css               # Layout, responsive styling, and RTL/LTR presentation
│   ├── src/
│   │   ├── audio.js            # Narration, card audio, fallback timing, and sound effects
│   │   ├── data/loader.js      # Builds localized story content from JSON
│   │   ├── gallery.js          # Card image gallery
│   │   ├── quiz.js             # Quiz flow, scoring, feedback, review, and retry
│   │   └── state.js            # Application state and localStorage persistence
│   └── public/
│       ├── images/             # Scene and card imagery
│       └── audio/              # Narration and card recordings, organized by language
├── backend/
│   ├── data/                   # UI, journey, Moon, Mars/deep-space, and quiz JSON
│   ├── server.ts               # Express API and static-file serving
│   └── .env.example            # Backend configuration template
├── scripts/
│   ├── validate-data.mjs       # Content/schema and bilingual data checks
│   ├── attach-audio.mjs        # Audio asset matching/report script
│   └── migrate-data.mjs        # Data migration helper
├── Ai/generated-assets/        # Source/generated image assets
└── DATA_REVIEW.md              # Content review and fact-check notes
```

## Content and media

The frontend assembles story content from `backend/data/ui.json`, `journey.json`, `moon.json`, `mars.json`, and `quiz.json`. Keep Arabic and English entries aligned when editing shared content. Machine cards can include kid-friendly text, a hero image, fact chips, a summary, facts, a timeline, highlights, crew, instruments, quiz links, and source references. Story-only cards can provide a simpler introduction without a full spacecraft record.

Images used by the web app are served from `frontend/public/images/`. Audio files are organized under `frontend/public/audio/ar/` and `frontend/public/audio/en/`. The player uses the audio paths referenced by the JSON. When a story line has no usable recording, the interface displays its text for a timed interval; missing card recordings do not prevent opening the card. Audio playback can require a first user interaction because of browser autoplay rules.

To add or update a machine, edit the appropriate world's `machines` or `storyCards` entry in `moon.json` or `mars.json`, supply localized strings and valid asset paths, then run the data check. Refer to `frontend/README.md` for the card field example and audio naming conventions.

## Data utilities

Run these commands from the repository root:

```bash
npm run data:check
npm run data:audio
```

- `data:check` validates the data schemas, bilingual coverage, and referenced assets.
- `data:audio` reports audio files that match content and missing or unreferenced recordings. It does not record narration or generate audio.
- `scripts/migrate-data.mjs` is a migration helper; inspect its options before using it on content.

## Notes

- The experience is educational and child-friendly; it is not a mission-control simulator.
- Progress is stored per browser and is not synced between devices.
- Certificate delivery depends on a reachable backend and configured provider. No certificate is sent when delivery is not configured.
- See `DATA_REVIEW.md` for project-specific content review notes and sources recorded by the project.
