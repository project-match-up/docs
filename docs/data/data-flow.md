# Daten – Datenflüsse

## 🎯 Ziel dieses Kapitels
Dieses Kapitel beschreibt **konkrete Datenflüsse** innerhalb von MatchUp.  
Anhand typischer Abläufe wird gezeigt, wie Daten zwischen Client, Backend und Datenbank verarbeitet, validiert und aktualisiert werden.

Der Fokus liegt auf:
- zentralen Nutzeraktionen
- der Abfolge von API-Aufrufen
- der Rolle des Backends bei Validierung und Persistenz
- der Auswirkung von Änderungen auf die Darstellung im Client

## ➕ Session erstellen
Die Erstellung einer Session beginnt im Client und endet mit einem persistierten Datensatz in der Datenbank.

Ablauf:
- der Nutzer füllt ein Formular im Client aus
- die Eingaben werden clientseitig vorgeprüft
- das Backend validiert alle Felder serverseitig
- eine neue Session wird gespeichert
- die erstellte Session wird an den Client zurückgegeben

Das Backend entscheidet dabei vollständig über die Gültigkeit der Anfrage.

<figure>
  <img
    src="/data-flow-session-create.png"
    alt="Sequenzdiagramm zur Erstellung einer Session vom Client über das Backend zur Datenbank"
    class="thumbnail-300"
  />
  <figcaption>
    Datenfluss bei der Erstellung einer Session vom Client über das Backend bis zur Persistenz
  </figcaption>
</figure>

## 🤝 Session beitreten
Der Beitritt zu einer Session erfolgt kontrolliert über das Backend.

Ablauf:
- der Nutzer wählt eine Session aus
- eine Beitrittsanfrage wird an das Backend gesendet
- das Backend prüft Kapazität und bisherigen Status
- optional wird eine Beitrittsanfrage angelegt
- nach Annahme wird der Nutzer Teilnehmer der Session

Statusänderungen erfolgen ausschließlich serverseitig.

<figure>
  <img
    src="/data-flow-session-join.png"
    alt="Sequenzdiagramm zum Beitreten einer Session mit Prüfung, Anfrage und Statusänderung"
    class="thumbnail-300"
  />
  <figcaption>
    Datenfluss beim Beitritt zu einer Session inklusive Validierung und Statusänderung
  </figcaption>
</figure>

## 🗺️ Aktualisierung der Karte
Die Kartenansicht spiegelt stets den **aktuellen Zustand** der Sessions wider.

Mechanismus:
- der Client lädt Locations und Sessions beim Öffnen der Karte
- nach relevanten Aktionen wird ein erneuter Abruf ausgelöst
- abgelaufene Sessions werden nicht mehr angezeigt
- neue Sessions erscheinen nach erfolgreicher Persistenz

Die Karte ist somit eine **projektion des Backend-Zustands**, nicht eine eigene Datenquelle.

<figure>
  <img
    src="/data-flow-map-update.png"
    alt="Datenfluss zur Aktualisierung der Kartenansicht nach Änderungen an Sessions"
    class="thumbnail-300"
  />
  <figcaption>
    Aktualisierung der Kartenansicht durch erneuten Datenabruf nach Backend-Änderungen
  </figcaption>
</figure>

## ⚠️ Fehler- & Randfälle
Fehler werden möglichst früh erkannt, final jedoch immer im Backend behandelt.

Typische Fälle:
- ungültige oder unvollständige Eingaben
- Überschreitung der maximalen Teilnehmerzahl
- Beitritt zu abgelaufenen Sessions
- doppelte Beitrittsversuche

Der Ablauf bei Fehlern:
- das Backend lehnt die Anfrage ab
- ein entsprechender Statuscode wird zurückgegeben
- der Client zeigt eine verständliche Rückmeldung an

Fehler führen zu **keiner Änderung** des Datenbestands.
