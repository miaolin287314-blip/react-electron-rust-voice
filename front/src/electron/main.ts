import { app, BrowserWindow } from "electron";
import path from "node:path";
import { isDev } from "./utils/isDev";
import { ipcHandle, ipcOn } from "./utils/ipc";
import { createTray } from "./tray/index";

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
        frame: false,
    });

    const viteUrl = process.env.VITE_DEV_SERVER_URL;

    if (isDev() && viteUrl) {
        void win.loadURL(viteUrl);
        win.webContents.openDevTools({ mode: "detach" });
    } else {
        void win.loadFile(path.resolve(__dirname, "../../ui-dist/index.html"));
    }
}

function registerIpcHandlers(): void {
    ipcHandle("app:getInfo", () => ({
        name: app.getName(),
        version: app.getVersion(),
        isPackaged: app.isPackaged,
    }));

    ipcOn("window:minimize", (event) => {
        BrowserWindow.fromWebContents(event.sender)?.minimize();
    });

    ipcOn("window:maximize", (event) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        if (!window) return;

        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    });
}

let tray: ReturnType<typeof createTray>;

app.whenReady().then(() => {
    registerIpcHandlers();
    createWindow();

    tray = createTray();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
