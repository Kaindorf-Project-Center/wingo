import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {IUserData} from "./IUserData.ts";

@singleton()
class AppCache {
    // Cache to session storage and fetch if present, do alsa a refetch to ensure data integretiy
    private _userdata: BehaviorSubject<IUserData | null> = new BehaviorSubject<IUserData | null>(null);

    get userdata(): BehaviorSubject<IUserData | null> {
        return this._userdata;
    }

    set userdata(value: IUserData | null) {
        this._userdata.next(value)
        sessionStorage.setItem("userdata", JSON.stringify(value))
    }

    constructor() {
        const userdataSave: string | null = sessionStorage.getItem("userdata")
        if (userdataSave) {
            this._userdata = new BehaviorSubject<IUserData | null>(JSON.parse(userdataSave) as (IUserData | null));
        }
    }
}
export default AppCache;