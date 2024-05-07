export interface BingoExampleData {
  teachers: Teacher[];
}

export interface Teacher {
  id: string;
  shortName: string;
  name: string;
  quotes: Quote[];
}

export interface Quote {
  id: string;
  template: string;
}

export interface Request {
    teacherId: string;
    userId: string;
    quote: string;
}

export const bingoExampleData: BingoExampleData = {
  teachers: [
    {
      "id": "0000-wi",
      "shortName": "WI",
      "name": "Manfred Wilfling",
      "quotes": [
        {
          "id": "wi-001",
          "template": "Ich wünschte ich wäre tot!"
        },
        {
          "id": "wi-002",
          "template": "Wenn das so weitergeht, verlege ich den Unterricht ins Bierzelt!"
        },
        {
          "id": "wi-003",
          "template": "Wer von euch wird heute für den Lacher des Tages sorgen?"
        },
        {
          "id": "wi-004",
          "template": "SQL ist wie Schach; es braucht Jahre, um es zu lernen, aber ein Leben, um es zu meistern."
        },
        {
          "id": "wi-005",
          "template": "Jeder Fehler ist eine Lektion, es sei denn, ihr macht ihn zweimal."
        },
        {
          "id": "wi-006",
          "template": "Ohne Kaffee passiert hier gar nichts!"
        },
        {
          "id": "wi-007",
          "template": "Ihr denkt, das ist nur eine Datenbank? Es ist das Universum in Tabellenform!"
        },
        {
          "id": "wi-008",
          "template": "Bei dieser Abfrage löscht sich das Internet selbst, also seid vorsichtig!"
        },
        {
          "id": "wi-009",
          "template": "Schlechte SQL-Abfragen sind wie schlechter Kaffee: Sie lassen einen bitteren Geschmack zurück."
        },
        {
          "id": "wi-010",
          "template": "Nichts ist so permanent wie eine temporäre Lösung."
        },
        {
          "id": "wi-011",
          "template": "Vergesst nie: Ein Backup am Tag hält den Datenverlust fern."
        },
        {
          "id": "wi-012",
          "template": "Daten sind wie Kleidung; ohne richtige Pflege sehen sie nicht gut aus."
        },
        {
          "id": "wi-013",
          "template": "Die besten Datenbankmanager denken wie Diebe – immer auf der Suche nach einer Lücke."
        },
        {
          "id": "wi-014",
          "template": "Wenn es nicht dokumentiert ist, existiert es nicht."
        },
        {
          "id": "wi-015",
          "template": "Coding ohne Kaffee ist wie Kochen ohne Gewürze."
        }
      ]
    },
    {
      id: "0001-vk",
      shortName: "VK",
      name: "Dietmar Völk",
      quotes: [
        {
          id: "vk-001",
          template: "Lernt leise, ich habe einen Kater!",
        },
        {
          id: "vk-002",
          template: "Die einzige Konstante ist eure Faulheit.",
        },
        {
          id: "vk-003",
          template: "Das war nicht nur falsch, das war auch noch schlecht erklärt.",
        },
      ],
    },
    {
      id: "0002-kp",
      shortName: "KP",
      name: "Thomas Knapp",
      quotes: [
        {
          id: "kp-001",
          template: "Vergesst nicht, Wikipedia ist der beste Freund eines Lehrers.",
        },
        {
          id: "kp-002",
          template: "Am Ende des Semesters werde ich euch mit meinen Witzen allein lassen.",
        },
        {
          id: "kp-003",
          template: "Wer heute keinen Spaß versteht, kriegt Extraaufgaben!",
        },
      ],
    },
    {
      id: "0003-gu",
      shortName: "GU",
      name: "Gerhard Gugerbauer",
      quotes: [
        {
          id: "gu-001",
          template: "Wenn das die Lösung ist, möchte ich mein Problem zurück.",
        },
        {
          id: "gu-002",
          template: "Könnt ihr bitte aufhören zu lernen? Ihr macht die Kurve kaputt.",
        },
        {
          id: "gu-003",
          template: "Das Einzige, was hier flach ist, ist euer Lernfortschritt.",
        },
      ],
    },
    {
      id: "0004-ln",
      shortName: "LN",
      name: "Andreas Lindner",
      quotes: [
        {
          id: "ln-001",
          template: "Heute ist nicht alle Tage, ich komm wieder, keine Frage.",
        },
        {
          id: "ln-002",
          template: "Das war so schlecht, das hat schon wieder Stil.",
        },
        {
          id: "ln-003",
          template: "Sind wir nicht hier, um Spaß zu haben?",
        },
      ],
    },
  ],
};
