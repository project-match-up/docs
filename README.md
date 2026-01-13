# MatchUp – Projektdokumentation

Dieses Repository enthält die technische Projektdokumentation für **MatchUp**.  
Die Dokumentation wird mit **VitePress** erstellt und ist für Studierende sowie technisch interessierte Leser:innen gedacht.

---

## 📦 Voraussetzungen

Stelle sicher, dass folgende Tools installiert sind:

- **Node.js** (empfohlen: LTS-Version ≥ 18)
- **npm** (kommt mit Node.js)

Überprüfen:
```bash
node --version
npm --version
```

---

## 🚀 Dokumentation lokal starten

###1️⃣ Abhängigkeiten installieren

Im Root-Verzeichnis des `docs`-Repos:

```bash
npm install
```

### 2️⃣ Entwicklungsserver starten

```bash
npm run docs:dev
```

👉 Die Dokumentation ist danach erreichbar unter:  
**http://localhost:5173**

Änderungen an `.md`-Dateien werden automatisch neu geladen.

---

## 🧭 Projektstruktur

```text
docs/
├─ overview/        → Projektübersicht & Einführung
├─ architecture/    → Systemarchitektur (Frontend, Backend, Bot)
├─ data/            → Datenflüsse & Datenbankschema
├─ repositories/    → Repo-spezifische Dokumentation
├─ future/          → Future Work & Optimierungsideen
└─ index.md         → Startseite
```

---

## ✍️ Schreiben an der Dokumentation

- Jede Markdown-Datei enthält:
  - ein **klar definiertes Ziel**
  - eine **inhaltliche Gliederung**, was dort erklärt werden soll
- Bitte **keine Dopplungen** zwischen Kapiteln einführen
- Screenshots und Diagramme **direkt dort einbinden**, wo sie die Erklärung unterstützen
- Fachbegriffe & Code: **Englisch**
- Erklärungstext: **Deutsch**

---

## 🧪 Build (optional)

Um die statische Dokumentation zu bauen:

```bash
npm run docs:build
```

Output liegt danach im Ordner `.vitepress/dist`.

---

## ℹ️ Hinweis

Diese Dokumentation beschreibt den **aktuellen Entwicklungsstand** von MatchUp  
basierend auf:
- Live-System
- Client-, Backend- und Bot-Repository

Das ursprüngliche PRD dient nur als konzeptioneller Hintergrund.

---

Viel Erfolg beim Dokumentieren 🚀
