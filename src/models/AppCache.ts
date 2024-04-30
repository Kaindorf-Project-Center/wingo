import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {IUserData} from "./IUserData.ts";

@singleton()
class AppCache {
    userdata: BehaviorSubject<IUserData | null> = new BehaviorSubject<IUserData | null>(null);
}
export default AppCache;