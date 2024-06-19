import NavbarContainer from "@/components/wingo/NavbarContainer.tsx";
import BuildBingo from "@/pages/BuildBingo.tsx";
import {Dashboard} from "@/pages/Dashboard.tsx";
import LandingPage from "@/pages/LandingPage.tsx";
import NotFound from "@/pages/NotFound.tsx";
import {useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Toaster} from "@/components/ui/sonner.tsx";
import {BingoGame} from "@/pages/BingoGame.tsx";
import {NoMobile} from "@/pages/NoMobile.tsx";
import {getUserData} from "@/api/apiClient.ts";
import Requests from "@/pages/Requests.tsx";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function task() {
            const res = await getUserData()
            if (location.pathname === "/" && res)
                navigate("/dashboard");
            else if (!res)
                navigate("/");
        }

        task()
    }, [navigate]);

    return (
        <div className={"h-screen w-screen"}>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/no-mobile" element={<NoMobile/>}/>
                <Route path="/game" element={<BingoGame/>}/>
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
