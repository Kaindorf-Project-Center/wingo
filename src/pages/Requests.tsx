import RequestCard from "@/components/wingo/RequestCard.tsx";
import RequestDialog from "@/components/wingo/RequestDialog.tsx";


const Requests = () => {

    return (
        <div className={"flex flex-col p-5"}>

            <h1 className={"text-2xl font-bold pb-4"}>Open Requests</h1>
            <div className={"flex flex-wrap gap-5"}>
                <RequestDialog />
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
                <RequestCard/>
            </div>


        </div>
    );
};

export default Requests;