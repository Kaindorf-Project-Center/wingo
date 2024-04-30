import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {ILeaderboardEntry} from "@/models/ILeaderboardEntry.ts";
import {backendURL} from "@/static.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export function Leaderboard() {

    const [leaderboardEntrys, setLeaderboardEntrys] = useState<ILeaderboardEntry[]>([])

    async function fetchLeaderboardEntrys() {
        fetch(backendURL + "/user/leaderboard", {
            mode: "cors",
            credentials: "include",
        })
            .then(data => data.json())
            .then(json => json.map((obj: {
                discordId: string,
                username: string,
                totalWins: number,
                totalTime: number
            }): ILeaderboardEntry => {
                return {
                    playerId: obj.discordId,
                    name: obj.username,
                    totalWins: obj.totalWins,
                    totalTime: obj.totalTime
                }
            }))
            .then(entries => setLeaderboardEntrys(entries))
            .catch(e => console.log("could not fetch leaderboard ", e));
    }

    useEffect(() => {
        fetchLeaderboardEntrys();
    }, []);

    return (
        <div className={"max-w-[1000px] w-full mx-auto m-6"}>
            <p className={"text-3xl font-bold"}>Leaderboard</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Player ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Total Wins</TableHead>
                        <TableHead>Total Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaderboardEntrys.length == 0 ?
                        Array(8).fill(0).map((_, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-[20px] rounded-xl"/></TableCell>
                                    <TableCell><Skeleton className="h-[20px] rounded-xl"/></TableCell>
                                    <TableCell><Skeleton className="h-[20px] rounded-xl"/></TableCell>
                                    <TableCell><Skeleton className="h-[20px] rounded-xl"/></TableCell>
                                </TableRow>
                            )
                        })
                        :
                        leaderboardEntrys.map((entry) => (
                            <TableRow key={entry.playerId}>
                                <TableCell className="font-medium">{entry.playerId}</TableCell>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.totalWins}</TableCell>
                                <TableCell>{entry.totalTime}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
