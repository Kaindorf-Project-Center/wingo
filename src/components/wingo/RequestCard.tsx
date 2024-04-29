import {CardContent, Card, CardDescription, CardTitle} from "@/components/ui/card.tsx";

const RequestCard = () => {

    return (
        <Card className={"w-full md:w-64"}>
            <CardContent>
                <CardTitle className={"pt-3"}>
                    Trivial
                </CardTitle>
                <div className="flex items-center gap-2 pt-3">
                    <span className="text-xl font-medium text-blue-500">69</span>
                    <button className="rounded-2xl p-1 hover:bg-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke={"currentColor"} className="h-6 w-6 text-blue-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"></path>
                        </svg>
                    </button>
                    <button className="rounded-2xl p-1 hover:bg-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="h-6 w-6 text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path>
                        </svg>
                    </button>
                </div>
                <CardDescription className={"flex flex-col pt-3"}>
                    <span>requested by</span>
                    <span>fantastic_otter_96669</span>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default RequestCard;