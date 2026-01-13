# Systemarchitektur – Backend

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt die **Architektur**, die **Aufgabenverteilung** und die **zentralen Verantwortlichkeiten** des Backends von MatchUp.

Der Fokus liegt auf:
- der Rolle des Backends im Gesamtsystem
- der strukturellen Organisation der serverseitigen Anwendung
- der Umsetzung der Geschäftslogik
- dem grundlegenden Aufbau der API und der Datenhaltung

## 🧩 Rolle des Backends
Das Backend bildet die **zentrale Steuerungsinstanz** von MatchUp.  
Es ist verantwortlich für sämtliche fachlichen Entscheidungen und stellt eine einheitliche Schnittstelle für alle Clients bereit.

Zu den Kernaufgaben gehören:
- **Validierung** aller eingehenden Anfragen
- **Durchsetzung von Geschäftsregeln**
- **Persistenz** aller relevanten Daten
- **Bereitstellung einer REST-API** für Frontend und weitere Clients

Das Backend fungiert als **Single Source of Truth**.  
Clients übernehmen keine Entscheidungslogik, sondern erhalten ausschließlich serverseitig geprüfte Ergebnisse.

## 🛠️ Framework & Grundstruktur (Laravel)
Das Backend basiert auf **Laravel** und folgt einer klaren, konventionellen Struktur.

Zentrale Bausteine sind:
- **Controller** zur Verarbeitung eingehender API-Anfragen
- **Models** zur Abbildung der fachlichen Entitäten
- **Migrations** zur versionierten Verwaltung des Datenbankschemas

Laravel übernimmt dabei unter anderem:
- Routing und Request-Lifecycle
- Validierung und Fehlerbehandlung
- Serialisierung der API-Antworten

Die Architektur ist darauf ausgelegt, **Geschäftslogik klar zu kapseln** und unabhängig von einzelnen Clients zu halten.

## 🧠 Zentrale Geschäftslogik
Die gesamte Geschäftslogik liegt ausschließlich im Backend.

Wesentliche Verantwortlichkeiten sind:
- **Session-Erstellung**
  - Prüfung von Datum und Uhrzeit
  - Validierung der Spieleranzahl
  - Verknüpfung mit einer Location
- **Session-Beitritt**
  - Verhinderung doppelter Teilnahmen
  - Prüfung der maximalen Kapazität
- **Session-Verwaltung**
  - Pflege der Teilnehmerlisten
  - Verwaltung zukünftiger und laufender Sessions

Alle Regeln werden **einheitlich serverseitig** angewendet, unabhängig davon, welcher Client eine Anfrage stellt.

<figure>
  <img
    src="/backend-session-creation-flow.png"
    alt="Ablauf der Session-Erstellung von der Client-Anfrage über serverseitige Validierung und Geschäftslogik bis zur Persistenz in der Datenbank."
    class="thumbnail-300"
  />
  <figcaption>
    Ablauf der Session-Erstellung von der Client-Anfrage über serverseitige Validierung und Geschäftslogik bis zur Persistenz in der Datenbank.
  </figcaption>
</figure>

## 🔌 API-Design
Das Backend stellt eine **REST-basierte API** zur Verfügung.

Grundprinzipien des API-Designs:
- klare Trennung fachlicher Ressourcen
- zustandslose Requests
- konsistente JSON-Strukturen
- aussagekräftige HTTP-Statuscodes

Jeder Endpunkt repräsentiert einen **klar abgegrenzten Anwendungsfall** und kapselt die zugehörige Logik vollständig im Backend.

<figure>
  <img
    src="/backend-api-request-response-flow.png"
    alt="Typischer Request/Response-Ablauf einer API-Anfrage vom Eingang über Routing und Datenzugriff bis zur JSON-Antwort."
    class="thumbnail-300"
  />
  <figcaption>
    Typischer Request/Response-Ablauf einer API-Anfrage vom Eingang über Routing und Datenzugriff bis zur JSON-Antwort.
  </figcaption>
</figure>

## 🗄️ Datenpersistenz
Die Datenhaltung erfolgt über eine **relationale Datenbank**.

Persistiert werden unter anderem:
- Nutzer
- Sportplätze
- Sessions
- Beziehungen zwischen Nutzern und Sessions

Das Backend ist allein verantwortlich für:
- Datenkonsistenz
- Referenzielle Integrität
- Lebenszyklen der gespeicherten Entitäten

Clients greifen **ausschließlich über die API** auf diese Daten zu.

<figure>
  <img
    src="/backend-data-model-overview.png"
    alt="Vereinfachte Darstellung der zentralen Entitäten des Backends und ihrer Beziehungen zueinander."
    class="thumbnail-300"
  />
  <figcaption>
    Formularbasierte Ansicht zur Erstellung einer neuen Session mit Zeit-, Datums- und Texteingaben
  </figcaption>
</figure>
