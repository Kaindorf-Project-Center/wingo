import {IQuote} from "@/models/IQuote.ts";

export interface ITeacher {
    teacherId: string
    name: string
    shorthand: string
    quotes: IQuote[]
}