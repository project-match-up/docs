# Systemarchitektur – Frontend

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt den **strukturellen Aufbau**, die **Aufgabenverteilung** und die **architektonischen Grundprinzipien** des Frontends von **MatchUp**.

Der Fokus liegt auf:
- der Einordnung des Frontends im Gesamtsystem
- den zentralen funktionalen Bestandteilen
- den grundlegenden technischen Entscheidungen auf Architekturebene

## 🧩 Rolle des Frontends im System
Das Frontend bildet die **interaktive Präsentationsschicht** von MatchUp.  
Es ist verantwortlich für die Darstellung aller relevanten Informationen und für die Erfassung sämtlicher Nutzerinteraktionen.

Zu den zentralen Aufgaben gehören:
- **Visualisierung** von Sportplätzen, Sessions und Detailinformationen
- **Interaktion** durch Suchen, Filtern, Beitreten und Erstellen von Sessions
- **Kommunikation** mit dem Backend über klar definierte API-Endpunkte
- **Identifikation von Nutzern** ohne klassisches Authentifizierungssystem

Das Frontend enthält dabei **keine Geschäftslogik**.  
Entscheidungen über Berechtigungen, Validierungen und Datenkonsistenz liegen vollständig im Backend.

## 🛠️ Technologieentscheidung (Flutter)
Das Frontend basiert auf **Flutter** und folgt einem **plattformübergreifenden Ansatz**.

Mit einer gemeinsamen Codebasis werden folgende Zielplattformen unterstützt:
- Mobile Endgeräte
- Web-Browser

Die Entscheidung für Flutter basiert auf:
- konsistenter UI über alle Plattformen hinweg
- klarer Struktur durch komponentenbasierte UI-Bausteine
- guter Unterstützung für Karten, Animationen und Touch-Interaktion

Architektonisch trennt das Frontend strikt zwischen:
- **Darstellung** in Form von Screens und UI-Komponenten
- **Datenrepräsentation** über klar definierte Modelle
- **Backend-Zugriff** über dedizierte Service-Schichten

## 🧱 Zentrale UI-Bausteine
Das Frontend ist in mehrere **funktionale Ansichten** gegliedert, die jeweils einen klar abgegrenzten Verantwortungsbereich haben.

### Kartenansicht
Die Kartenansicht ist der **zentrale Einstiegspunkt** der Anwendung.

Sie dient der:
- räumlichen Darstellung aller verfügbaren Sportplätze
- Filterung nach Sportarten
- Navigation zu Detailinformationen einzelner Plätze

Interaktionen in der Kartenansicht führen direkt zur Anzeige weiterführender Informationen.

<figure>
  <img
    src="/start-view.png"
    alt="Ansicht der Startseite mit einigen Sportplätzen, Filtern und der Navigation"
    class="thumbnail-300"
  />
  <figcaption>
    Ansicht der Startseite mit einigen Sportplätzen, Filtern und der Navigation
  </figcaption>
</figure>

### Platz-Detailansicht
Die Platz-Detailansicht stellt alle Informationen zu einem einzelnen Sportplatz dar.

Sie umfasst:
- grundlegende Platzinformationen
- eine Übersicht aller zugehörigen Sessions
- Aktionen zur Teilnahme oder Erstellung von Sessions

Die Ansicht ist als überlagernde Detailansicht konzipiert und kann erweitert dargestellt werden.

<figure>
  <img
    src="/detail-view-fullscreen.png"
    alt="Detailansicht eines Sportplatzes mit Session-Übersicht und Interaktionsmöglichkeiten"
    class="thumbnail-300"
  />
  <figcaption>
    Detailansicht eines Sportplatzes mit Session-Übersicht und Interaktionsmöglichkeiten
  </figcaption>
</figure>

### Session-Erstellung
Die Session-Erstellung ist eine eigenständige Ansicht zur Erstellung neuer Spielrunden.

Hier werden erfasst:
- Zeitpunkt der Session
- benötigte Spieleranzahl
- optionale Beschreibung

Eingaben werden vor dem Absenden geprüft und anschließend an das Backend übermittelt.

<figure>
  <img
    src="/create-session.png"
    alt="Formularbasierte Ansicht zur Erstellung einer neuen Session mit Zeit-, Datums- und Texteingaben"
    class="thumbnail-300"
  />
  <figcaption>
    Formularbasierte Ansicht zur Erstellung einer neuen Session mit Zeit-, Datums- und Texteingaben
  </figcaption>
</figure>

## 🔄 Zustands- & Datenmanagement
Das Frontend verwendet ein **überschaubares Zustandsmodell**, das sich auf lokale Zustände pro Ansicht beschränkt.

Grundprinzipien sind:
- Daten werden **on demand** vom Backend geladen
- Zustände sind an konkrete Screens gebunden
- Änderungen führen zu gezielten Neuladungen betroffener Daten

Ein globales State-Management wird bewusst vermieden, um die Komplexität gering zu halten.

## 🆔 Identifikation ohne Login
MatchUp verzichtet auf ein klassisches Benutzerkonto mit Passwort.

Stattdessen basiert die Identifikation auf:
- einer **anonymen Nutzererstellung**
- einem **lokal gespeicherten Token**
- automatischer Wiederverwendung dieses Tokens bei API-Anfragen

Der Nutzer wird ausschließlich über einen frei wählbaren Anzeigenamen identifiziert.

> 📌 **Hinweis:**  
> Das Frontend ist bewusst schlank konzipiert.  
> Validierung, Autorisierung und Geschäftslogik sind vollständig im Backend angesiedelt.
