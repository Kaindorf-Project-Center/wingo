import {BehaviorSubject, Subject} from 'rxjs';
import {useEffect, useState} from "react";

export function useSubscribe<T>(subject: BehaviorSubject<T> | Subject<T>) {
    const [value, setValue] = useState<T>();

    useEffect(() => {
        const sub = subject.subscribe(v => setValue(v));

        return () => {
            sub?.unsubscribe();
        };
    }, []);

    return value;
}
