import {singleton} from "tsyringe";
import {BehaviorSubject} from "rxjs";
import {useSessionBehaviorSubject} from "@/hooks/useSessionBehaviorSubject.ts";

@singleton()
export class ThemeProvider {
    value: BehaviorSubject<string | null> = useSessionBehaviorSubject<string>("theme", "standard")
    oldVal: string | null = JSON.parse(sessionStorage.getItem("theme") ?? "") as string | null

    mode: ThemeMode = getThemeModeFromString(localStorage.getItem('themes-mode') ?? ThemeMode.system)

    constructor() {
        this.value.subscribe((ud: string | null) => {
            if (ud != this.oldVal) {
                this.oldVal = ud;
                location.reload()
            }
        });


        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (!localStorage.getItem('themes-node')) {
                this.applyUserPreference();
            }
        });

        this.applyUserPreference();
    }

    private applyUserPreference() {
        const systemMode: ThemeMode.light | ThemeMode.dark = window.matchMedia('(prefers-color-scheme: dark)').matches ? ThemeMode.dark : ThemeMode.light;
        const mode: ThemeMode = getThemeModeFromString(localStorage.getItem('themes-mode') ?? systemMode);
        if (mode === ThemeMode.light)
            document.documentElement.classList.remove('dark');
        else if (mode === ThemeMode.dark)
            document.documentElement.classList.add('dark');
        this.mode = mode
    }

    public setThemeMode(mode: ThemeMode) {
        if(mode === ThemeMode.system)
            localStorage.removeItem('themes-mode'); // Remove the preference to follow system again
        else
            localStorage.setItem('themes-mode', mode);
        this.applyUserPreference();
    }
}

export enum ThemeMode {
    light = 'light',
    dark = 'dark',
    system = 'system'
}

function getThemeModeFromString(themeString: string) {
    switch (themeString) {
        case ThemeMode.light:
            return ThemeMode.light;
        case ThemeMode.dark:
            return ThemeMode.dark;
        case ThemeMode.system:
        default:
            return ThemeMode.system;
    }
}

export class Theme {
    name: string

    constructor(name: string) {
        this.name = name;
    }
}