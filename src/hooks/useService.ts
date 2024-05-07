import {useState} from 'react';
import {InjectionToken, container} from 'tsyringe';

export function useService<T>(injectionToken: InjectionToken<T>) {
    const [value] = useState<T>(container.resolve(injectionToken));
    return value;
}