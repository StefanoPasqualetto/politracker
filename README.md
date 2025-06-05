# 🧠 PoliTracker — OSINT Persona Profiler

> Analizza personaggi pubblici con NLP + fonti OSINT per ottenere bio, entità, notizie e video in un’unica dashboard.

---

## 🚀 Demo

[Demo PoliTracker Dark UI](./screenshot.png)

---

## 📌 Funzionalità principali

- ✅ **Scraping da Wikipedia** (bio + immagine)
- ✅ **Named Entity Recognition** con spaCy (`PER`, `ORG`, `LOC`, `DATE`)
- ✅ **News recenti** via GNews API
- ✅ **Video correlati** da YouTube
- ✅ **UI modulare in stile Intelligence** (Next.js + Tailwind CSS)
- ✅ **Tema dark personalizzato**
- ✅ **Contesto originale per ogni entità**

---

## ⚙️ Stack tecnologico

| Area        | Tech                  |
|-------------|------------------------|
| 🧠 Backend   | Python, FastAPI        |
| 📊 NLP       | spaCy (`it_core_news_lg`) |
| 📰 News      | GNews API             |
| 🎥 Video     | `yt-dlp`              |
| 💻 Frontend | Next.js, TypeScript, Tailwind CSS |
| 🔗 Comunicazione | REST API localhost |

---

## 🧱 Architettura

```
politracker/
├── backend/
│   ├── app/
│   │   ├── scraper.py
│   │   ├── analyzer.py
│   │   ├── api.py (FastAPI)
│   │   └── data_sources/
│   │       ├── google_news.py
│   │       └── youtube.py
│   ├── main.py (CLI test)
│   └── __main__.py (FastAPI run)
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── result/page.tsx
│   └── components/
│       └── Section.tsx
```

---

## 🛠️ Setup & uso locale

### 🔧 1. Backend Python

\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

Assicurati di avere il modello spaCy:

\`\`\`bash
python -m spacy download it_core_news_lg
\`\`\`

Poi avvia il server:

\`\`\`bash
python -m app
\`\`\`

---

### 💻 2. Frontend Next.js

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Accesso su [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variabili d’ambiente

Crea `.env` nel backend con:

\`\`\`env
GNEWS_API_KEY=la_tua_chiave_api
\`\`\`

---

## 💡 Idee future

- 🧠 Classificazione entità in sottotipi
- 🗺️ Grafo entità (con relazioni semantiche)
- 🕵️ Modalità investigativa “multi-target”
- 🧾 Esportazione PDF del profilo
- ⏳ Timeline cronologica eventi chiave
- 📡 Integrazione OSINT automatizzata via RSS, scraping, Tor, etc.

---

## 👤 Autore

**Stefano Pasqualetto** — [LinkedIn](#https://www.linkedin.com/in/stefano-pasqualetto/) 

---

## 🛡️ Licenza

MIT — Free to use, modify, improve.
