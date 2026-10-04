import { ipcMain, ipcRenderer } from "electron";
import type {
    IpcHandleEvents,
    IpcInvokeEvents,
    IpcOnEvents,
    IpcSendEvents,
} from "../ipc.types";

export function isDev(): boolean {
    return process.env.NODE_ENV === "development";
}

/**
 * 获取指定 IPC Event 的参数类型
 */
type EventArgs<Events, Key extends keyof Events> = Events[Key] extends {
    args: infer Args extends unknown[];
}
    ? Args
    : never;

/**
 * 获取指定 IPC Event 的返回值类型
 */
type EventReturn<Events, Key extends keyof Events> = Events[Key] extends {
    return: infer Result;
}
    ? Result
    : never;

export function ipcHandle<Key extends keyof IpcHandleEvents>(
    channel: Key,
    handler: (
        event: Electron.IpcMainInvokeEvent,
        ...args: EventArgs<IpcHandleEvents, Key>
    ) => EventReturn<IpcHandleEvents, Key> | Promise<EventReturn<IpcHandleEvents, Key>>,
): void {
    ipcMain.handle(channel as string, async (event, ...args) => {
        return await handler(event, ...(args as EventArgs<IpcHandleEvents, Key>));
    });
}

export function ipcInvoke<Key extends keyof IpcInvokeEvents>(
    channel: Key,
    ...args: EventArgs<IpcInvokeEvents, Key>
): Promise<EventReturn<IpcInvokeEvents, Key>> {
    return ipcRenderer.invoke(channel as string, ...args);
}

export function ipcOn<Key extends keyof IpcOnEvents>(
    channel: Key,
    handler: (event: Electron.IpcMainEvent, ...args: EventArgs<IpcOnEvents, Key>) => void,
): void {
    ipcMain.on(channel as string, (event, ...args) => {
        handler(event, ...(args as EventArgs<IpcOnEvents, Key>));
    });
}

export function ipcSend<Key extends keyof IpcSendEvents>(
    channel: Key,
    ...args: EventArgs<IpcSendEvents, Key>
): void {
    ipcRenderer.send(channel as string, ...args);
}
