import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {IUserData} from "./IUserData.ts";
import {IGame} from "@/models/IGame.ts";
import {useSavedBehaviorSubject} from "@/hooks/useSavedBehaviorSubject.ts";

@singleton()
class AppCache {
    userdata: BehaviorSubject<IUserData | null> = new BehaviorSubject<IUserData | null>(null);
    public readonly playingGame: BehaviorSubject<IGame | null> = useSavedBehaviorSubject<IGame>("playingGame");
}
export default AppCache;