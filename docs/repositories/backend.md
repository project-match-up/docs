# Repository – Backend

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt den **konkreten technischen Aufbau**, die **Code-Struktur** und die **zentralen Implementierungsstellen** des Backend-Repositories.

Es dient als **präzise Arbeitsgrundlage für die Weiterentwicklung** und ergänzt:
- *Systemarchitektur – Backend*
- *Daten – Datenbankschema*
- *Daten – Datenflüsse*

Alle hier beschriebenen Aspekte beziehen sich auf die **konkrete Umsetzung im Code**.  
Architektur- und Konzeptentscheidungen werden **nicht erneut erklärt**, sondern referenziert.

## 🗂️ Ordnerstruktur
Das Backend basiert auf **Laravel** und nutzt die frameworkkonforme Standardstruktur, erweitert um projektbezogene Infrastruktur.

Zentrale Verzeichnisse:

- `app/`  
  Enthält die gesamte serverseitige Anwendungslogik
- `routes/`  
  Definition aller API-Endpunkte
- `database/`  
  Migrationen und Datenbankinitialisierung
- `docker/`  
  NGINX- und Container-Konfiguration
- `.github/`  
  CI/CD-Workflows für automatisches Deployment

<figure>
  <img
    src="/backend-project-structure.png"
    alt="Ordnerstruktur des Backend-Repositories mit app, routes, database, docker und CI/CD-Konfiguration"
    class="thumbnail-300"
  />
  <figcaption>
    Ordnerstruktur des Backend-Repositories mit Trennung nach Logik, Routing, Persistenz und Infrastruktur
  </figcaption>
</figure>

## 🧠 Zentrale Logikstellen
Die Geschäftslogik ist bewusst **nicht verteilt**, sondern klar strukturiert.

### Controller
Controller befinden sich unter `app/Http/Controllers/`.

Konkrete Verantwortlichkeiten:
- Entgegennahme und Parsing von HTTP-Requests
- Validierung von Request-Daten
- Aufruf fachlicher Operationen
- Rückgabe standardisierter JSON-Responses

Controller:
- enthalten **keine Persistenzdetails**
- enthalten **keine UI-Logik**
- koordinieren ausschließlich den Ablauf

Die fachliche Bedeutung der Endpunkte ist im Kapitel *Systemarchitektur – Backend* beschrieben.

### Models
Models befinden sich unter `app/Models/` und basieren auf **Eloquent ORM**.

Aufgaben der Models:
- Abbildung der Tabellenstruktur
- Definition von Beziehungen
- Zugriff auf persistierte Daten

Typische Entitäten:
- Nutzer
- Locations
- Sessions
- Beitrittsanfragen

Models enthalten **keine komplexen Geschäftsregeln**.  
Regeln wie Kapazitätsprüfungen oder Statuswechsel werden **außerhalb der Models** umgesetzt  
(siehe *Daten – Datenflüsse*).

### Zusammenspiel Controller ↔ Model
Controller:
- orchestrieren den Ablauf
- nutzen Models für Datenzugriffe
- entscheiden über Erfolg oder Fehler einer Anfrage

Dieses Muster wird **konsistent für alle Endpunkte** angewendet.

<figure>
  <img
    src="/backend-controller-model-flow.png"
    alt="Ablaufdiagramm einer Anfrage vom Routing über Controller und Models zur Datenbank"
    class="thumbnail-300"
  />
  <figcaption>
    Ablauf einer Backend-Anfrage vom Routing über Controller und Models bis zur Datenbank
  </figcaption>
</figure>

## 🔌 Routing & API-Definition
Alle API-Endpunkte sind zentral unter `routes/` definiert.

Eigenschaften:
- REST-konforme Struktur
- klare Ressourcenzuordnung
- zustandslose Requests
- Token-basierte Identifikation

Das Routing:
- ordnet HTTP-Methoden konkreten Controllern zu
- enthält **keine fachliche Logik**
- dient ausschließlich der Request-Zuordnung

Eine vollständige Übersicht der Endpunkte ist Bestandteil der API-Dokumentation  
(siehe *Systemarchitektur – Backend*).

## 🗄️ Datenbankanbindung
Die Datenbankanbindung erfolgt vollständig über Laravel und Eloquent.

### Migrationen
Migrationen liegen unter `database/migrations/`.

Aufgaben:
- Definition der Tabellenstruktur
- Versionierung von Schemaänderungen
- reproduzierbarer Datenbankaufbau

Migrationen:
- werden beim Deployment ausgeführt
- sind deterministisch
- bilden die alleinige Quelle für das Schema

Details zu Tabellen und Beziehungen siehe *Daten – Datenbankschema*.

### Datenzugriff
Der Zugriff auf persistente Daten erfolgt:
- ausschließlich über Models
- ausschließlich im Backend

Es existiert:
- kein direkter Datenbankzugriff von Clients
- keine Geschäftslogik in SQL oder Triggern

## 🚀 Wartbarkeit & Erweiterung
Neue Funktionalität wird nach einem festen Muster ergänzt.

Vorgehen bei neuen Endpunkten:
1. Definition des Endpunkts in `routes/`
2. Implementierung eines Controllers oder einer Controller-Methode
3. Nutzung bestehender oder neuer Models
4. Ergänzung von Migrationen bei Schemaänderungen

Leitlinien:
- Routing bleibt logisch und schlank
- Controller orchestrieren, entscheiden aber nicht fachlich isoliert
- Models repräsentieren Daten, nicht Prozesse
- Änderungen sind lokal und nachvollziehbar

Diese Struktur ermöglicht:
- gezielte Erweiterungen
- geringe Seiteneffekte
- sauberes Refactoring