# Systemarchitektur – Bot-Anbindung

## Ziel dieses Kapitels
Dieses Kapitel beschreibt die Bot-Anbindung von MatchUp und erklärt, wie Chatbots als alternative Schnittstelle zur Plattform funktionieren.

## Inhaltliche Gliederung
- **Motivation für Bots**  
  Warum zusätzlich zur Web-/App-Oberfläche eine Chat-basierte Nutzung sinnvoll ist.
- **Rolle des Bots im Gesamtsystem**  
  Bot als Client, nicht als eigenständiges System.
- **Kommunikation mit dem Backend**  
  Nutzung derselben REST-API wie das Frontend.
- **Unterstützte Funktionen**  
  Sessions anzeigen, Sessions erstellen, einfache Interaktion.
- **Abgrenzung & Einschränkungen**  
  Keine eigene Geschäftslogik, kein direkter Datenbankzugriff.
- **Erweiterungspotenzial**  
  KI-gestützte Befehle, natürliche Sprache, weitere Plattformen.

> 📊 *Diagramm-Empfehlung:*  
> Sequenzdiagramm: Nutzer → Telegram → Bot → Backend → Bot → Nutzer
