# Iroko Current State

Here are the file contents and the analysis of the mobile layout issues as requested.

### 1. `src/style.css`

```css
:root {
  --bg-color: #121212;
  --surface-color: #1e1e1e;
  --surface-hover: #2d2d2d;
  --text-primary: #f5f5f5;
  --text-secondary: #aaaaaa;
  --accent-color: #ff8c42; /* warm orange accent */
  --accent-glow: rgba(255, 140, 66, 0.3);
  --border-radius: 12px;
  --transition: all 0.3s ease;
  
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --font-serif: 'Merriweather', 'Georgia', serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

body::before, body::after {
  content: '';
  position: fixed;
  width: 50vw;
  height: 50vh;
  border-radius: 50%;
  filter: blur(100px);
  z-index: -1;
  pointer-events: none;
}

body::before {
  top: -10%;
  left: -10%;
  background: radial-gradient(circle, rgba(255, 140, 66, 0.15), transparent 70%);
}

body::after {
  bottom: -10%;
  right: -10%;
  background: radial-gradient(circle, rgba(60, 40, 180, 0.15), transparent 70%);
}

.top-accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-color), #3c28b4);
  z-index: 100;
}

#app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #fff, var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.hero-tagline {
  color: #888;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.2rem;
  font-weight: 300;
}

/* Drag & Drop Zone */
.dropzone-container {
  width: 100%;
  margin-bottom: 2rem;
}

#drop-zone {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

#drop-zone::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  box-shadow: inset 0 0 0 0 var(--accent-color);
  transition: var(--transition);
  border-radius: var(--border-radius);
  pointer-events: none;
}

#drop-zone.dragover {
  border-color: var(--accent-color);
  background-color: rgba(255, 140, 66, 0.05);
}

#drop-zone.dragover::before {
  box-shadow: inset 0 0 20px 0 var(--accent-glow);
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
}

/* Loading State */
#loading {
  display: none;
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--surface-color);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Results */
#results {
  display: none;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.meta-info {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.badge {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: 0.75rem;
  color: #888;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.section-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
  color: #888;
}

/* Transcript */
.transcript-container {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.transcript-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
}

.transcript-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #888;
}

#transcript-text {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.8;
  color: #e0e0e0;
}

/* Entities */
.entity-group {
  margin-bottom: 2rem;
}

.entity-group-title {
  font-size: 0.8rem;
  color: rgba(255, 140, 66, 0.7);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.entity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.entity-card {
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.25rem;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}

.entity-card:hover,
.entity-card:active {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(212,165,116,0.3);
  border-color: rgba(212, 165, 116, 0.3);
}

.entity-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fff;
}

.entity-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.entity-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.9rem;
  padding-left: 1rem;
  border-left: 2px solid var(--accent-color);
  color: #ccc;
}

/* Error */
#error-msg {
  display: none;
  background-color: rgba(255, 82, 82, 0.1);
  color: #ff5252;
  border: 1px solid #ff5252;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  text-align: center;
}

/* Stats */
.stats-counter {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
  font-family: var(--font-sans);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Speaker Input */
.speaker-input-wrapper {
  margin-bottom: 1rem;
  text-align: left;
}

.speaker-label {
  display: block;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.speaker-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-family: var(--font-sans);
  font-size: 1rem;
  outline: none;
  transition: var(--transition);
}

.speaker-input:focus {
  border-color: rgba(255, 140, 66, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

/* Library */
.library-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.library-scroll::-webkit-scrollbar {
  height: 6px;
}
.library-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.library-card {
  position: relative;
  min-width: 250px;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem;
  padding-right: 3rem;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.library-card:hover,
.library-card:active {
  transform: translateY(-2px);
  border-color: rgba(255, 140, 66, 0.3);
}

.library-card.active {
  border-color: rgba(255, 140, 66, 0.7);
  background: rgba(255, 140, 66, 0.05);
}

.library-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.library-card-header strong {
  font-size: 1rem;
  color: #fff;
}

.library-card-header .date {
  font-size: 0.75rem;
  color: #888;
}

.library-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #888;
}

/* Card Delete Button */
.card-delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  opacity: 0.3;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  transition: opacity 0.2s, color 0.2s;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

.card-delete-btn:hover,
.card-delete-btn:active {
  opacity: 1;
  color: #ff5252;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.modal-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}

.modal-card {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  text-align: left;
  transform: scale(0.95);
  transition: transform 0.2s ease;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.modal-backdrop.open .modal-card {
  transform: scale(1);
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.modal-body {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-body strong {
  color: #fff;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-primary {
  background: var(--accent-color);
  color: #121212;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary:hover {
  background: #fff;
}

.btn-secondary {
  background: transparent;
  color: #ff5252;
  border: 1px solid rgba(255, 82, 82, 0.5);
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: var(--transition);
}

.btn-secondary:hover {
  background: rgba(255, 82, 82, 0.1);
  border-color: #ff5252;
}

/* Footer */
.app-footer {
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.clear-link {
  color: #666;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s;
}

.clear-link:hover {
  color: #ff5252;
}

/* Responsive and Mobile Toggles */
.mobile-text {
  display: none;
}

@media (max-width: 768px) {
  .desktop-text {
    display: none;
  }
  
  .mobile-text {
    display: block;
  }

  /* App container */
  #app {
    padding: 1rem;
  }

  /* Hero Title */
  .hero-title {
    font-size: clamp(2.5rem, 12vw, 4rem);
  }

  /* Dropzone padding */
  #drop-zone {
    padding: 2.5rem 1rem;
  }

  /* Speaker input margin fix for smaller screens if needed */
  .dropzone-container {
    margin-bottom: 1.5rem;
  }

  /* Library Cards: vertical stack */
  .library-scroll {
    flex-direction: column;
    overflow-x: hidden;
    gap: 1rem;
  }

  .library-card {
    width: 100%;
    min-width: unset;
  }

  /* Entity cards: single column */
  .entity-grid {
    grid-template-columns: 1fr;
  }

  /* Prevent text overflow and horizontal scrolling */
  .transcript-container, .entity-card {
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .transcript-container {
    padding: 1.5rem 1rem;
  }

  #transcript-text {
    font-size: 1.15rem;
  }

  /* Modal responsiveness */
  .modal-card {
    max-width: 90vw;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
```

### 2. `src/main.js`

```javascript
import './style.css';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const errorMsg = document.getElementById('error-msg');
const metaInfo = document.getElementById('meta-info');
const transcriptText = document.getElementById('transcript-text');
const entitiesContent = document.getElementById('entities-content');

// Handle Drag & Drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    handleFile(e.dataTransfer.files[0]);
  }
});

dropZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
  loading.style.display = 'none';
}

function hideError() {
  errorMsg.style.display = 'none';
}

async function handleFile(file) {
  const fileName = file.name || '';
  const extMatch = fileName.match(/\.([a-z0-9]+)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : '';

  const extToMime = {
    'mp3': 'audio/mpeg',
    'm4a': 'audio/mp4',
    'mp4': 'audio/mp4',
    'wav': 'audio/wav',
    'webm': 'audio/webm',
    'ogg': 'audio/ogg',
    'oga': 'audio/ogg',
    'opus': 'audio/ogg',
    'aac': 'audio/aac',
    'mpeg': 'audio/mpeg',
    'mpga': 'audio/mpeg'
  };

  if (!extToMime[ext]) {
    showError('Please upload a valid audio file.');
    return;
  }

  hideError();
  results.style.display = 'none';
  loading.style.display = 'block';
  dropZone.style.display = 'none';

  try {
    const base64Audio = await fileToBase64(file);
    let mimeType = file.type;
    if (!mimeType || !mimeType.startsWith('audio/')) {
      mimeType = extToMime[ext];
    }

    const apiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API Key not found. Please set GEMINI_API_KEY environment variable.');
    }

    const data = await callGemini(base64Audio, mimeType, apiKey);
    
    const newStory = {
      id: Date.now().toString(),
      speaker_label: speakerInput.value.trim() || `Untitled Elder #${library.length + 1}`,
      date: new Date().toLocaleDateString(),
      transcript: data.transcript,
      detected_languages: data.detected_languages || [],
      entities: data.entities || [],
      original_filename: file.name
    };

    library.push(newStory);
    localStorage.setItem('iroko_library', JSON.stringify(library));
    console.log("Library length after save:", library.length);
    activeStoryId = newStory.id;
    speakerInput.value = '';

    renderLibrary();
    renderActiveStory();
    updateStats();
  } catch (error) {
    console.error(error);
    showError(error.message || 'An error occurred during processing.');
    dropZone.style.display = 'block';
  } finally {
    loading.style.display = 'none';
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

async function callGemini(base64Data, mimeType, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are an expert audio analyst.
Analyze the provided audio and return a JSON object with the exact following schema:
{
  "transcript": "string, full transcript of the audio preserving any code-switching",
  "detected_languages": ["string"],
  "entities": [
    {
      "type": "Person | Place | Lesson | Object",
      "name": "string",
      "description": "string",
      "source_quote": "string, exact quote from transcript"
    }
  ]
}`;

  const payload = {
    systemInstruction: {
      parts: [{ text: prompt }]
    },
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const jsonResponse = await response.json();
  const rawText = jsonResponse.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawText) {
    throw new Error('Failed to parse Gemini response.');
  }

  return JSON.parse(rawText);
}

const speakerInput = document.getElementById('speaker-input');
const statsCounter = document.getElementById('stats-counter');
const librarySection = document.getElementById('library-section');
const libraryCardsContainer = document.getElementById('library-cards-container');
const clearLibraryBtn = document.getElementById('clear-library');

let library = [];
try {
  const stored = localStorage.getItem('iroko_library');
  if (stored) {
    library = JSON.parse(stored);
  }
} catch (e) {
  console.error("Failed to parse localStorage:", e);
}
console.log("Library loaded on start:", library.length);

let activeStoryId = null;

function initLibrary() {
  if (library && library.length > 0) {
    activeStoryId = library[library.length - 1].id;
    renderLibrary();
    renderActiveStory();
  }
  updateStats();
}

clearLibraryBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(confirm("Clear the entire library?")) {
    library = [];
    localStorage.removeItem('iroko_library');
    activeStoryId = null;
    results.style.display = 'none';
    librarySection.style.display = 'none';
    updateStats();
  }
});

function renderActiveStory() {
  const activeStory = library.find(s => s.id === activeStoryId);
  if (!activeStory) return;

  // Clear previous
  metaInfo.innerHTML = '';
  entitiesContent.innerHTML = '';
  
  // Render languages
  if (activeStory.detected_languages && activeStory.detected_languages.length > 0) {
    activeStory.detected_languages.forEach(lang => {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = lang;
      metaInfo.appendChild(badge);
    });
  }

  // Render transcript
  transcriptText.textContent = activeStory.transcript || 'No transcript generated.';

  // Render entities
  if (activeStory.entities && activeStory.entities.length > 0) {
    // Group entities by type
    const grouped = activeStory.entities.reduce((acc, entity) => {
      const type = entity.type || 'Other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(entity);
      return acc;
    }, {});

    for (const [type, entitiesList] of Object.entries(grouped)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'entity-group';

      const title = document.createElement('h4');
      title.className = 'entity-group-title';
      title.textContent = type;
      groupDiv.appendChild(title);

      const gridDiv = document.createElement('div');
      gridDiv.className = 'entity-grid';

      entitiesList.forEach(entity => {
        const card = document.createElement('div');
        card.className = 'entity-card';

        const name = document.createElement('div');
        name.className = 'entity-name';
        name.textContent = entity.name;

        const desc = document.createElement('div');
        desc.className = 'entity-desc';
        desc.textContent = entity.description;

        card.appendChild(name);
        card.appendChild(desc);

        if (entity.source_quote) {
          const quote = document.createElement('div');
          quote.className = 'entity-quote';
          quote.textContent = `"${entity.source_quote}"`;
          card.appendChild(quote);
        }

        gridDiv.appendChild(card);
      });

      groupDiv.appendChild(gridDiv);
      entitiesContent.appendChild(groupDiv);
    }
  } else {
    entitiesContent.textContent = 'No entities detected.';
  }

  results.style.display = 'block';
  dropZone.style.display = 'block'; // Show again for more files
}

function renderLibrary() {
  if (library.length === 0) {
    librarySection.style.display = 'none';
    return;
  }
  librarySection.style.display = 'block';
  libraryCardsContainer.innerHTML = '';

  library.forEach(story => {
    const card = document.createElement('div');
    card.className = `library-card ${story.id === activeStoryId ? 'active' : ''}`;
    card.onclick = () => {
      activeStoryId = story.id;
      renderLibrary();
      renderActiveStory();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'card-delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      openDeleteModal(story.id);
    };

    const header = document.createElement('div');
    header.className = 'library-card-header';
    header.innerHTML = `<strong>${story.speaker_label}</strong> <span class="date">${story.date}</span>`;
    
    const meta = document.createElement('div');
    meta.className = 'library-card-meta';
    const lang = story.detected_languages.join(', ');
    meta.innerHTML = `<span>${lang}</span> <span>${story.entities.length} entities</span>`;

    card.appendChild(deleteBtn);
    card.appendChild(header);
    card.appendChild(meta);
    libraryCardsContainer.appendChild(card);
  });
}

function updateStats() {
  const totalEntities = library.reduce((sum, story) => sum + (story.entities ? story.entities.length : 0), 0);
  statsCounter.textContent = `${library.length} stories • ${totalEntities} entities preserved`;
}

// Modal Logic
let storyToDelete = null;

function openDeleteModal(storyId) {
  storyToDelete = storyId;
  const story = library.find(s => s.id === storyId);
  if (!story) return;
  
  document.getElementById('modal-speaker-name').textContent = story.speaker_label;
  const modal = document.getElementById('delete-modal');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('open'), 10);
}

function closeDeleteModal() {
  const modal = document.getElementById('delete-modal');
  modal.classList.remove('open');
  setTimeout(() => {
    modal.style.display = 'none';
    storyToDelete = null;
  }, 200);
}

document.getElementById('modal-btn-keep').addEventListener('click', closeDeleteModal);

document.getElementById('modal-btn-forget').addEventListener('click', () => {
  if (!storyToDelete) return;
  
  library = library.filter(s => s.id !== storyToDelete);
  try {
    localStorage.setItem('iroko_library', JSON.stringify(library));
  } catch (e) {
    console.error("Failed to save after deletion", e);
  }
  
  if (activeStoryId === storyToDelete) {
    activeStoryId = null;
    document.getElementById('results').style.display = 'none';
  }
  
  updateStats();
  renderLibrary();
  if (activeStoryId) {
    renderActiveStory();
  }
  closeDeleteModal();
});

document.getElementById('delete-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('delete-modal')) {
    closeDeleteModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('delete-modal').classList.contains('open')) {
    closeDeleteModal();
  }
});

initLibrary();
```

### 3. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Audio Explorer</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  </head>
  <body>
    <div class="top-accent-bar"></div>
    <div id="app">
      <header>
        <h1 class="hero-title">Iroko</h1>
        <p class="subtitle hero-tagline">When an elder speaks, a library lives.</p>
        <p class="stats-counter" id="stats-counter">0 stories • 0 entities preserved</p>
      </header>

      <div id="error-msg"></div>

      <div id="dropzone-container" class="dropzone-container">
        <div class="speaker-input-wrapper">
          <label for="speaker-input" class="speaker-label">Whose story is this? (optional)</label>
          <input type="text" id="speaker-input" class="speaker-input" placeholder="e.g. Grandma Rose">
        </div>
        <div id="drop-zone">
          <div class="upload-icon">🎧</div>
          <h2 class="desktop-text">Drop your audio file here</h2>
          <h2 class="mobile-text">Tap to upload or record</h2>
          <p class="subtitle">Supports MP3, WAV, M4A, etc.</p>
          <input type="file" id="file-input" accept="audio/*" capture="user" style="display: none;">
        </div>
      </div>

      <div id="loading">
        <div class="spinner"></div>
        <h3>Analyzing Audio...</h3>
        <p class="subtitle">Extracting transcript and detecting entities</p>
      </div>

      <div id="library-section" style="display: none;">
        <h3 class="section-title">Library</h3>
        <div id="library-cards-container" class="library-scroll">
          <!-- Library cards injected here -->
        </div>
      </div>

      <div id="results">
        <div class="transcript-container">
          <div class="transcript-header">
            <span class="transcript-label">ORAL HISTORY</span>
            <div class="meta-info" id="meta-info">
              <!-- Badges for languages will be injected here -->
            </div>
          </div>
          <div id="transcript-text"></div>
        </div>

        <div class="entities-container">
          <h3 class="section-title">Detected Entities</h3>
          <div id="entities-content">
            <!-- Entity groups will be injected here -->
          </div>
        </div>
      </div>
      <footer class="app-footer">
        <a href="#" id="clear-library" class="clear-link">Clear library</a>
      </footer>
    </div>

    <!-- Delete Modal -->
    <div id="delete-modal" class="modal-backdrop">
      <div class="modal-card">
        <h3 class="modal-title">Forget this story?</h3>
        <p class="modal-body">
          You're about to remove <strong id="modal-speaker-name"></strong>'s story from your library. The transcript, the people they remembered, the places they named, and the lessons they passed on will be erased. This cannot be undone — and unless this story is recorded elsewhere, this knowledge will be lost again.
        </p>
        <div class="modal-actions">
          <button id="modal-btn-keep" class="btn-primary">Keep it</button>
          <button id="modal-btn-forget" class="btn-secondary">Forget</button>
        </div>
      </div>
    </div>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 4. Existing CSS Breakpoints
There is exactly **one** CSS breakpoint in `style.css` right now:
```css
@media (max-width: 768px) { ... }
```
There are no breakpoints specifically dedicated to screens `< 480px`. The app relies entirely on this single tablet/mobile breakpoint and fluid scaling (like the `clamp()` function for fonts) for small screens.

### 5. What currently breaks on mobile screens (< 480px)

Based on the code, several things will fundamentally break or provide a terrible UX on mobile phones:

**The library cards row at the top**
* **The "Vertical Stacking" Bug:** Under 768px, `.library-scroll` receives `flex-direction: column`. Because of this, the library completely loses its horizontal scrolling capability. If a user uploads 5 stories, those 5 cards will stack vertically on top of each other into a massive list, pushing the current story results off the bottom of the screen. It ceases to be a "row" entirely.
* **Hidden Delete Buttons:** The `.card-delete-btn` relies on `:hover` to change from `opacity: 0.3` to `opacity: 1`. On mobile, hover states don't exist, meaning the delete buttons will remain permanently faded out and extremely hard to see unless a user happens to tap exactly on them. 

**The upload dropzone**
* **The `capture="user"` Bug:** In `index.html`, the file input has `capture="user"`. On many mobile devices (especially iOS Safari), this strictly forces the phone's microphone to open and actively **prevents** the user from opening their file system to upload an existing MP3/WAV file. The UI text says "Tap to upload or record", but it will only allow recording.
* **Sticky Hover States:** Tapping the dropzone to trigger the file input can trigger the `#drop-zone.dragover` or active states, causing the dropzone to look "stuck" in a highlighted color after the user closes the file picker.

**Other elements that break on < 480px screens**
* **Transcript Header Overlap:** The `.transcript-header` uses `display: flex; justify-content: space-between;` but lacks `flex-wrap: wrap;`. On very narrow screens, the "ORAL HISTORY" label will crash directly into the language badges if multiple languages are detected, causing ugly overlapping or squished text.
* **Modal Button Layout:** Inside the modal, `.modal-actions` becomes a `flex-direction: column`, which stacks the "Keep it" and "Forget" buttons. However, they lack `width: 100%` or centered alignment, meaning they will default to stretching the full width natively or looking awkwardly left/right aligned depending on the mobile browser engine's default cross-axis handling.
