# Iroko: Market Research & Product Strategy Report

This report evaluates the viability of Iroko across two primary hypotheses, maps the competitive landscape, identifies adjacent opportunities, and provides strategic recommendations for go-to-market.

---

## Task 1 — Validate Hypothesis A (The Diaspora Family)

### Market Size
The African diaspora in the target regions is large, growing rapidly, and highly engaged with heritage:
*   **United States:** The Black immigrant population (African-born and Caribbean) reached 5.6 million in 2024. The sub-Saharan African diaspora is estimated at nearly 4.8 million, making it the fastest-growing Black immigrant group.
*   **Canada:** The Black population is approximately 1.55 million (4.3% of the total population), with over 60% born outside of Canada. It is projected to reach over 3 million by 2041.
*   **United Kingdom:** The Black British population is approximately 2.49 million, heavily concentrated in major metropolitan areas like Greater London.

### Demand Evidence
There is a documented, emotional demand for family heritage preservation. Subreddits like `r/AfricanDiaspora` and `r/Genealogy`, alongside diaspora community groups on Facebook, frequently feature discussions about losing language and history. However, this demand is often **aspirational** rather than behavioral—families *want* to do it, but friction prevents them. 

### Current Tools Used
Diaspora families currently rely on a spectrum of tools:
*   **Guided Memoir Apps:** Remento ($99/year) and StoryWorth ($99/year) prompt users for stories and print books. Storii ($9.99/mo) uses phone calls.
*   **Premium Done-For-You:** StoryTerrace ($2,700+) pairs families with ghostwriters.
*   **DIY / Free:** Smartphone voice memos, WhatsApp voice notes, and FamilySearch Memories (free archive).

### Where Current Tools Fail
*   **Linguistic Limitations:** Tools like Remento and StoryWorth rely on standard automated speech recognition (ASR) engines (like Whisper or AWS Transcribe). They fail catastrophically when encountering code-switching (e.g., mixing Yoruba, Pidgin, and English). 
*   **Cultural Context:** They do not extract African-specific cultural metadata (Proverbs, Traditional Skills) which are central to African oral history.
*   **Format Friction:** African elders often resist formal "interview" setups or complicated apps, preferring organic conversation.

### Willingness to Pay & Decision Maker
*   **Price Point:** A realistic consumer subscription is **$9.99/month** or **$79–$99/year** (matching Remento/StoryWorth). Alternatively, a "one-time archive unlock" fee of $50-$100 per elder.
*   **The Buyer:** The decision-maker is almost never the elder. The buyer is the **Millennial/Gen Z child or grandchild** (aged 25-45) living in the West with disposable income, often acting as the designated "family historian."

---

## Task 2 — Validate Hypothesis B (The Oral History Researcher)

### Academic Researchers & Programs
Linguists, anthropologists, and oral historians specializing in African studies actively conduct this research.
*   **Real Institutions:**
    1.  SOAS (School of Oriental and African Studies, University of London)
    2.  Northwestern University (Program of African Studies)
    3.  Boston University (African Studies Center)
    4.  Indiana University (African Studies Program)
    5.  Michigan State University (African Studies Center)
    6.  Harvard University (Committee on African Studies)
    7.  University of Florida (Center for African Studies)
    8.  Yale University (Council on African Studies)
    9.  Columbia University (Institute of African Studies)
    10. Rutgers University (Center for African Studies)

### Current Tools
*   **ELAN (EUDICO Linguistic Annotator):** The free, open-source industry standard for time-aligned, multi-modal transcription.
*   **FLEx (FieldWorks Language Explorer):** Used for deep morphological analysis and interlinearization.
*   **NVivo:** Used for qualitative analysis and entity coding.
*   **Commercial ASR (Otter.ai, Trint):** Used by some for generating "first drafts" of English interviews.

### Where Current Tools Fail
*   **The Code-Switching Barrier:** In African contexts, code-switching is analyzed using frameworks like the Matrix Language Frame (MLF). Standard ASR cannot handle switching between a matrix language (e.g., Hausa) and an embedded language (e.g., English) mid-sentence.
*   **Manual Labor & The Transcription Bottleneck:** Because AI tools fail at African languages, researchers must manually transcribe in ELAN. In documentary linguistics, this takes **10 to 30 hours of labor for every 1 hour of audio** (and sometimes up to 50:1 for complex, multi-speaker, code-switched recordings). This is because ELAN requires "thick" transcription: researchers aren't just typing words; they are manually aligning timestamps, adding morpheme-by-morpheme glosses (often exported to FLEx), noting pauses, and deciphering overlapping natural speech without standardized orthography. The sheer time cost makes transcription the single largest bottleneck in academic fieldwork, often leaving hundreds of hours of recorded fieldwork unanalyzed for years.

### Budgets and Decision Makers
*   **Realistic Budget:** Individual researcher grants (e.g., NSF/NEH) often allocate **$1,500 to $5,000** for transcription services or research assistants. Institutional software licenses (like NVivo) run **$180 to $1,400 per year per user**.
*   **The Buyer:** The **Principal Investigator (PI)** controls specific grant budgets (Direct Costs). The **University Library** or **Department Chair** controls site-wide software licenses (Indirect/Overhead Costs). 

---

## Task 3 — Competitive Landscape

| Tool | What it does | Who it is for | Cost | Where it fails Iroko's use case |
| :--- | :--- | :--- | :--- | :--- |
| **Whisper (OpenAI)** | Open-source ASR model | Devs / General use | Free (compute cost) | Struggles with heavy African code-switching and dialectical nuances without fine-tuning. Doesn't extract structured metadata. |
| **Otter.ai / Rev.ai** | Automated transcription & meeting notes | Business / Media | $10-$30/mo | Optimized for Western corporate English. Hallucinates on African names, places, and local languages. |
| **Descript** | Audio/video editing via transcript | Podcasters / Creators | $12-$24/mo | Terrible performance on non-Western accents and indigenous languages. |
| **ELAN** | Manual time-aligned annotation | Linguists / Academics | Free | Zero automation natively. Incredibly steep learning curve. Requires tedious manual labor. |
| **ELAR (SOAS)** | Digital repository/archive | Endangered language researchers | Free (Grant funded) | It is an archive, not an ingestion/transcription engine. |
| **Transkribus** | AI transcription (primarily for written documents) | Historians / Archivists | Subscription based | Built primarily for handwritten historical manuscripts, not multilingual audio. |
| **Mukurtu CMS** | Open-source platform for Indigenous heritage | Indigenous communities | Free | Requires technical setup. Focuses on access protocols and archiving, lacks automated AI ingestion/transcription. |
| **StoryCorps Archive** | Public oral history platform | General public (US) | Free | Highly US-centric. Lacks deep entity extraction or code-switching support. |
| **Dovetail / NVivo** | Qualitative data analysis | UX Researchers / Academics | $30/mo to $1,400/yr | Expensive. Relies on the user to manually tag/code entities. They do not accurately auto-transcribe African languages. |

---

## Task 4 — Adjacent Opportunities

### Unconsidered Customer Segments
*   **Documentary Filmmakers & Ethnographic Journalists:** Investigative units like *BBC Africa Eye*, *Vice*, or *Al Jazeera* shoot hundreds of hours of multi-lingual B-roll and interviews across the continent. Their current workflow involves paying local "fixers" or human translators to manually log and translate raw footage before editors can even begin structuring a story. Iroko could act as an instant "rough cut" logging tool, automatically extracting entities (people, places) and translating code-switched dialogue so editors can search raw footage immediately.
*   **Museum Archivists & Cultural Ministries:** Institutions like the *Smithsonian National Museum of African Art*, the *British Library's Endangered Archives Programme*, or state cultural ministries in Nigeria and Kenya hold vast back-catalogs of analog audio tapes (e.g., historical radio broadcasts, ethnographic recordings from the 1970s). As these are digitized, they remain "dark data" (unsearchable). Iroko could batch-process these archives, turning dead audio into structured, searchable metadata.
*   **Diaspora Community Radio & Podcasters:** Stations broadcasting to diaspora communities (e.g., local Yoruba or Somali radio stations in London or Toronto) produce massive amounts of code-switched audio daily. They lack the resources to index their past broadcasts. Iroko could provide them with an automated, searchable back-catalog, allowing listeners to search for specific topics, interviews, or proverbs mentioned on air.

### The WhatsApp Integration
**This is a massive opportunity.** African elders communicate almost exclusively via WhatsApp voice notes. Building an Iroko WhatsApp Bot (where a user forwards their grandma's voice note to an Iroko number, and it instantly replies with a transcript, extracted proverbs, and an archive link) would eliminate 99% of user friction for Hypothesis A. It shifts Iroko from an "app you have to download" to a seamless utility.

### Grants and Funding Bodies
Iroko is perfectly positioned for "digital heritage" grants:
*   **Endangered Languages Documentation Programme (ELDP):** Backed by the Arcadia Fund. Excellent for community-based linguistic documentation.
*   **Mellon Foundation:** Heavily funds digital humanities, social justice, and knowledge "rematriation."
*   **National Endowment for the Humanities (NEH):** Dynamic Language Infrastructure (DLI-DEL) grants (if partnered with a US academic).

---

## Task 5 — Synthesis & Recommendations

### Which Hypothesis Wins?
**Hypothesis B (Researchers) has stronger, more urgent, and paying demand.** 
While Hypothesis A (Diaspora) has a larger Total Addressable Market (TAM), it is a "vitamin." People want to do it, but they procrastinate until the elder passes away. 
Hypothesis B is a **"painkiller."** Researchers have a hard deadline, existing grant budgets, and face a visceral, painful bottleneck (10 hours of manual ELAN transcription for 1 hour of audio). 

### Recommended Primary Target (First 12 Months)
**Go after Academic PIs and Graduate Researchers in African Studies.** 
Position Iroko as a B2B SaaS or grant-funded academic tool. If you can prove that Iroko's Gemini 2.5 Flash pipeline reduces a researcher's ELAN workflow from 10 hours to 1 hour, PIs will gladly pay $500–$1000 from their grant budgets for a project license. Once validated in academia, you can build a consumer-friendly consumer version for the Diaspora (Hypothesis A) using the revenue and refined models from the academic side.

### The Single Most Important Validation Step
**Before writing any more code, validate the AI's accuracy with a linguist.**
Find an oral historian or linguist (reach out to a grad student at Northwestern PAS or SOAS) who has a hard drive full of untranscribed, code-switched audio. Run 10 minutes of their audio through your Iroko MVP. Ask them:
> *"Does this Gemini 2.5 transcript capture the code-switching accurately enough that you would trust it over a human transcriber for a first draft? If I could give you this for all 50 hours of your fieldwork, what would you pay right now to have it tomorrow?"*

If they say yes, you have a business. If they say no, you need to fix the prompting/model before building anything else.
