# Repository – Telegram Bot

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt den **konkreten technischen Aufbau**, die **Code-Struktur** und die **zentralen Implementierungsstellen** des Telegram-Bot-Repositories.

Es dient als **arbeitsnahe Referenz für die Weiterentwicklung** und ergänzt:
- *Systemarchitektur – Bot-Anbindung*
- *Systemarchitektur – Backend*
- *Daten – Datenflüsse*

Architektur- und Fachkonzepte werden **nicht erneut erklärt**, sondern deren **konkrete Umsetzung im Bot-Code** dokumentiert.

## 🗂️ Ordnerstruktur
Das Bot-Repository ist ein **Node.js / TypeScript-Projekt** und bewusst schlank gehalten.

Zentrale Struktur:
- Einstiegspunkt und Bot-Initialisierung
- modulare Command-Definitionen
- typisierte Environment-Konfiguration

<figure>
  <img
    src="/bot-project-structure.png"
    alt="Ordnerstruktur des Telegram-Bot-Repositories mit Einstiegspunkt, Command-Modulen und Konfiguration"
    class="thumbnail-300"
  />
  <figcaption>
    Ordnerstruktur des Telegram-Bot-Repositories mit Fokus auf Commands und Initialisierung
  </figcaption>
</figure>

Zentrale Dateien:
- `main.ts`  
  Einstiegspunkt und Bot-Lifecycle
- `commands/`  
  Fachliche Interaktionslogik
- `environment.d.ts`  
  Typisierte Environment-Variablen
- `package.json`  
  Abhängigkeiten und Scripts
- `tsconfig.json`  
  TypeScript-Konfiguration

## 🚀 Einstiegspunkt & Bot-Lifecycle
### `main.ts`
`main.ts` ist der **zentrale Einstiegspunkt** des Bots.

Verantwortlichkeiten:
- Laden der Environment-Variablen
- Initialisierung des `grammY`-Bots
- Registrierung aller Commands
- Start des Long-Polling

Ablauf:
- Bot-Token wird aus der Umgebung gelesen
- Commands werden registriert
- verfügbare Bot-Kommandos werden gesetzt
- der Bot beginnt mit dem Empfang von Updates

Der Bot besitzt **keinen globalen Zustand** außerhalb der registrierten Handler  
(siehe *Systemarchitektur – Bot-Anbindung*).

## 🧠 Command-Struktur
Die gesamte fachliche Logik des Bots liegt in **Command-Modulen** unter `commands/`.

### `start.ts`
Dieses Modul bildet den **Einstieg für neue Nutzer**.

Verantwortlichkeiten:
- Verarbeitung des `/start`-Kommandos
- Anzeige einer Begrüßung
- Initialisierung des Nutzers im Backend
- Übergang zur Standortauswahl

Technische Umsetzung:
- Telegram User ID wird als Token verwendet
- Nutzername wird aus Telegram-Profil übernommen
- Initialer Backend-Call zur Nutzerprüfung

Die Nutzeridentifikation entspricht dem allgemeinen Token-Modell  
(siehe *Systemarchitektur – Backend*).

### `location.ts`
Dieses Modul enthält den **Großteil der Bot-Logik**.

Verantwortlichkeiten:
- Laden verfügbarer Sportplätze
- Navigation durch Locations
- Anzeigen von Session-Details
- Erstellen von Sessions
- Beitreten und Verlassen von Sessions

Das Modul verarbeitet:
- Chat-Befehle
- Inline-Button-Callbacks
- strukturierte Texteingaben

## 🔁 Zustandsverwaltung im Bot
Der Bot verwaltet **UI-Zustand explizit und lokal** innerhalb des Moduls.

Verwendete Zustandsvariablen:
- Modus für Session-Aktionen
- temporäre Button-Beschriftungen
- Navigation innerhalb von Auswahlmenüs

Eigenschaften:
- Zustand ist **nicht persistent**
- Zustand ist **nicht benutzerspezifisch isoliert**
- Zustand wird durch Callbacks verändert

Diese Entscheidung ist bewusst getroffen und entspricht der Rolle des Bots als Thin Client  
(siehe *Systemarchitektur – Bot-Anbindung*).

<figure>
  <img
    src="/bot-state-flow.png"
    alt="Zustandsfluss im Telegram-Bot zwischen Nutzerinteraktion, Callback-Handling und Backend-Aufrufen"
    class="thumbnail-300"
  />
  <figcaption>
    Vereinfachter Zustandsfluss im Bot zwischen Nutzerinteraktion und Backend-Kommunikation
  </figcaption>
</figure>

## 🔌 Backend-Kommunikation
Der Bot kommuniziert ausschließlich über **HTTP-Requests** mit dem Backend.

Eigenschaften:
- Nutzung der gleichen REST-Endpunkte wie der Client
- Telegram User ID dient als Token
- JSON-basierte Requests und Responses
- keine lokale Datenhaltung

Backend-Aufrufe erfolgen:
- direkt innerhalb der Command-Handler
- synchron zum Nutzerfluss

Die fachliche Verantwortung liegt vollständig im Backend  
(siehe *Daten – Datenflüsse*).

## 🗺️ Interaktionsflüsse
Die Interaktion im Bot ist **sequenziell** und ereignisgetrieben.

Typischer Ablauf:
- Nutzer sendet Befehl oder klickt Button
- Bot verarbeitet Update
- Bot ruft Backend-Endpunkt auf
- Antwort wird formatiert
- neue Buttons oder Texte werden angezeigt

<figure>
  <img
    src="/bot-interaction-flow.png"
    alt="Ablauf einer typischen Bot-Interaktion vom Telegram-Update bis zur Backend-Antwort"
    class="thumbnail-300"
  />
  <figcaption>
    Ablauf einer typischen Bot-Interaktion vom Telegram-Update bis zur Antwort an den Nutzer
  </figcaption>
</figure>

## 🚀 Wartbarkeit & Erweiterung
Neue Funktionalität wird ergänzt durch:
- neue Command-Module
- Erweiterung bestehender Handler
- zusätzliche Inline-Keyboards

Leitlinien:
- keine Geschäftslogik im Bot
- keine Persistenz im Bot
- keine parallelen User-Flows
- Backend bleibt Single Source of Truth

Neue Bot-Funktionen müssen immer:
- über bestehende Backend-Endpunkte laufen
- in den bestehenden Command-Fluss integriert werden