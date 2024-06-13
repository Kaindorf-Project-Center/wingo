import {ITeacher} from "@/models/ITeacher.ts";
import {IRequest} from "@/models/IRequest.ts";


export interface BingoExampleData {
    teachers: ITeacher[];
    requests: IRequest[];
}

const teachers: ITeacher[] = [
    {
        teacherId: "0000-wi",
        shorthand: "WI",
        name: "Manfred Wilfling",
        quotes: [
            {
                quoteId: "wi-001",
                quote: "Ich wünschte ich wäre tot!"
            },
            {
                quoteId: "wi-002",
                quote: "Wenn das so weitergeht, verlege ich den Unterricht ins Bierzelt!"
            },
            {quoteId: "wi-003", quote: "Wer von euch wird heute für den Lacher des Tages sorgen?"},
            {
                quoteId: "wi-004",
                quote: "SQL ist wie Schach; es braucht Jahre, um es zu lernen, aber ein Leben, um es zu meistern."
            },
            {quoteId: "wi-005", quote: "Jeder Fehler ist eine Lektion, es sei denn, ihr macht ihn zweimal."},
            {quoteId: "wi-006", quote: "Ohne Kaffee passiert hier gar nichts!"},
            {
                quoteId: "wi-007",
                quote: "Ihr denkt, das ist nur eine Datenbank? Es ist das Universum in Tabellenform!"
            },
            {quoteId: "wi-008", quote: "Bei dieser Abfrage löscht sich das Internet selbst, also seid vorsichtig!"},
            {
                quoteId: "wi-009",
                quote: "Schlechte SQL-Abfragen sind wie schlechter Kaffee: Sie lassen einen bitteren Geschmack zurück."
            },
            {quoteId: "wi-010", quote: "Nichts ist so permanent wie eine temporäre Lösung."},
            {quoteId: "wi-011", quote: "Vergesst nie: Ein Backup am Tag hält den Datenverlust fern."},
            {quoteId: "wi-012", quote: "Daten sind wie Kleidung; ohne richtige Pflege sehen sie nicht gut aus."},
            {
                quoteId: "wi-013",
                quote: "Die besten Datenbankmanager denken wie Diebe – immer auf der Suche nach einer Lücke."
            },
            {quoteId: "wi-014", quote: "Wenn es nicht dokumentiert ist, existiert es nicht."},
            {quoteId: "wi-015", quote: "Coding ohne Kaffee ist wie Kochen ohne Gewürze."}
        ]
    }
]
const requests: IRequest[] = [
    {
        requestId: "rq-001",
        votes: 7,
        quote: "FORRTNITE",
        creator: "jokoflex69",
        teacher: teachers[0]
    },
    {
        requestId: "rq-002",
        votes: 7,
        quote: "FORRTNITE",
        creator: "jokoflex69",
        teacher: teachers[0]
    },
    {
        requestId: "rq-003",
        votes: 7,
        quote: "FORRTNITE",
        creator: "jokoflex69",
        teacher: teachers[0]
    },
    {
        requestId: "rq-004",
        votes: 7,
        quote: "FORRTNITE",
        creator: "jokoflex69",
        teacher: teachers[0]
    },
    {
        requestId: "rq-005",
        votes: 7,
        quote: "FORRTNITE",
        creator: "jokoflex69",
        teacher: teachers[0]
    },
    {
        requestId: "rq-006",
        votes: 7,
        quote: "FORRTNITE",
        creator: "jokoflex69",
        teacher: teachers[0]
    },
]

export const bingoExampleData: BingoExampleData = {
    teachers: teachers,
    requests: requests
};
