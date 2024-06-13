import {CardContent, Card, CardDescription, CardTitle} from "@/components/ui/card.tsx";
import {useState} from "react";
import {useOptimistic} from "@/hooks/useOptimistic.ts";

type Props = {
    className?: string
    username: string
    votes: number
    quote: string
    likeState?: LikeState
}

enum LikeState {
    DISLIKE,
    NEUTRAL,
    LIKE
}

const RequestCard = (props: Props) => {
    const [likeState, setLikeState] = useState<LikeState>(props.likeState ?? LikeState.NEUTRAL)
    const [optimisticState, setOptimistic] = useOptimistic(props.votes)

    function handleLike(action: LikeState) {
        const newLikeState = likeState === action ? LikeState.NEUTRAL : action
        setLikeState(newLikeState)

        const newLikeCount = optimisticState + newLikeState - likeState
        setOptimistic(newLikeCount)

        // TODO: send like-update to db

    }

    return (
        <Card className={"w-full md:w-64 " + props.className}>
            <CardContent>
                <CardTitle className={"pt-3"}>
                    {props.quote}
                </CardTitle>
                <div className="flex items-center gap-2 pt-3">
                    <span className={"text-xl font-medium " + (optimisticState < 0 ? "text-red-500" : "text-blue-500")}>{optimisticState}</span>
                    <button className="rounded-2xl p-1 hover:bg-slate-800" onClick={async () => {
                        handleLike(LikeState.LIKE)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke={"currentColor"} className="h-6 w-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"></path>
                        </svg>
                    </button>
                    <button className="rounded-2xl p-1 hover:bg-slate-800" onClick={() => {
                        handleLike(LikeState.DISLIKE)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="h-6 w-6 text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path>
                        </svg>
                    </button>
                </div>
                <CardDescription className={"flex flex-col pt-3"}>
                    <span>requested by</span>
                    <span>{props.username}</span>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default RequestCard;