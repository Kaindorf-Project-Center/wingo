import {IBoard} from "@/models/IBoard.ts";
import {ITime} from "@/components/wingo/Timer.tsx";

export interface IGame {
    board: IBoard
    saidQuotes: boolean[][]
    time?: ITime
}