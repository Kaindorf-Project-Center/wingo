import {ITeacher} from "@/models/ITeacher.ts";

export interface IRequest {
    requestQuoteId: string
    votes: number
    quote: string
    creator: string
    teacher: ITeacher
    userWeight: number
}