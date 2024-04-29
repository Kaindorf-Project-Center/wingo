import {Leaderboard} from "@/components/wingo/Leaderboard.tsx";
import {backendURL} from "../../static.ts";
import {container} from "tsyringe";
import AppCache from "@/models/AppCache.ts";

const appCache: AppCache = container.resolve(AppCache);

export function Dashboard() {

    if(appCache.userdata.value == null) {
        fetch(backendURL + "/user", {
            mode: "cors",
            credentials: "include",
        })
            .then(data => data.json())
            .then(json => {
                console.log(appCache.userdata.getValue());
                appCache.userdata.next({
                    discordId: json.discordId,
                    username: json.username,
                })
                console.log(appCache.userdata.getValue());
            })
            .catch(() => window.location.assign("/"))
    }

    return (
        <div className="m-6">
          <p className={"text-3xl font-bold"}>Leaderboard</p>
            <Leaderboard/>
        </div>
    );
}
