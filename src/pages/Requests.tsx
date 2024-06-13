import RequestCard from "@/components/wingo/RequestCard.tsx";
import RequestDialog from "@/components/wingo/RequestDialog.tsx";
import {useLayoutEffect, useState} from "react";
import {bingoExampleData} from "@/data/bingoExampleData.ts";

const Requests = () => {
    const requests = bingoExampleData.requests
    const [numberOfFillerElements, setNumberOfFillerElements] = useState(0)

    useLayoutEffect(() => {

        function f() {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            console.log(window.innerWidth + " / " + (rootFontSize * 17))
            const countPerRow = Math.floor(window.innerWidth / (rootFontSize * 17))
            setNumberOfFillerElements(countPerRow - requests.length % countPerRow)
        }
        f()

        addEventListener("resize", () => f())
        return removeEventListener("resize", () => f())
    }, []);

    return (
        <div className={"flex flex-col p-5"}>

            <h1 className={"text-2xl font-bold pb-4"}>Open Requests</h1>
            <div className={"flex gap-5 flex-wrap justify-center"}>
                <RequestDialog/>
                {requests.map(((r) => {
                    return <RequestCard key={r.quote} username={r.creator}
                                        votes={r.votes} quote={r.quote}/>
                }))}
                {
                    Array(numberOfFillerElements).fill(0).map(((_, i) => {
                        return <div key={i} className={"w-full md:w-64"}/>
                    }))
                }
            </div>


        </div>
    );
};

export default Requests;