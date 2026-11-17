# AKTE 24 – Wo ist der Chef?

Eine statische, mobilfreundliche Adventskalender-Website. Sie benötigt weder Datenbank noch Server und kann kostenlos mit GitHub Pages veröffentlicht werden.

## Dateien

- `index.html` – Seitenstruktur
- `styles.css` – Gestaltung und mobile Darstellung
- `content.js` – Texte, Rätselantworten, Buchstaben und finale Auflösung
- `app.js` – Türchen-Freischaltung, Rätselprüfung und Finale

## Lokal testen

Die Dateien können direkt im Browser geöffnet werden. Für die Vorschau aller Türchen hänge `?preview=1` an die Adresse, z. B. `index.html?preview=1`.

Das erste Türchen enthält ein Demo-Rätsel (Lösung: `vermisst`). Die übrigen Türchen sind Platzhalter und müssen nach Fertigstellung der Geschichte in `content.js` ersetzt werden.

## Inhalte eintragen

In `content.js` gibt es 24 Einträge. Jeder Eintrag hat:

- `day`: Tag 1 bis 24
- `title`: Überschrift
- `story`: Kapiteltext
- `puzzle`: Rätseltext
- `answer`: korrekte Rätsellösung
- `letter`: der Buchstabe, den die Person erhält

Außerdem müssen `finalCode` (genau 24 Buchstaben, ohne Leerzeichen) und `finalTitle` / `finalText` auf die endgültige Auflösung angepasst werden.

Die Antworten werden im Browser geprüft. Die Türchen zeigen den Buchstaben nach richtiger Eingabe an. Der Bearbeitungsstand wird lokal im Browser gespeichert (`localStorage`); er wird nicht zwischen verschiedenen Geräten synchronisiert.

## Kostenlos mit GitHub Pages veröffentlichen

1. Bei GitHub anmelden und ein neues Repository erstellen, z. B. `akte-24`.
2. Die vier Dateien (`index.html`, `styles.css`, `content.js`, `app.js`) und diese README in das Repository hochladen. Am einfachsten: Repository öffnen → **Add file** → **Upload files**.
3. Im Repository **Settings** → **Pages** öffnen.
4. Unter **Build and deployment** bei **Source** `Deploy from a branch` wählen.
5. Als Branch `main` und Ordner `/ (root)` auswählen, dann **Save**.
6. Nach dem Deployment zeigt GitHub Pages die öffentliche Adresse an, normalerweise `https://DEIN-NUTZERNAME.github.io/akte-24/`.

## Wichtige Hinweise

- Es gibt keinen Passwortschutz – wie gewünscht.
- Die Freischaltung nach Kalendertag läuft im Browser der Besuchenden. Sie ist eine Komfortfunktion, keine Sicherheitsbarriere.
- Alle Inhalte und auch die Rätselantworten in `content.js` sind im veröffentlichten Quellcode einsehbar. Wer technisch nachschaut, kann zukünftige Inhalte vorzeitig lesen und Antworten finden.
- Der Fortschritt wird nur auf dem jeweiligen Gerät und im jeweiligen Browser gespeichert. Bei anderem Gerät oder gelöschten Browserdaten ist er nicht vorhanden.
- Die Seite verwendet Google Fonts. Ohne Internetverbindung werden Ersatzschriften genutzt.

## Gebäudefoto als Hintergrund

Die aktuelle Version zeigt ein stilisiertes Gebäude mit 24 anklickbaren Türchen. Sobald das gewünschte Gebäudefoto bereitliegt, kann das Layout so angepasst werden, dass die Türchen als klickbare Bereiche über dem Foto liegen. Dafür brauchen wir das Foto und die ungefähren Positionen der 24 Fenster/Türen.
