# IROKO — Project Bible

> Load this file at the start of any new chat to get full context on the project.
> Last updated: May 2026 · Maintained by Ibrahim Yekinni

---

## 0. How to use this document

This is the single source of truth for the Iroko project. When starting a new session with Claude:

1. Drop this file into the chat
2. Say: _"Read this fully. This is the Iroko project bible. I want to continue working on this."_
3. Claude will have complete context — no re-explaining needed.

If anything changes (new stack decisions, new research, new URLs), update the relevant section here and commit it to the repo.

---

## 1. The one-paragraph pitch

Iroko is an operating system for African oral memory. Elders speak — in any language, any code-switching mix — and Iroko transcribes the audio, extracts structured entities (People, Places, Objects, Lessons, Events) using Gemini 2.5 Flash, grounds each entity in its verbatim source quote, and accumulates stories into a growing personal library. The long-term vision: every story uploaded across the diaspora links to every other via a cross-story knowledge graph, so two families' separate memories of the same Lagos market in 1965 connect automatically. When an elder speaks, a library lives.

---

## 2. Origin story

Built at a Google Developer Group build-a-thon in Ibadan, Nigeria (May 2026). The event was a one-hour hackathon preceded by a workshop on the Survivor Network codelab (graph RAG, Gemini multimodal extraction, Vertex AI embeddings, agentic orchestration). The judging criteria were: Technical Execution, AI Integration, Innovation, UX & Design, Impact and Presentation. Required use of at least one Google AI tool. Live demo required (3–5 min + Q&A). No pre-existing projects.

**Result: 2nd place overall.**

First place went to a rural health AI diagnostic tool deployed on Google Cloud Run — a containerized backend with a multi-step diagnostic pipeline. Good reference point for what "first place" looks like technically.

---

## 3. Current live state

| Resource        | URL                                              |
| --------------- | ------------------------------------------------ |
| Live app        | https://iroko-eight.vercel.app/                  |
| GitHub repo     | https://github.com/Ibrahimyekinni/iroko          |
| Deployment      | Vercel (auto-deploys on push to `main`)          |
| API key env var | `GEMINI_API_KEY` in Vercel environment variables |

**Status as of last update:** Fully deployed and working. Three demo stories pre-recorded. Library persists via localStorage (per-device only — no backend sync yet).

---

## 4. What was actually built (MVP)

### What it does

1. User optionally types a speaker label ("Whose story is this?")
2. User drags/drops or taps to upload an audio file (mp3, m4a, mp4, wav, webm, ogg, aac)
3. A single Gemini 2.5 Flash call receives the audio as base64 inline data + a system prompt
4. Gemini returns structured JSON: `transcript`, `detected_languages`, `entities[]`
5. Each entity has: `type`, `name`, `description`, `source_quote`
6. Entity types: Person, Place, Object, Lesson, Skill
7. Results render as: transcript card (serif font) + entity cards grouped by type
8. Story is saved to localStorage under `iroko_library`
9. A library row at the top shows all saved stories as cards — click to activate
10. Each library card shows speaker label, date, language pills, entity count
11. A counter shows total stories + total entities preserved
12. Delete with meaningful confirmation modal ("Forget this story?" with deliberate friction)

### What it does NOT do yet (important for roadmap)

- No cross-story entity linking or graph
- No backend — all state is localStorage (per-device, not synced)
- No user accounts
- No search across the library
- No audio playback from within the app
- No export (PDF, JSON, etc.)
- No entity editing or manual correction
- No collaborative/shared libraries

---

## 5. Tech stack (exact)

### Frontend

- **Vanilla JavaScript** (no framework — single `main.js` file)
- **Vite** as build tool
- **CSS** in a single `style.css`
- **HTML** in `index.html`

### AI

- **Gemini 2.5 Flash** via AI Studio REST API
  - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
  - Called directly from the browser frontend using `fetch()`
  - Auth: API key in query param (AI Studio key — NOT Vertex AI)
  - Audio passed as `inlineData: { mimeType, data: base64string }`
  - `generationConfig.responseMimeType: "application/json"` — CRITICAL, must be camelCase
  - No SDK used — raw REST fetch call

### Storage

- **localStorage** under key `iroko_library`
- Structure: array of story objects `{ id, speakerLabel, processedAt, filename, transcript, detectedLanguages, entities }`

### Deployment

- **Vercel** (free tier)
- Connected to GitHub repo, auto-deploys on push to `main`
- Build command: `npm run build`
- Output directory: `dist`
- Env var: `GEMINI_API_KEY` — exposed to frontend via Vite's `envPrefix: ['VITE_', 'GEMINI_']` in `vite.config.js`

### File structure

```
iroko/
├── index.html
├── vite.config.js
├── package.json
├── .env                    # GEMINI_API_KEY=... (never committed)
├── .gitignore
├── src/
│   ├── main.js             # All logic
│   └── style.css           # All styles
```

---

## 6. The Gemini extraction prompt

This is the exact system prompt in production. Understanding it is critical for any future improvement:

```
You are an expert ethnographer and oral historian. You receive audio clips of people telling personal, family, or cultural stories — often in African languages or code-switched mixes (English, Nigerian Pidgin, Yoruba, Igbo, Hausa, Swahili, etc.).

Transcribe the audio faithfully. Preserve code-switching exactly as spoken. Mark inaudible sections with [inaudible].

Extract every meaningful person, place, event, time period, object/artifact, lesson/proverb, or skill/knowledge mentioned.

Return ONLY valid JSON in this exact shape. No prose, no markdown fences:

{
  "transcript": "<full transcript with code-switching preserved>",
  "detected_languages": ["<iso code>", ...],
  "entities": [
    {
      "type": "Person | Place | Object | Lesson | Skill",
      "name": "<canonical name or best description>",
      "description": "<1-2 sentence synthesis of what was said about this entity, in English>",
      "source_quote": "<verbatim sentence(s) from the transcript where this entity appears>"
    }
  ]
}
```

**Key design decisions in this prompt:**

- `description` is always in English so embeddings work cross-language in future
- `source_quote` is verbatim — this is the "traceability" feature, the product's core trust mechanism
- Keeping entity types simple (5 types) was deliberate — the hackathon revealed that "Lesson" as a first-class type is the product's most emotionally resonant feature (it's what extracts proverbs)

---

## 7. Design language

| Token             | Value                                                                                                       | Usage                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Background        | `#0a0a0a`                                                                                                   | Full-page dark                                         |
| Ink               | `#e8e8e3`                                                                                                   | Primary text                                           |
| Accent            | `#d4a574`                                                                                                   | Warm earth — entity labels, borders, highlights        |
| Muted             | `#6b6b6b`                                                                                                   | Footer, metadata                                       |
| Dim               | `#9a9a95`                                                                                                   | Secondary text                                         |
| Font (UI)         | Inter or system-ui                                                                                          | Interface elements                                     |
| Font (transcript) | Serif (Lora / Crimson Pro)                                                                                  | Transcript and synthesis — signals "cultural artifact" |
| Border radius     | 16px cards, 12px entity cards                                                                               |                                                        |
| Glass effect      | `background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08)` | All cards                                              |

**Design philosophy:** Restrained. No gradients, no emojis in UI. The serif on transcripts is intentional — it makes the output feel like an archive entry, not a SaaS dashboard.

---

## 8. The three demo stories

These are the canonical demo clips. The cross-references are designed in — they create visible overlaps (Lagos, textile trade) across two separate family stories.

### Clip 1 — Mama Adebayo (Speaker: Ibrahim / user's grandmother)

> "Let me tell you about my grandmother, we called her Mama Adebayo. She was a textile trader at Oja Oba market in Lagos in the 1960s. She sold the finest Aso Oke cloth, the kind mothers buy for their daughters' weddings. People came from Ibadan, from Abeokuta, from everywhere to buy from her. She used to say, Owo ki moju eni ti o ni. It means money does not recognize the face of its owner. Now, the meaning is that we should respect the work, not the wealth. She passed away in 1989, but my mother still has a lot about her past."

**Key entities extracted:** Mama Adebayo (Person), Oja Oba Market (Place), Lagos (Place), Ibadan (Place), Abeokuta (Place), Aso Oke cloth (Object), _Owó kì í mọ ojú ẹni tí ó ní_ (Lesson — the proverb, the demo's emotional punchline)

### Clip 2 — Baba Tunde (Speaker: friend's grandfather)

> "My grandfather, Baba Tunde, was a yam farmer in Ibadan. Around 1965, he traveled to Lagos for the first time — carried his yams down by lorry to sell at the big market. He used to tell my father about one woman he met there, a rich textile trader who bought plenty from him that day, paid him in cash. He used that money to send my father to school. He always said one trip to Lagos changed everything for our family. Without that trip, I would not be here."

**Designed cross-reference:** "rich textile trader" in Lagos, 1965 ↔ Mama Adebayo, textile trader at Oja Oba, 1960s. Two stories that the _human_ eye can connect even without a graph.

### Clip 3 — Aunty Folake (Speaker: family member)

> "My Aunty Folake was a teacher in Lagos for thirty years. She taught at Methodist Girls High School in Yaba. She used to say her own mother taught her one thing — patience is a market that does not close. That is what she repeated to her students. Many women in Lagos — doctors, lawyers — passed through her classroom."

**Designed cross-reference:** "her own mother" ↔ Mama Adebayo (generational link). The proverb "patience is a market that does not close" becomes a second Lesson entity, and its form ("patience is a market…") echoes the market metaphor in clip 1 — subtle thematic linkage.

---

## 9. Product vision (expansion)

### The core thesis

Oral tradition is, literally, a knowledge graph. People connect to places, to events, to lessons, to other people. What Iroko built in an hour is the capture layer. The expansion is the graph layer: automatic entity resolution across stories, cross-family linking, semantic search, synthesis queries.

### Three expansion layers

**Layer 1 — Better capture (near-term)**

- In-app voice recording (no need to upload from phone)
- Manual entity editing and correction (human-in-the-loop)
- Audio playback inline with transcript
- Multi-language UI (Yoruba, Pidgin, French West Africa)
- Export: PDF memory book, JSON archive

**Layer 2 — The graph (medium-term)**

- Real backend (FastAPI or Node + Firestore/PostgreSQL)
- User accounts + library sync across devices
- Entity resolution: `text-embedding-004` to find cross-story entity matches
- Candidate merge UI (dotted edge → confirm → solidify)
- Graph visualization (react-force-graph-2d)
- Synthesis query: "Tell me everything we know about [Person]" → Gemini synthesizes across all stories

**Layer 3 — The network (long-term)**

- Shared/community libraries (families, diaspora groups, cultural institutions)
- Cross-family cross-linking with permission model
- API for institutions (universities, museums, language NGOs)
- The "two libraries become one" vision

### Research questions (open — needs investigation)

- Who are the actual competitors? (Heritage preservation apps, transcription tools, digital humanities platforms — map the space)
- What do African cultural institutions (UNESCO ICHP partners, language preservation NGOs, university digital humanities depts) actually need and pay for?
- What is the data privacy/sovereignty landscape for oral history in Nigeria and West Africa? (NDPR, etc.)
- What does cross-story entity resolution look like at scale? (Spanner Graph? Neo4j? PostgreSQL with pgvector?)
- What's the right embedding model for multilingual African-language text?
- Is there a WhatsApp integration play? (Most elders in Nigeria communicate via voice notes on WhatsApp — that's the native oral-history capture device)
- Academic market: digital humanities, anthropology, linguistics departments — how do they currently archive oral histories?

---

## 10. Monetization angles (early thinking, not validated)

| Tier              | Who                                                     | Model                                                                 | Rough pricing thinking |
| ----------------- | ------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------- |
| **Free**          | Individuals, families                                   | Up to N stories, limited export                                       | Acquisition layer      |
| **Family**        | Households preserving memory                            | Unlimited stories, PDF export, shared family library, device sync     | ~$5–10/month           |
| **Institutional** | Universities, museums, language NGOs, cultural orgs     | Dedicated workspace, bulk upload, API access, data export, whitelabel | $200–500/month         |
| **API**           | Media companies, journalism orgs, documentary producers | Per-call pricing for structured oral history extraction               | Usage-based            |
| **Grant-funded**  | African heritage preservation projects                  | One-time project deployments                                          | Project-based          |

**The institutional angle is probably the real business.** Individuals won't pay much, but a university's digital humanities department or a national language board might pay significantly for a tool that does what Iroko does. This needs primary research — conversations with actual potential institutional buyers.

---

## 11. Competitive landscape (initial, unresearched)

Known tools in adjacent spaces — needs deeper competitive research:

- **Whisper / AssemblyAI / Rev.ai** — transcription only, not structuring, not African-language-first
- **StoryCorps** — oral history archive, US-centric, no AI structuring, nonprofit model
- **Transkribus** — academic transcription tool, European focus
- **SayIt** (various) — transcription SaaS, generic
- **Mukurtu CMS** — Indigenous cultural heritage CMS, community-controlled, no AI
- **ELAR (SOAS)** — Endangered Language Archive, academic, no AI extraction

**The gap Iroko occupies:** No one is doing AI-structured entity extraction from African multilingual oral history, grounded in source quotes, with a cross-story linking vision. This space appears genuinely empty.

---

## 12. Working style notes (Ibrahim ↔ Claude)

- **Don't write long prose when a direct answer works.** Get to the point.
- **When time is short, say so.** Priority changes completely — cut features ruthlessly.
- **Radio/checkbox for clarifying questions.** Ibrahim doesn't like typing long answers to clarifying questions. Use `ask_user_input` tool with options.
- **Prompt-ready outputs.** When producing prompts to paste into another tool (Antigravity, Cursor, etc.), make them clearly labeled and copy-paste ready.
- **Build order matters.** Always sequence: deploy the minimum working thing → iterate. Don't polish before it's deployed.
- **Trust the idea.** The "too bland / too simple" post-build crash is a known pattern. Push back on it.
- **This project is called Iroko.** Not "Audio Explorer" (the working title Antigravity gave it), not "the oral history app." Iroko.

---

## 13. Open tasks (as of last update)

- [ ] Mobile responsiveness fix (library cards and dropzone on small screens)
- [ ] In-app voice recording (MediaRecorder API)
- [ ] Real backend + device sync (Firestore likely)
- [ ] User accounts (Google Sign-In, easiest with Firebase)
- [ ] Audio playback inline with transcript
- [ ] Manual entity editing
- [ ] Cross-story entity resolution (embedding-based)
- [ ] Graph visualization
- [ ] Competitive landscape research
- [ ] Institutional buyer interviews (5 minimum before building for that market)
- [ ] WhatsApp voice note integration research
- [ ] Rename Vercel project URL from `iroko-eight` to something cleaner (iroko.app? iroko.africa? check availability)

---

## 14. Key decisions log

| Decision                        | What was decided                      | Why                                                                                        |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------ |
| No backend in MVP               | localStorage only                     | Time constraint (30 min build). Revisit for v2.                                            |
| Vanilla JS not React            | Single file, fastest to ship          | Same reason. React for v2.                                                                 |
| AI Studio key not Vertex AI     | Direct browser call                   | Vertex auth setup would have eaten 20+ min                                                 |
| Raw fetch not SDK               | Avoids SDK version mismatch bugs      | Pragmatic — both SDKs have breaking changes                                                |
| 5 entity types                  | Person, Place, Object, Lesson, Skill  | Lesson was the emotional punchline. Keep it simple.                                        |
| `source_quote` as core feature  | Every entity has verbatim attribution | Trust mechanism — "this isn't a summary, it's a record"                                    |
| Serif font for transcript       | Lora/Crimson Pro                      | Makes output feel like an archive, not a SaaS app                                          |
| "Forget this story?" modal copy | Long, emotionally specific            | Forces the user to reckon with what they're deleting — on-brand for a preservation product |

---

## 15. Roadmap phases (as of May 2026)

Agreed after hackathon debrief. Four sequential phases. Phase 3 (outreach) must precede Phase 4 (graph) — buyer conversations shape what gets built.

### Phase 1 — Foundation fixes (1–2 days)

Goal: stop the app feeling like a hackathon prototype before showing anyone.

- [ ] Secure clean domain — check iroko.app and iroko.africa availability
- [ ] Update Vercel project URL (currently iroko-eight.vercel.app)
- [ ] Fix mobile responsiveness — library cards + dropzone break on small screens
- [ ] General visual cleanup pass

### Phase 2 — Backend + accounts (1–2 weeks)

Goal: cross the demo-ready threshold. App must feel permanent, not disposable.

- [ ] Set up Firebase project (Firestore + Authentication)
- [ ] Google Sign-In (fastest auth path, no new password friction)
- [ ] Migrate story storage from localStorage → Firestore (per-user collection)
- [ ] Device sync — stories appear on any device after login
- [ ] Migrate from vanilla JS to React (needed for state management at this complexity)
- [ ] Keep Vercel deployment, swap env vars for Firebase config

**Demo-ready threshold:** after Phase 2, the app has a real URL, works on mobile, persists data across devices, and has user accounts. This is the minimum for institutional outreach.

### Phase 3 — Outreach begins (ongoing from Phase 2)

Goal: validate who pays before building what they'd pay for.

- [ ] Map 10 target institutions (University of Lagos, SOAS, NLC, UNESCO ICHP partners, language NGOs)
- [ ] Draft outreach message (lead with the demo, not the pitch)
- [ ] Conduct minimum 5 buyer conversations
- [ ] Key questions: workflow today, budget owner, data sovereignty concerns, must-have vs nice-to-have features
- [ ] Synthesise findings before starting Phase 4

### Phase 4 — Graph layer (shaped by Phase 3 learnings)

Goal: build the cross-story knowledge graph that makes Iroko irreplaceable.

- [ ] Real backend (FastAPI or Node + Firestore/PostgreSQL)
- [ ] Embedding-based entity resolution (text-embedding-004)
- [ ] Candidate merge UI (dotted edge → confirm → solidify)
- [ ] Graph visualisation (react-force-graph-2d)
- [ ] Synthesis query: "Tell me everything about [Person]"
- [ ] Scope and priority informed by Phase 3 buyer conversations

---

## 16. Problem hypotheses (as of May 2026)

Defined during post-hackathon strategy session. These are hypotheses, not answers.
The research session (see prompt in Section 17) validates which one is true.

### Hypothesis A — The Family
Iroko is for diaspora families who want to document an elder's stories before
it's too late, but never do it because there's no simple tool that turns a voice
recording into something structured and permanent — so when the elder dies,
the knowledge dies with them.

### Hypothesis B — The Researcher
Iroko is for African studies researchers and oral historians who conduct dozens
of interviews but spend weeks manually transcribing and tagging them — so
fieldwork that should take days takes months, and the knowledge stays locked
in audio files nobody can search or cite.

### What the research session needs to answer
- Which hypothesis describes a person with real, urgent, recurring pain?
- Which person is more likely to pay for a solution — and how much?
- What tools already exist for each person, and where do those tools fall short?
- Are there adjacent problems or customer segments we haven't considered?

---

_End of project bible. Update this file whenever a significant decision is made._
