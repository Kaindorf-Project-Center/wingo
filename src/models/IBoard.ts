import {ITeacher} from "@/models/ITeacher.ts";
import {IQuote} from "@/models/IQuote.ts";


export interface IBoard {
    teacher: ITeacher,
    size: number;
    columns: {
        row: IQuote[];
    }[];
}
