import {IQuote} from "@/models/IQuote.ts";

export interface ITeacher {
    teacherId: string
    name: string
    shortHand: string
    quotes: IQuote[]
}