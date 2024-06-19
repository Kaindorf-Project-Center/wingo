import "reflect-metadata"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {container} from "tsyringe";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {ThemeProvider} from "@/global/Theme.ts";
import {TeacherData} from "@/data/TeacherData.ts";
import {RequestData} from "@/data/RequestData.ts";
import {UserData} from "@/data/UserData.ts";

container.registerSingleton(TeacherData, TeacherData)
container.registerSingleton(RequestData, RequestData)
container.registerSingleton(UserData, UserData)

container.registerSingleton(ThemeProvider, ThemeProvider);
const themeProvider: ThemeProvider = container.resolve(ThemeProvider);

if (themeProvider.value.getValue() != null) {
    import (`./themes/theme_${themeProvider.value.getValue()!}_vars.css`);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)
