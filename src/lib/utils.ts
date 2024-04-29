import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {useState, useEffect} from 'react';
import {InjectionToken, container} from 'tsyringe';
import {BehaviorSubject, Subject} from 'rxjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useService<T>(injectionToken: InjectionToken<T>) {
  const [value] = useState<T>(container.resolve(injectionToken));
  return value;
}

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
