import NavbarContainer from "@/components/wingo/NavbarContainer.tsx";
import BuildBingo from "@/pages/BuildBingo.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import NotFound from "@/pages/NotFound.tsx";
import {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {container} from "tsyringe";
import AppCache from "./models/AppCache";
import {backendURL} from "./static";
import Requests from "@/pages/Requests.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {BingoGame} from "@/pages/BingoGame.tsx";

function App() {
    const appCache = container.resolve(AppCache);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (appCache.userdata.value == null) {
            fetch(backendURL + "/user", {
                mode: "cors",
                credentials: "include",
            })
                .then((data) => data.json())
                .then((json) => {
                    appCache.userdata.next({
                        discordId: json.discordId,
                        username: json.username,
                    });

                    // Navigate to dashboard if logged in
                    if (location.pathname == "/") {
                        navigate("/dashboard");
                    }
                })
                .catch(() => {
                    if (location.pathname != "/") {
                        navigate("/");
                    }
                });
        }
    }, []);

    return (
        <div className={"h-screen w-screen"}>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/game" element={<BingoGame />} />
                <Route element={<NavbarContainer/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/build" element={<BuildBingo/>}/>
                    <Route path="/requests" element={<Requests/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </div>
    );
}

export default App;
