import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {IUserData} from "./IUserData.ts";
import {IGame} from "@/models/IGame.ts";

@singleton()
class AppCache {
    userdata: BehaviorSubject<IUserData | null> = new BehaviorSubject<IUserData | null>(null);
    public readonly playingGame: BehaviorSubject<IGame | null> = new BehaviorSubject<IGame | null>(null);

    constructor() {
        if(sessionStorage.getItem("playingGame") != null)
            this.playingGame.next(
                JSON.parse(sessionStorage.getItem("playingGame") ?? "") as IGame | null
            );

        this.playingGame.subscribe((ud)=> {
            sessionStorage.setItem("playingGame", JSON.stringify(ud))
        });
    }
}
export default AppCache;