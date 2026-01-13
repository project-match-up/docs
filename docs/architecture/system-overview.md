# Systemarchitektur – Überblick

## 🎯 Ziel dieses Kapitels
Dieses Kapitel gibt einen **zusammenfassenden Überblick** über die technische Gesamtarchitektur von MatchUp.  
Es beschreibt die zentralen Komponenten des Systems, deren Verantwortlichkeiten sowie das Zusammenspiel zwischen Clients, Backend und externen Diensten.

Der Fokus liegt auf:
- den grundlegenden Architekturprinzipien
- den Hauptkomponenten des Systems
- der Kommunikation zwischen diesen Komponenten
- der Einbindung externer Abhängigkeiten

## 🧱 Architekturprinzipien
Die Architektur von MatchUp folgt klaren, bewusst gewählten Grundprinzipien.

Zentrale Leitlinien sind:
- **Trennung von Verantwortlichkeiten** zwischen Client, Server und Infrastruktur
- **Zentralisierung der Geschäftslogik** im Backend
- **Zustandslose Kommunikation** über klar definierte Schnittstellen
- **Erweiterbarkeit** durch zusätzliche Clients ohne Anpassung der Kernlogik

Alle Clients agieren als Konsumenten einer gemeinsamen API und enthalten keine fachlichen Entscheidungslogiken.

## 🧩 Hauptkomponenten
Das System besteht aus mehreren klar abgegrenzten Hauptkomponenten.

### Frontend
Das Frontend stellt die **grafische Benutzeroberfläche** für Web- und Mobile-Nutzer bereit.

Es ist verantwortlich für:
- Darstellung von Sportplätzen und Sessions
- Nutzerinteraktion
- Weiterleitung aller Aktionen an das Backend

Die Umsetzung erfolgt als Flutter-Anwendung mit einer gemeinsamen Codebasis für alle Plattformen.

### Backend
Das Backend bildet das **fachliche und technische Zentrum** des Systems.

Es übernimmt:
- Validierung und Durchsetzung aller Geschäftsregeln
- Persistenz der Daten
- Bereitstellung einer REST-API für alle Clients

Das Backend fungiert als **Single Source of Truth** für das gesamte System.

### Datenbank
Die Datenbank dient der **dauerhaften Speicherung** aller systemrelevanten Informationen.

Gespeichert werden unter anderem:
- Nutzer
- Sportplätze
- Sessions
- Beziehungen zwischen Nutzern und Sessions

Direkter Zugriff auf die Datenbank ist ausschließlich dem Backend vorbehalten.

### Bot-Anbindung
Die Bot-Anbindung stellt eine **alternative, chatbasierte Benutzeroberfläche** dar.

Der Bot:
- agiert als Client
- nutzt dieselbe REST-API wie das Frontend
- enthält keine eigene Geschäftslogik

Er ergänzt die klassischen Clients um eine niedrigschwellige Interaktionsform.

## 🔌 Kommunikation
Die Kommunikation zwischen allen Komponenten erfolgt über eine **REST-basierte API**.

Eigenschaften der Kommunikation:
- zustandslose Requests
- einheitliche Endpunkte für alle Clients
- JSON-basierte Datenformate
- serverseitige Validierung jeder Anfrage

Frontend und Bot sind technisch gleichwertige API-Konsumenten.

<figure>
  <img
    src="/system-architecture-overview.png"
    alt="Architekturübersicht mit Frontend und Bot als Clients, angebunden an ein zentrales Backend mit Datenbank"
    class="thumbnail-300"
  />
  <figcaption>
    Architekturübersicht von MatchUp mit Frontend und Bot als Clients, angebunden an ein zentrales Backend mit Datenbank
  </figcaption>
</figure>

## 🌐 Externe Abhängigkeiten
MatchUp integriert mehrere externe Dienste, die klar vom Kernsystem abgegrenzt sind.

Dazu zählen:
- **Karten- und Geodaten** zur Darstellung von Sportplätzen
- **Hosting- und Infrastrukturkomponenten** für Betrieb und Deployment
- **Telegram API** zur Anbindung des Bots

Externe Dienste liefern ausschließlich Daten oder Transportmechanismen und enthalten keine Geschäftslogik des Systems.
