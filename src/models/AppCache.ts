import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {IGame} from "@/models/IGame.ts";
import {useSessionBehaviorSubject} from "@/hooks/useSessionBehaviorSubject.ts";

@singleton()
class AppCache {
    public readonly playingGame: BehaviorSubject<IGame | null> = useSessionBehaviorSubject<IGame>("playingGame");
}
export default AppCache;