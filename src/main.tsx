import "reflect-metadata"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {container} from "tsyringe";
import AppCache from "@/models/AppCache.ts";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@/components/ThemeProvider.tsx";
import React from "react";

container.registerSingleton(AppCache, AppCache)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
