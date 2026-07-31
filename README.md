# Strichliste

Eine Online-Strichliste zum Erfassen von Personen, Getränken und Preisen mit
Echtzeit-Synchronisierung über Firebase. Läuft als reine statische Webseite,
also perfekt für GitHub Pages.

## 1. Firebase-Projekt einrichten

1. Gehe zu [console.firebase.google.com](https://console.firebase.google.com) und klicke auf **Projekt hinzufügen**.
2. Vergib einen Namen (z. B. `strichliste`) und schließe die Einrichtung ab (Google Analytics ist nicht nötig).
3. Klicke im Projekt-Dashboard auf das Web-Symbol (`</>`), um eine neue Web-App zu registrieren. Ein Hosting-Setup ist nicht nötig, da du GitHub Pages nutzt.
4. Firebase zeigt dir jetzt ein `firebaseConfig`-Objekt mit `apiKey`, `authDomain`, `projectId` usw. Kopiere diese Werte.
5. Öffne `index.html` in diesem Ordner, suche den Abschnitt `firebaseConfig` ganz am Anfang des `<script>`-Bereichs und ersetze die Platzhalter (`DEIN_...`) mit deinen echten Werten.

## 2. Firestore aktivieren

1. Klicke im Firebase-Menü links auf **Firestore Database** → **Datenbank erstellen**.
2. Wähle einen Standort (z. B. `eur3 (europe-west)`) und starte zunächst im **Testmodus** (offene Regeln, 30 Tage gültig).
3. Ersetze die Regeln danach zeitnah durch etwas Sichereres, z. B. mit einem gemeinsamen Zugriffscode. Unter **Firestore Database → Regeln** kannst du z. B. Folgendes eintragen:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 31);
    }
  }
}
```

Das lässt jeden mit Zugriff auf den Link mitschreiben (praktisch für eine
gemeinsame Kneipentafel), begrenzt den Zugriff aber zeitlich. Für striktere
Regeln (z. B. mit Passwortschutz per Firebase Authentication) lohnt sich ein
Blick in die [Firestore-Sicherheitsregeln-Doku](https://firebase.google.com/docs/firestore/security/get-started).

## 3. Lokal testen

Öffne `index.html` einfach im Browser (Doppelklick genügt, da keine
Build-Schritte nötig sind). Falls der Browser das Laden lokaler Dateien
blockiert, starte stattdessen einen kleinen lokalen Server:

```
python3 -m http.server 8000
```

und rufe `http://localhost:8000` auf.

## 4. Auf GitHub Pages veröffentlichen

1. Erstelle ein neues GitHub-Repository und lade `index.html` (und optional
   diese `README.md`) hoch.
2. Gehe im Repository zu **Settings → Pages**.
3. Wähle unter **Source** den Branch `main` und den Ordner `/ (root)`.
4. Nach kurzer Zeit ist die Seite unter
   `https://DEIN-BENUTZERNAME.github.io/DEIN-REPO-NAME/` erreichbar.

## Funktionsübersicht

- **Personen hinzufügen/entfernen** über das Formular oben links.
- **Getränke mit Preis hinzufügen/entfernen** über das Formular oben rechts.
- Auf eine Zelle in der Tabelle **klicken/tippen**, um einen Strich für die
  jeweilige Person und das jeweilige Getränk hinzuzufügen. Der kleine
  Minus-Button in der Zelle entfernt einen Strich wieder.
- Jede Zeile zeigt rechts die **offene Summe** der Person, unten steht die
  **Gesamtsumme** aller Personen.
- **„Alles zurücksetzen"** löscht alle Striche (Personen und Getränke bleiben
  erhalten) – praktisch nach dem Bezahlen.
- Alle Änderungen werden live über Firestore an alle geöffneten Geräte
  synchronisiert – ideal, wenn mehrere Leute gleichzeitig mitzählen.

## Datenstruktur in Firestore

- `persons/{id}` → `{ name, createdAt }`
- `drinks/{id}` → `{ name, price, createdAt }`
- `tallies/{personId_drinkId}` → `{ personId, drinkId, count }`
