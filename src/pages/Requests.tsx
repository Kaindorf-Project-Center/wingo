import RequestCard from "@/components/wingo/RequestCard.tsx";
import RequestDialog from "@/components/wingo/RequestDialog.tsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {RequestData} from "@/data/RequestData.ts";
import {container} from "tsyringe";
import {getRequests} from "@/api/apiClient.ts";
import {useSubscribe} from "@/hooks/useSubscribe.ts";

const Requests = () => {

    const requestData = container.resolve(RequestData)
    const requests = useSubscribe(requestData.requests);

    // const requests = bingoExampleData.requests
    const [numberOfFillerElements, setNumberOfFillerElements] = useState(0)

    useEffect(() => {
        getRequests()
    }, []);



    useLayoutEffect(() => {
        function f() {
            if(!requests)
                return
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
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

                {requests &&
                    <>
                        {requests.map(((r) => {
                            return <RequestCard key={r.requestQuoteId} request={r}/>
                        }))}
                        {
                            Array(numberOfFillerElements).fill(0).map(((_, i) => {
                                return <div key={i} className={"w-full md:w-64"}/>
                            }))
                        }
                    </>
                }
            </div>


        </div>
    );
};

export default Requests;