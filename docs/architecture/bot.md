# Systemarchitektur – Bot-Anbindung

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt die **Bot-Anbindung** von MatchUp und erläutert, wie Chatbots als **alternative Schnittstelle** zur Plattform integriert sind.

Der Fokus liegt auf:
- der Motivation für eine Chat-basierte Nutzung
- der Rolle des Bots im Gesamtsystem
- der technischen Kommunikation mit dem Backend
- dem unterstützten Funktionsumfang und den bewussten Einschränkungen

## 🤖 Motivation für Bots
Chatbots ermöglichen einen **direkten und niedrigschwelligen Zugang** zur Plattform, ohne dass eine App installiert oder eine Weboberfläche geöffnet werden muss.

Zentrale Beweggründe sind:
- Nutzung in bestehenden Messenger-Umgebungen
- schneller Zugriff auf Kernfunktionen
- reduzierte Komplexität der Benutzeroberfläche
- Ergänzung zu bestehenden Clients, kein Ersatz

Bots eignen sich insbesondere für **einfache, sequenzielle Interaktionen**.

## 🧩 Rolle des Bots im Gesamtsystem
Der Bot ist ein **reiner Client** innerhalb der MatchUp-Architektur.

Er:
- stellt eine alternative Benutzeroberfläche bereit
- enthält **keine eigene Geschäftslogik**
- trifft **keine fachlichen Entscheidungen**
- greift ausschließlich über definierte API-Endpunkte auf Daten zu

Der Bot ist funktional mit dem Frontend vergleichbar, jedoch stärker durch das Chat-Interface eingeschränkt.

## 🔌 Kommunikation mit dem Backend
Die Kommunikation erfolgt ausschließlich über die **bestehende REST-API** des Backends.

Eigenschaften:
- Nutzung derselben Endpunkte wie das Frontend
- zustandslose Requests
- Token-basierte Nutzeridentifikation
- vollständige serverseitige Validierung

Der Bot agiert als **Thin Client**, der Nutzereingaben entgegennimmt, API-Aufrufe ausführt und die Ergebnisse für die Chat-Ausgabe aufbereitet.

<figure>
  <img
    src="/bot-request-response-flow.png"
    alt="Sequenzdiagramm einer Bot-Interaktion von der Nutzereingabe über Telegram und Backend bis zur Antwort"
    class="thumbnail-300"
  />
  <figcaption>
    Sequenzdiagramm einer typischen Bot-Interaktion über Telegram mit Anbindung an das Backend
  </figcaption>
</figure>

## 🧠 Unterstützte Funktionen
Der Bot stellt einen **reduzierten, aber zentralen Funktionsumfang** bereit.

Unterstützt werden:
- Anzeigen verfügbarer Sportplätze
- Anzeigen von Sessions an einem Sportplatz
- Erstellen neuer Sessions
- Beitreten und Verlassen von Sessions

Die Interaktion erfolgt über:
- Chat-Befehle
- Inline-Buttons
- strukturierte Texteingaben

<figure>
  <img
    src="/telegram-location-list.png"
    alt="Telegram-Chat mit einer Liste verfügbarer Sportplätze und interaktiven Auswahl-Buttons"
    class="thumbnail-300"
  />
  <figcaption>
    Anzeige verfügbarer Sportplätze im Telegram-Chat mit Auswahl über Inline-Buttons
  </figcaption>
</figure>

<figure>
  <img
    src="/telegram-session-detail.png"
    alt="Telegram-Ansicht einer Sportplatz-Detailansicht mit Session-Liste und Aktions-Buttons"
    class="thumbnail-300"
  />
  <figcaption>
    Detailansicht eines Sportplatzes im Bot mit Session-Übersicht und Beitrittsaktionen
  </figcaption>
</figure>

## 🚫 Abgrenzung & Einschränkungen
Der Bot ist bewusst **funktional eingeschränkt**.

Nicht Bestandteil der Bot-Anbindung sind:
- komplexe UI-Elemente wie Kartenansichten
- direkter Datenbankzugriff
- eigene Validierungs- oder Entscheidungslogik
- persistenter UI-Zustand über mehrere Interaktionen hinweg

Alle fachlichen Regeln und Datenoperationen werden ausschließlich im Backend umgesetzt.
