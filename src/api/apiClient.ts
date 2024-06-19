import {container} from "tsyringe";
import {UserData} from "@/data/UserData.ts";
import {ITeacher} from "@/models/ITeacher.ts";
import {TeacherData} from "@/data/TeacherData.ts";
import {IQuote} from "@/models/IQuote.ts";
import axios from 'axios';
import {RequestData} from "@/data/RequestData.ts";

export const backendURL: string = "http://localhost:3000";

export async function getUserData(): Promise<boolean> {
    const userdata: UserData = container.resolve(UserData);

    if (userdata.data.getValue() != null)
        return true

    const json = await fetch(backendURL + "/user", {
        mode: "cors",
        credentials: "include",
    })
        .then((data) => data.json())

    // Navigate to dashboard if logged in
    if (location.pathname == "/")
        return false;

    userdata.data.next({
        discordId: json.discordId,
        username: json.username,
    });

    return true;
}

export async function getRequests() {
    const teacherData = container.resolve(TeacherData);
    const requestData = container.resolve(RequestData);

    const requests = await fetch(backendURL + "/requests", {
        mode: "cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then(json => json.map((r: any) => {
            return {
                requestQuoteId: r.requestQuoteId,
                votes: r.votes,
                quote: r.quote,
                creator: r.creatorId,
                teacher: teacherData.teachers.getValue()?.find(t => t.teacherId === r.teacherId),
                userWeight: r.userWeight
            }
        }))

    requestData.requests.next(requests)
}

export async function getTeacherData() {
    const teacherData = container.resolve(TeacherData);

    const teachers = await fetch(backendURL + "/teachers", {
        mode: "cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then(json => json as ITeacher[])

    teacherData.teachers.next(teachers)
}

export async function vote(quoteId: string, weight: number) {
    await axios.post(backendURL + "/vote/" + quoteId, {
        weight: weight
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json' // Ensure the content type is set to application/json
        }
    })

    getRequests()
}

export async function sendGameData(teacher: ITeacher, board: IQuote[][]): Promise<void> {
    // app.use('/game', gameRouter);
    // app.use('/bingocards', bingoCardsRouter);
    // bingoCardsRouter.post("/", postBingoCard);
    // {teacher, columns, size, createdAt}
    // gameRouter.post("/", postGame);
    // { won, timeElapsed, bingoCardId, playedAt }

    console.log(JSON.stringify({
        teacher: teacher,
        columns: board,
        size: board.length,
        createdAt: new Date().toISOString()
    }))

    await axios.post(backendURL + "/bingocards", {
        teacher: teacher,
        columns: board,
        size: board.length + "x" + board.length,
        createdAt: new Date().toISOString()
    }, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json' // Ensure the content type is set to application/json
        }
    })

    console.log("posted")

    // await fetch(backendURL + "/game", {
    //     mode: "cors",
    //     method: "POST",
    //     credentials: "include",
    //     body: JSON.stringify({
    //         won,
    //         timeElapsed,
    //         bingoCardId,
    //         playedAt
    //     })
    // })
}