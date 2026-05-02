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
