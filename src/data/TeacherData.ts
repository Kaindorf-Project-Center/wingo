import {singleton} from "tsyringe";
import {useSessionBehaviorSubject} from "@/hooks/useSessionBehaviorSubject.ts";
import {ITeacher} from "@/models/ITeacher.ts";

@singleton()
export class TeacherData {
    public readonly teachers = useSessionBehaviorSubject<ITeacher[]>("surveys", [])
}