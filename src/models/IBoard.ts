import {Quote, Teacher} from "@/data/bingoExampleData.ts";

export interface IBoard {
    teacher?: Teacher,
    size: number;
    columns: {
        row: Array<Quote | undefined>;
    }[];
}
