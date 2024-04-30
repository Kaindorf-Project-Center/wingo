import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useSubscribe } from "@/hooks/useSubscribe.ts";
import AppCache from "@/models/AppCache.ts";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { container } from "tsyringe";
import { backendURL } from "@/static.ts";
import { toast } from "sonner"

export function Navbar() {
  const appCache: AppCache = container.resolve(AppCache);
  const userData = useSubscribe(appCache.userdata);

  const navigate = useNavigate();

  function logoutUser()
  {
    fetch(backendURL + "/user/logout", {
      mode: "cors",
      credentials: "include",
      method: "POST",
    })
        .then((response) => {
          if(response.ok)
            navigate("/")
          else
            throw new Error("Response was not ok: " + response.statusText);
        })
        .catch((err) => {
          toast("Logout failed", {
            description: "Try again with stable connection to the server",
          })
          console.log(err)
        })
  }

  function deleteUser()
  {
    fetch(backendURL + "/user", {
      mode: "cors",
      credentials: "include",
      method: "DELETE",
    })
        .then((response) => {
          if(response.ok)
            navigate("/")
          else
            throw new Error("Response was not ok: " + response.statusText);
        })
        .catch((err) => {
          toast("Delete failed", {
            description: "Try again with stable connection to the server",
          })
          console.log(err)
        })
  }


  return (
    <div className={"flex justify-between p-4 dark:bg-gray-900"}>
      <div className={"flex gap-4"}>
        <a className={"text-3xl"} href="/dashboard">
          wingo
        </a>
        <Button onClick={() => navigate("/build")}>Play</Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {userData == null ? (
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          ) : (
            <div className={"flex items-center gap-4"}>
              <p className={"font-bold"}>{userData!.username}</p>
              <Avatar>
                <AvatarImage src={backendURL + "/user/avatar"} alt="User Avatar" />
                <AvatarFallback>
                  <RxAvatar />
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={deleteUser}>
              <span className={"text-red-500"}>delete account</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutUser}>
              <span>log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
