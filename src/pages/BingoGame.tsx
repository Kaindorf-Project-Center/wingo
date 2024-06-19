import Timer, {incrementTime} from "@/components/wingo/Timer.tsx";
import {container} from "tsyringe";
import AppCache from "@/models/AppCache.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {IGame} from "@/models/IGame.ts";
import {useSubscribe} from "@/hooks/useSubscribe.ts";
import {Button} from "@/components/ui/button.tsx";
import {sendGameData} from "@/api/apiClient.ts";

export function BingoGame() {

    const appCache = container.resolve(AppCache);
    const navigate = useNavigate()

    // -----------------------------
    // State Variables
    // -----------------------------

    const game: IGame | undefined | null = useSubscribe(appCache.playingGame);

    const [selectedGrid, setSelectedGrid] = useState<boolean[][]>([])
    const [hasWon, setHasWon] = useState<boolean>(false)
    // const [beginTime, setBeginTime] = useState<Date>(new Date())

    const [time, dispatch] = useReducer(incrementTime, {
        seconds: 0,
        minutes: 0,
        hours: 0,
    });

    // -----------------------------
    // Effects
    // -----------------------------

    useEffect(() => {
        if (appCache.playingGame.getValue() == null)
            navigate("/")
    }, [appCache.playingGame, navigate]);

    useEffect(() => {
        if (game)
            setSelectedGrid(game.saidQuotes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game?.saidQuotes])

    useEffect(() => {
        const won = checkWin()
        if (won && game) {
            appCache.playingGame.next(
                {
                    ...game,
                    time: time
                }
            )
            setHasWon(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGrid, appCache, time]);

    // -----------------------------
    // Utility methods
    // -----------------------------

    function checkWin(): boolean {
        if (!game)
            return false
        const size: number = game!.board.size;

        let diagonalLWin: boolean = true;
        let diagonalRWin: boolean = true;
        for (let i = 0; i < size; i++) {
            let verticalWin: boolean = true;
            let horizontalWin: boolean = true;

            for (let j = 0; j < size; j++) {
                if (!selectedGrid![i][j])
                    verticalWin = false;
                if (!selectedGrid![j][i])
                    horizontalWin = false;
            }
            if (verticalWin || horizontalWin)
                return true;

            if (!selectedGrid![i][i])
                diagonalLWin = false;
            if (!selectedGrid![size - 1 - i][size - 1 - i])
                diagonalRWin = false;
        }
        return diagonalRWin || diagonalLWin;
    }

    async function finishGame() {
        if(game)
            sendGameData(game.board.teacher, game.board.columns.map(c => c.row))
    }

    return (
        <div className={"flex flex-col items-center justify-center h-full w-full"}>
            <p className={"text-8xl font-bold mb-4"}>wingo</p>

            <Timer time={time} dispatch={dispatch} timerRunning={!hasWon}/>

            {game && selectedGrid.length == game.saidQuotes.length &&
                <div
                    style={{maxWidth: "500px", width: "100%", maxHeight: "500px", height: "100%"}}
                    className="bg-indigo-500 bg-opacity-25 rounded-2xl p-5 flex flex-col gap-3 flex-1 aspect-square"
                >
                    {game.board.columns.map((c, ci) => {
                        return (
                            <div key={ci} className="flex flex-row flex-1 gap-3">
                                {c.row.map((q, ri) => {
                                    return (
                                        <div
                                            key={ri}
                                            className={`relative w-full h-full rounded-2xl p-4 cursor-pointer flex-col gap-3 bg-indigo-400 ${selectedGrid[ci][ri] ? "bg-red-500" : ""}`}
                                            onClick={() => {
                                                if (!hasWon) {
                                                    selectedGrid[ci][ri] = !selectedGrid[ci][ri]
                                                    setSelectedGrid([...selectedGrid])
                                                }
                                            }}
                                        >
                                            <div className="absolute inset-0 p-3 truncate">
                                                <p className="text-xs text-center whitespace-normal">{q?.quote ?? "no quote"}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            }

            {
                // -----------------------------
                // win screen
                // -----------------------------
            }

            {hasWon &&
                <div className={"absolute h-screen w-screen bg-[#00000077] flex items-center justify-center flex-col"}>
                    <p className={"text-9xl"}>Gewonnen!</p>
                    <Button variant={"secondary"} onClick={finishGame}>Spieldaten senden und beenden</Button>
                </div>
            }
        </div>
    );
}