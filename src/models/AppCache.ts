import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {IUserData} from "./IUserData.ts";
import {IGame} from "@/models/IGame.ts";
import {useSavedBehaviorSubject} from "@/hooks/useSavedBehaviorSubject.ts";

@singleton()
class AppCache {
    public readonly userdata: BehaviorSubject<IUserData | null> = useSavedBehaviorSubject<IUserData>("userData");
    public readonly playingGame: BehaviorSubject<IGame | null> = useSavedBehaviorSubject<IGame>("playingGame");
}
export default AppCache;