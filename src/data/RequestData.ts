import {singleton} from "tsyringe";
import {useSessionBehaviorSubject} from "@/hooks/useSessionBehaviorSubject.ts";
import {IRequest} from "@/models/IRequest.ts";

@singleton()
export class RequestData {
    public readonly requests = useSessionBehaviorSubject<IRequest[]>("requests", [])
}