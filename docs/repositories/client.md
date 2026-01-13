# Repository – Client

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt den **konkreten technischen Aufbau** und die **Code-Struktur** des Client-Repositories.  
Es dient als **arbeitsnahe Referenz** für die Weiterentwicklung und ergänzt die architektonischen Konzepte aus:
- *Systemarchitektur – Frontend*
- *Daten – Datenbankschema*
- *Daten – Datenflüsse*

Es werden **keine Konzepte erneut erklärt**, sondern deren **Umsetzung im Code** dokumentiert.

## 🗂️ Projektstruktur
Das Repository ist ein Flutter-Projekt mit klarer Trennung nach Verantwortlichkeiten.

Zentrale Struktur unter `lib/`:
- Einstiegspunkt und App-Initialisierung
- Screen-basierte User Flows
- Wiederverwendbare Widgets
- Service-Schicht für Backend-Zugriffe
- Datenmodelle
- Infrastruktur für Persistenz und Konfiguration

Die Struktur ist darauf ausgelegt, neue Features **ohne Querschnittsänderungen** ergänzen zu können.

<figure>
  <img
    src="/client-project-structure.png"
    alt="Ordnerstruktur des Flutter-Clients mit Trennung nach Screens, Services, Models und Widgets"
    class="thumbnail-300"
  />
  <figcaption>
    Ordnerstruktur des Client-Repositories mit klarer Trennung nach Verantwortlichkeiten
  </figcaption>
</figure>

## 🚀 Einstiegspunkt & Initialisierung
### `main.dart`
Verantwortlichkeiten:
- App-Entry-Point
- Initialisierung des Nutzerkontexts
- Start der Hauptnavigation

Beim Start werden folgende Schritte ausgeführt:
- Laden eines bestehenden Nutzers über den `UserService`
- Prüfung auf vorhandenes Token im lokalen Speicher
- Initialisierung der Root-View

Details zur Nutzeridentifikation siehe *Systemarchitektur – Frontend*.

## 🧭 Navigation & App-Shell
### `home_page.dart`
Die Hauptseite kapselt:
- `BottomNavigationBar`
- Koordination der Haupt-Screens
- programmgesteuerte Navigation zu Locations

Tabs:
- Kartenansicht
- Nearby-Ansicht
- Favoriten

Technische Besonderheit:
- Cross-Tab-Navigation über `GlobalKey<MapScreenState>`
- gezielte Steuerung der Kartenansicht von anderen Screens aus

Es existiert **keine globale Routing-Logik** jenseits dieser Shell.

## 🧱 Screens
Die fachliche Logik ist primär in Screens organisiert.

### Kartenansicht (`MapScreen`)
Verantwortlichkeiten:
- Laden aller Locations über den `LocationService`
- Darstellung auf einer interaktiven Karte
- Clientseitige Filterung nach Sportarten
- Öffnen der Platz-Detailansicht

Zentrale Methoden:
- `_loadLocations()`  
  Lädt Locations vom Backend
- `_getUserLocation()`  
  Zentriert die Karte auf die aktuelle Position
- `_getFilteredLocations()`  
  Wendet Filterlogik auf geladene Locations an
- `showLocationById(int id)`  
  Ermöglicht externe Navigation zur Karte

Die Kartenansicht ist der **primäre Einstiegspunkt** für weitere User Flows  
(siehe *Systemarchitektur – Frontend*).

### Platz-Detailansicht (`LocationPanel` / `LocationContent`)
Die Detailansicht ist als **Bottom-Sheet** implementiert.

Verantwortlichkeiten:
- Laden der vollständigen Location-Daten
- Anzeige aller Sessions einer Location
- Join / Leave von Sessions
- Favorisieren von Locations
- Navigation zur Session-Erstellung

Datenfluss:
- Initiale Location-Daten kommen aus der Kartenansicht
- Sessions werden **on demand** nachgeladen

Die Logik zur Session-Verwaltung ist an das Backend delegiert  
(siehe *Daten – Datenflüsse*).

### Session-Erstellung (`NewSessionScreen`)
Eigenständiger Screen zur Erstellung neuer Sessions.

Verantwortlichkeiten:
- Erfassen der Session-Daten
- clientseitige Vorvalidierung
- Übergabe an den `LocationService`

Validierungslogik:
- Pflichtfelder
- Datum/Uhrzeit in der Zukunft
- sinnvolle Spieleranzahl

Backend-seitige Validierung ist maßgeblich  
(siehe *Systemarchitektur – Backend*).

### Nearby & Favoriten
Diese Screens:
- verwenden bestehende Services
- enthalten keine eigene Geschäftslogik
- dienen ausschließlich der alternativen Navigation

Die finale Darstellung erfolgt immer über die Kartenansicht.

## 🧩 Widgets
Wiederverwendbare UI-Komponenten sind als eigenständige Widgets umgesetzt.

Typische Widgets:
- `SessionCard`
- Karten-Marker
- Buttons mit konsistentem Verhalten
- Lade- und Fehlerzustände

Regeln:
- keine API-Aufrufe in Widgets
- keine Geschäftslogik
- minimaler lokaler State

Widgets sind ausschließlich Darstellungsbausteine.

## 🔌 API-Anbindung
Die gesamte Backend-Kommunikation ist in der Service-Schicht gekapselt.

### `ApiService`
Zentrale HTTP-Schicht.

Verantwortlichkeiten:
- Aufbau und Ausführung von Requests
- Token-Injektion in Header
- Retry-Mechanismus
- einheitliche Fehlerbehandlung

Design:
- statisch
- zustandslos
- wird von allen fachlichen Services genutzt

### Fachliche Services
Beispiele:
- `LocationService`
- `UserService`
- `StorageService`

Eigenschaften:
- Abbildung konkreter Backend-Endpunkte
- kein UI-Bezug
- klare fachliche Zuständigkeit

Zuordnung der Endpunkte siehe *Systemarchitektur – Backend*.

<figure>
  <img
    src="/client-api-layer.png"
    alt="Schichtenmodell des Clients mit Trennung zwischen UI, Services und Backend-API"
    class="thumbnail-300"
  />
  <figcaption>
    Technisches Schichtenmodell des Clients
  </figcaption>
</figure>

## 🗃️ Persistenz & Storage
Persistente Daten werden lokal gespeichert:
- Token
- Nutzer-ID
- Anzeigename

Die Verwaltung erfolgt über den `StorageService`.  
Details zur Identifikation siehe *Systemarchitektur – Frontend*.

## 🧠 Zustandsmanagement
Der Client verwendet **ausschließlich lokalen State**.

Prinzipien:
- State ist an Screens gebunden
- kein globales State-Management
- Neuladung nach relevanten Aktionen

Das Backend gilt als **Single Source of Truth**  
(siehe *Daten – Datenflüsse*).

## 🧩 Erweiterbarkeit
Neue Features werden ergänzt durch:
- neue Screens für neue User Flows
- Erweiterung bestehender Services
- zusätzliche Widgets

Technische Leitlinien:
- keine Geschäftslogik im UI
- keine direkten API-Aufrufe außerhalb der Services
- Wiederverwendung bestehender Modelle
- Navigation explizit und nachvollziehbar