import NavbarContainer from "@/components/wingo/NavbarContainer.tsx";
import BuildBingo from "@/pages/BuildBingo.tsx";
import { Dashboard } from "@/pages/Dashboard.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import NotFound from "@/pages/NotFound.tsx";
import { Route, Routes } from "react-router-dom";
import { container } from "tsyringe";
import { useSubscribe } from "./hooks/useSubscribe";
import AppCache from "./models/AppCache";

function App() {
  const appCache = container.resolve(AppCache);
  const userdata = useSubscribe(appCache.userdata);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<NavbarContainer />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/build" element={<BuildBingo />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
      <Route
        path={"hs"}
        element={
          <>
            <p
              onClick={() =>
                appCache.userdata.next({
                  username: userdata?.username + "d",
                  discordId: "",
                })
              }
            >
              ##{userdata?.username}
            </p>
          </>
        }
      />
    </Routes>
  );
}

export default App;
