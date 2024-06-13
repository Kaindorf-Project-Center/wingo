import {Dispatch, SetStateAction, useEffect, useState} from "react";

export function useOptimistic<T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue]);

    return [value, setValue]
}