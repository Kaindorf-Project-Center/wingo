import AppCache from "@/models/AppCache";
import { backendURL } from "@/static";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { container } from "tsyringe";
import { Navbar } from "./Navbar";

const NavbarContainer = () => {
  const appCache = container.resolve(AppCache);

  useEffect(() => {
    if (appCache.userdata.value == null) {
      fetch(backendURL + "/user", {
        mode: "cors",
        credentials: "include",
      })
        .then((data) => data.json())
        .then((json) => {
          console.log(appCache.userdata.getValue());
          appCache.userdata.next({
            discordId: json.discordId,
            username: json.username,
          });
          console.log(appCache.userdata.getValue());
        })
        .catch(() => window.location.assign("/"));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default NavbarContainer;
