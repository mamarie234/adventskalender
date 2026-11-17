/*
  INHALTE FÜR AKTE 24
  -------------------
  Hier werden später die 24 fertigen Kapitel und Rätsel eingetragen.
  answer: erwartete Rätsellösung (Groß-/Kleinschreibung und Leerzeichen egal)
  letter: der Buchstabe, den die Person nach richtiger Lösung erhält

  WICHTIG: Alles in einer GitHub-Pages-Seite ist öffentlich einsehbar.
  Die Antworten und späteren Inhalte sind daher kein Geheimnis vor technisch
  versierten Besuchenden. Die tägliche Freischaltung ist eine Komfortfunktion.
*/
const CASE_CONTENT = {
  // Ersetzt diese 24 Platzhalter, sobald die Rätsel fertig sind.
  doors: Array.from({ length: 24 }, (_, index) => ({
    day: index + 1,
    title: index === 0 ? 'Der leere Schreibtisch' : `Hinweis ${String(index + 1).padStart(2, '0')}`,
    story: index === 0
      ? 'Am Morgen des 1. Dezember ist der Chef nicht im Büro erschienen. Sein Schreibtisch ist verlassen, persönliche Gegenstände sind jedoch noch da. Niemand kann mit Sicherheit sagen, wann er zuletzt gesehen wurde. Du wirst als unabhängige Ermittlungsperson hinzugezogen. Deine erste Aufgabe: Sichere die Spuren am Arbeitsplatz.'
      : 'Dieses Kapitel ist noch in Arbeit. Hier wird später der nächste Teil der Fallgeschichte stehen.',
    puzzle: index === 0
      ? 'DEMO-RÄTSEL: Welches Wort beschreibt eine Person, die nicht auffindbar ist? (Kleinschreibung ist egal.)'
      : 'Das Rätsel für diesen Tag wird hier ergänzt.',
    answer: index === 0 ? 'vermisst' : `loesung${index + 1}`,
    letter: String.fromCharCode(65 + (index % 26))
  })),

  // Nach Entwicklung der 24 Rätsel durch die tatsächliche 24-Buchstaben-Lösung ersetzen.
  // Nur Buchstaben eintragen, keine Leerzeichen oder Satzzeichen.
  finalCode: 'ABCDEFGHIJKLMNOPQRSTUVWX',

  finalTitle: 'Der Fall ist gelöst.',
  finalText: 'Hier erscheint später die vollständige Auflösung: Wer den Chef entführt hat, warum die Kaffeerunde handelte, wer die Fake-Mails verschickt hat und was der eigene Plan des Chefs war.'
};
