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
import {NoMobile} from "@/pages/NoMobile.tsx";

function App() {
    const appCache = container.resolve(AppCache);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(isMobile())
        {
            navigate("/no-mobile");
        }

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

    function isMobile(): boolean {
        // User agent string via navigator object
        const userAgent = navigator.userAgent

        // Regular expressions to detect mobile devices
        const mobileRegex = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

        // Check if the user agent matches the mobile device regex
        return mobileRegex.test(userAgent);
    }

    return (
        <div className={"h-screen w-screen"}>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/no-mobile" element={<NoMobile/>}/>
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
