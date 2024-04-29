import {Link} from "react-router-dom";


const NotFound = () => {
    return (
        <div className={"flex flex-col items-center justify-center pt-10"}>
            <div className={"w-[600px] flex flex-col items-center justify-center gap-6"}>
                <p className={"font-bold text-7xl mb-6 text-center"}>404</p>
                <p className={"font-bold text-3xl text-font-bold text-center"}>The page you are searching for was not found</p>
                <Link to="/dashboard" className={"font-bold text-2xl text-center underline text-[#5865F2]"}>Get Back Home</Link>
            </div>
        </div>
    );
};

export default NotFound;