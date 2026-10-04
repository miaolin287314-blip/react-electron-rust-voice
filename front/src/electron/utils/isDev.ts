import { app } from "electron";

export function isDev(): boolean {
    return !app.isPackaged;
}
