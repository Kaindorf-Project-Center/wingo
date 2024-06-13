import {ITeacher} from "@/models/ITeacher.ts";

export interface IRequest {
    requestId: string
    votes: number
    quote: string
    creator: string
    teacher: ITeacher
}