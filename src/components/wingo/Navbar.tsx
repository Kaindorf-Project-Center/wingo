import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {RxAvatar} from "react-icons/rx";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {backendURL} from "../../../static.ts";
import {Button} from "@/components/ui/button.tsx";
import {container} from "tsyringe";
import {useSubscribe} from "@/lib/utils.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import AppCache from "@/models/AppCache.ts";

const appCache: AppCache = container.resolve(AppCache);

export function Navbar() {
    const userData = useSubscribe(appCache.userdata)

    return (
        <div className={"flex justify-between p-4 dark:bg-gray-900"}>
            <div className={"flex gap-4"}>
                <p className={"text-3xl"}>wingo</p>
                <Button>Play</Button>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {userData == null ?
                        <div className="flex items-center space-x-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[200px]"/>
                            </div>
                            <Skeleton className="h-12 w-12 rounded-full"/>
                        </div>
                        :
                        <div className={"flex items-center gap-4"}>
                            <p className={"font-bold"}>{userData!.username}</p>
                            <Avatar>
                                <AvatarImage src={backendURL + "/user/avatar"} alt="User Avatar"/>
                                <AvatarFallback><RxAvatar/></AvatarFallback>
                            </Avatar>
                        </div>
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <span className={"text-red-500"}>delete account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}