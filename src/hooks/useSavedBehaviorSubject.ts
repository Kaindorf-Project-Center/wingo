import {BehaviorSubject} from "rxjs";

export function useSavedBehaviorSubject<T>(token: string): BehaviorSubject<T | null> {
    let loadedValue: T | null = null;

    const savedValue: string | null = localStorage.getItem(token);
    if(savedValue != null)
        loadedValue = JSON.parse(savedValue) as T | null

    const behaviorSubject: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(loadedValue);
    behaviorSubject.subscribe((ud: T | null)=> {
        sessionStorage.setItem(token, JSON.stringify(ud))
    });

    return behaviorSubject
}