import {container} from "tsyringe";
import {UserData} from "@/data/UserData.ts";
import {ITeacher} from "@/models/ITeacher.ts";
import {TeacherData} from "@/data/TeacherData.ts";
import {IQuote} from "@/models/IQuote.ts";

export const backendURL: string = "http://localhost:3000";

export async function getUserData(): Promise<boolean> {
    const userdata: UserData = container.resolve(UserData);

    if(userdata.data.getValue() != null)
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


export async function getTeacherData() {
    const teacherData = container.resolve(TeacherData);

    const teachers = await fetch(backendURL + "/teachers", {
        mode: "cors",
        credentials: "include",
    })
        .then((res) => res.json())
        .then(json => json as ITeacher[])

    console.log(teachers)

    teacherData.teachers.next(teachers)
}

export async function sendGameData(teacher: ITeacher, board: IQuote[][]): Promise<void> {
    // app.use('/game', gameRouter);
    // app.use('/bingocards', bingoCardsRouter);
    // bingoCardsRouter.post("/", postBingoCard);
    // {teacher, columns, size, createdAt}
    // gameRouter.post("/", postGame);
    // { won, timeElapsed, bingoCardId, playedAt }

    await fetch(backendURL + "/bingocards", {
        mode: "cors",
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            teacher: teacher.teacherId,
            columns: board,
            size: board.length,
            createdAt: new Date().toISOString()
        })
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