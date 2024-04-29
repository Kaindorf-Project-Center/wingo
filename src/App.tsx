import {container} from "tsyringe";
import AppCache from "@/models/AppCache.ts";
import {useSubscribe} from "@/lib/utils.ts";
import LandingPage from "@/pages/LandingPage.tsx";
import NavbarContainer from "@/components/wingo/NavbarContainer.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import BuildBingo from "@/pages/BuildBingo.tsx";
import {Route, Routes} from "react-router-dom";

const appcache = container.resolve(AppCache)

function App() {

    const userdata = useSubscribe(appcache.userdata)

  return (
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route element={<NavbarContainer />}>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/build" element={<BuildBingo/>}/>
          </Route>
          <Route path={"hs"} element={    <>
              <p onClick={() => appcache.userdata.next({
                  username: userdata?.username + "d",
                  discordId: ""
              })}>##{userdata?.username}</p>
          </>} />
      </Routes>
  )
}

export default App
