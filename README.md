# Iroko

**An operating system for African oral memory.**

Elders speak — in any language, in any code-switching mix — and Iroko listens. It transcribes the audio, pulls out the people, places, objects, lessons and skills woven through the story, grounds each one in the elder's own words, and saves it to a growing library. The long-term vision is a knowledge graph: two families' separate memories of the same Lagos market in 1965 quietly finding each other.

When an elder speaks, a library lives.

🌍 **Live app:** [iroko-eight.vercel.app](https://iroko-eight.vercel.app/)

---

## Why "Iroko"

The iroko is a towering West African hardwood that can stand for centuries. In Yoruba tradition it carries deep cultural weight — a tree that outlives the people who grew up beneath it and holds the memory of a place. That is the ambition of this project: to let a story outlive the voice that told it.

---

## What it does

Upload a voice recording of someone telling a story — a grandmother describing the market she traded in, a grandfather recounting the trip that changed his family — and Iroko returns:

- A **faithful transcript**, with code-switching preserved exactly as spoken and inaudible sections marked.
- **Detected languages** (English, Nigerian Pidgin, Yoruba, Igbo, Hausa, Swahili, and mixes of them).
- **Structured entities** — every meaningful Person, Place, Object, Lesson, and Skill mentioned, each with a one-line synthesis and the verbatim quote it came from.

Each story is saved to a personal **library** that grows over time. A counter tracks how many stories and how many entities have been preserved.

### What makes it different

- **Source-grounded.** Every extracted entity carries the exact sentence it came from. This isn't a summary — it's a record. That traceability is the product's core trust mechanism.
- **African-language-first.** Built around code-switched, multilingual speech rather than treating it as an edge case.
- **"Lesson" as a first-class entity.** Proverbs and inherited wisdom are extracted as their own type — often the most resonant thing in a story. *Owó kì í mọ ojú ẹni tí ó ní* — "money does not recognise the face of its owner" — survives as a structured artifact, not a throwaway line in a transcript.

---

## How it works

```
audio file ──▶ Gemini 2.5 Flash ──▶ structured JSON ──▶ transcript + entity cards ──▶ library
   (base64)      (single call)         (transcript,
                                         languages,
                                         entities[])
```

A single call to Gemini 2.5 Flash receives the audio as inline base64 data alongside an ethnographer system prompt, and returns JSON with the transcript, detected languages, and an array of entities. The frontend renders the transcript in a serif face — to make the output feel like an archive entry rather than a SaaS dashboard — and groups the entity cards by type.

---

## Tech stack

| Layer       | Choice                                                                 |
| ----------- | ---------------------------------------------------------------------- |
| Frontend    | Vanilla JavaScript, single `main.js`                                   |
| Build       | Vite                                                                   |
| AI          | Gemini 2.5 Flash via the AI Studio REST API (raw `fetch`, no SDK)      |
| Storage     | `localStorage` (per-device; no backend sync yet)                       |
| Deployment  | Vercel (auto-deploys on push to `main`)                                |

```
iroko/
├── index.html
├── vite.config.js
├── package.json
├── .env.example         # template — GEMINI_API_KEY=...
├── .gitignore
└── src/
    ├── main.js          # all logic
    └── style.css        # all styles
```

---

## Roadmap

Iroko today is the **capture layer**. The plan is to grow it into a graph.

**Capture (now → near-term)**
In-app voice recording, manual entity editing and correction, inline audio playback, multilingual UI, and export to a PDF memory book or JSON archive.

**The graph (medium-term)**
A real backend with user accounts and cross-device sync, embedding-based entity resolution that finds the same person or place across different stories, a candidate-merge UI, graph visualisation, and a synthesis query — *"tell me everything we know about this person"* — answered across the whole library.

**The network (long-term)**
Shared libraries for families, diaspora groups, and cultural institutions, with permissioned cross-family linking. The point where two separate libraries, recorded continents apart, become one.

### Known limitations (MVP)

- No backend — all state lives in `localStorage`, per device.
- No accounts, no search across the library, no export, no manual entity editing.
- No cross-story entity linking yet (that's the headline feature still to come).

---

## Origin

Iroko was built in a one-hour hackathon at a Google Developer Group build-a-thon in Ibadan, Nigeria (May 2026), and placed **2nd overall**. The brief required a live demo and the use of at least one Google AI tool. The version you see here grew out of that prototype.

---

## Contributing & contact

Issues and ideas are welcome — open one on the repo. Maintained by Ibrahim Yekinni ([@Ibrahimyekinni](https://github.com/Ibrahimyekinni)).

---

*A note on the demo data:* the sample stories shipped with the app are constructed for demonstration and are designed to share overlapping details (a Lagos market, the textile trade, the 1960s) so the cross-story linking vision is visible even before the graph exists.
