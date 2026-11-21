# AKTE 24 – Wo ist der Chef? (Version 2)

Die zweite Version ist eine statische, mobilfreundliche Adventskalender-Website für GitHub Pages. Sie verwendet die beiden bereitgestellten Gebäudefotos: das schräge Foto als Titelbild und die Frontalansicht als Kalenderfassade. 24 nummerierte, anklickbare Fenster liegen über der Fassade.

## Dateien

- `index.html` – Seitenstruktur
- `styles.css` – Gestaltung und responsive Darstellung
- `content.js` – 24 Geschichten, Rätsel, Antworten, Buchstaben und Auflösung
- `app.js` – Freischaltung, Rätselprüfung, Fortschritt und Finale
- `assets/gebaeude-titel.jpeg` – Titelbild
- `assets/gebaeude-fassade.webp` – Kalenderansicht

## Lokal testen

Öffne `index.html` im Browser oder veröffentliche die Dateien mit GitHub Pages. Für einen Test aller Türchen hänge `?preview=1` an die Adresse, z. B. `https://DEIN-NUTZERNAME.github.io/akte-24/?preview=1`.

Der Vorschau-Modus öffnet alle Türchen unabhängig vom Datum. Die Rätselantworten und der Fortschritt funktionieren dort genauso wie im normalen Modus.

## Bei GitHub aktualisieren

1. ZIP-Datei entpacken.
2. Öffne dein bestehendes GitHub-Repository.
3. Wähle **Add file → Upload files**.
4. Lade den gesamten Inhalt des Ordners `akte24-v2` hoch – einschließlich des Ordners `assets`.
5. Bestätige mit **Commit changes**. Achte darauf, dass `index.html`, `styles.css`, `content.js` und `app.js` direkt im Repository-Hauptverzeichnis liegen und nicht in einem zusätzlichen Unterordner.
6. GitHub Pages aktualisiert die Website automatisch nach dem Commit.

Du kannst die bestehende Version überschreiben. GitHub bewahrt die vorherigen Änderungen in der Commit-Historie auf.

## Türchen und Fortschritt

- Im normalen Betrieb wird Türchen 1 am 1. Dezember 2026, Türchen 2 am 2. Dezember usw. freigeschaltet.
- Die Freischaltung erfolgt anhand des lokalen Datums im Browser.
- Gelöste Türchen und Buchstaben werden im jeweiligen Browser auf dem jeweiligen Gerät gespeichert (`localStorage`). Es gibt keine Synchronisierung zwischen Geräten.
- Der finale Code lautet im aktuellen Entwurf `KAFFEEBLEIBTERHALTENOKAY` (ohne Leerzeichen).
- Der Fortschritt aus Version 1 wird nicht übernommen, da Version 2 einen eigenen Speicherschlüssel nutzt.

## Wichtige Hinweise

- Es gibt keinen Passwortschutz.
- Die Website ist vollständig statisch; es wird kein Server und keine Datenbank benötigt.
- Inhalte und Rätselantworten sind im veröffentlichten JavaScript-Quellcode einsehbar. Die Tagesfreischaltung ist daher nur eine Komfortfunktion und kein Schutz vor vorzeitigem Lesen.
- Die 24 Fensterpositionen sind Näherungen auf der Fassadenaufnahme. Falls einzelne Nummern auf deinem Bildschirm nicht gut auf den Fenstern liegen, können die Prozentpositionen in `app.js` unter `positions` angepasst werden.
- Die Texte und Rätsel sind ein erster vollständiger Entwurf und können vor dem 1. Dezember noch redaktionell angepasst werden.
