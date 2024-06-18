import {singleton} from "tsyringe";
import {useSessionBehaviorSubject} from "@/hooks/useSessionBehaviorSubject.ts";
import {IUserData} from "@/models/IUserData.ts";

@singleton()
export class UserData{
    public readonly data = useSessionBehaviorSubject<IUserData>("userData");
}