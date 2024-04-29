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

export const bingoExampleData: BingoExampleData = {
  teachers: [
    {
      id: "0000-wi",
      shortName: "WI",
      name: "Manfred Wilfling",
      quotes: [
        {
          id: "wi-001",
          template: "Ich wünschte ich wäre tot!",
        },
        {
          id: "wi-002",
          template: "Wenn das so weitergeht, verlege ich den Unterricht ins Bierzelt!",
        },
        {
          id: "wi-003",
          template: "Wer von euch wird heute für den Lacher des Tages sorgen?",
        },
      ],
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
