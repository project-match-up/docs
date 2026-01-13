# Daten – Datenbankschema

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt die **Struktur der Datenbank**, die **zentralen Tabellen** sowie die **Beziehungen und Datenflüsse** zwischen den Entitäten von MatchUp.

Der Fokus liegt auf:
- dem logischen Aufbau des Datenmodells
- den wichtigsten persistierten Entitäten
- den Beziehungen zwischen Nutzern, Sessions und Sportplätzen
- dem Lebenszyklus der gespeicherten Daten

## 🗄️ Überblick über das Datenmodell
MatchUp verwendet ein **relationales Datenbankschema**, um fachliche Zusammenhänge klar, konsistent und überprüfbar abzubilden.

Die relationale Struktur ermöglicht:
- klare Zuordnung von Verantwortlichkeiten
- referenzielle Integrität zwischen Entitäten
- konsistente Durchsetzung von Geschäftsregeln
- saubere Trennung zwischen Persistenz und Logik

Die Datenbank fungiert ausschließlich als **Persistenzschicht**.  
Jeglicher Zugriff erfolgt kontrolliert über das Backend.

## 🧱 Zentrale Tabellen
Das Datenbankschema besteht aus mehreren zentralen Tabellen mit klar abgegrenzten Aufgaben.

### users
Die Tabelle `users` speichert alle Nutzer des Systems.

Sie enthält unter anderem:
- eine eindeutige Nutzer-ID
- ein persistentes Token zur Wiedererkennung
- einen Anzeigenamen

Ein Nutzer kann mehrere Sessions erstellen oder an Sessions teilnehmen.

### locations
Die Tabelle `locations` repräsentiert reale Sportplätze.

Gespeichert werden:
- Name des Sportplatzes
- geografische Koordinaten
- unterstützte Sportarten

Eine Location kann mehrere Sessions beherbergen.

### sessions
Die Tabelle `sessions` bildet einzelne Spielrunden ab.

Gespeichert werden unter anderem:
- Datum und Uhrzeit der Session
- maximale Spieleranzahl
- aktuelle Teilnehmerzahl
- Referenz auf die zugehörige Location
- Referenz auf den Ersteller der Session

Sessions stellen die zentrale fachliche Entität des Systems dar.

### session_requests
Die Tabelle `session_requests` verwaltet Beitrittsanfragen zu Sessions.

Sie ermöglicht:
- kontrollierte Teilnahme an Sessions
- Vermeidung unautorisierter Beitritte
- nachvollziehbare Entscheidungsprozesse

Ein Eintrag existiert nur solange, bis eine Anfrage akzeptiert oder abgelehnt wird.

## 🔗 Beziehungen
Die Tabellen stehen in klar definierten Beziehungen zueinander.

Zentrale Zusammenhänge:
- ein Nutzer kann mehrere Sessions erstellen oder ihnen beitreten
- eine Session gehört genau zu einer Location
- eine Session kann mehrere Beitrittsanfragen besitzen
- jede Beitrittsanfrage ist genau einem Nutzer und einer Session zugeordnet

Diese Beziehungen werden über Fremdschlüssel modelliert und serverseitig abgesichert.

<figure>
  <img
    src="/database-er-diagram.png"
    alt="ER-Diagramm des MatchUp-Datenbankschemas mit Nutzern, Locations, Sessions und Beitrittsanfragen"
    class="thumbnail-300"
  />
  <figcaption>
    ER-Diagramm des MatchUp-Datenbankschemas mit zentralen Tabellen und ihren Beziehungen
  </figcaption>
</figure>

## 🔄 Datenflüsse
Neben der statischen Struktur ist der **Datenfluss** zwischen Backend und Datenbank entscheidend.

Ein typischer Ablauf ist die Erstellung einer Session:
- der Client sendet eine Anfrage an das Backend
- das Backend validiert die Eingaben
- die Session wird in der Datenbank persistiert
- die erstellte Session wird an den Client zurückgegeben

<figure>
  <img
    src="/database-session-creation-flow.png"
    alt="Datenfluss bei der Erstellung einer Session vom Client über das Backend zur Datenbank"
    class="thumbnail-300"
  />
  <figcaption>
    Datenfluss bei der Session-Erstellung vom Client über das Backend bis zur Persistenz
  </figcaption>
</figure>

## ♻️ Lebenszyklus von Daten
Datenobjekte im System besitzen einen klar definierten Lebenszyklus.

Am Beispiel einer Session:
- Erstellung durch einen Nutzer (`Created`)
- aktive Nutzung durch Teilnehmer (`Active`)
- Abschluss nach Ablauf des Zeitpunkts (`Completed`)
- keine weitere fachliche Veränderung nach Abschluss (`Archived`)

Temporäre Daten wie Beitrittsanfragen werden nach Verarbeitung entfernt oder archiviert.

<figure>
  <img
    src="/database-session-lifecycle.png"
    alt="Lebenszyklus einer Session von der Erstellung bis zum Abschluss"
    class="thumbnail-300"
  />
  <figcaption>
    Lebenszyklus einer Session von der Erstellung bis zum Abschluss
  </figcaption>
</figure>