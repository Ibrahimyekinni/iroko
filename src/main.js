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
    renderResults(data);
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

function renderResults(data) {
  // Clear previous
  metaInfo.innerHTML = '';
  entitiesContent.innerHTML = '';
  
  // Render languages
  if (data.detected_languages && data.detected_languages.length > 0) {
    data.detected_languages.forEach(lang => {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = lang;
      metaInfo.appendChild(badge);
    });
  }

  // Render transcript
  transcriptText.textContent = data.transcript || 'No transcript generated.';

  // Render entities
  if (data.entities && data.entities.length > 0) {
    // Group entities by type
    const grouped = data.entities.reduce((acc, entity) => {
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
