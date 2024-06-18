import {BehaviorSubject} from "rxjs";

export function useSessionBehaviorSubject<T>(token: string, initialValue?: T): BehaviorSubject<T | null> {
    let loadedValue: T | null = initialValue ?? null;

    const savedValue: string | null = sessionStorage.getItem(token);
    if(savedValue != null && savedValue !== "")
        loadedValue = JSON.parse(savedValue) as T | null
    else
        sessionStorage.setItem(token, JSON.stringify(initialValue));

    const behaviorSubject: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(loadedValue);
    behaviorSubject.subscribe((ud: T | null)=> {
        sessionStorage.setItem(token, JSON.stringify(ud))
    });

    return behaviorSubject
}