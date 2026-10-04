import { contextBridge, ipcRenderer } from "electron";
import type { IpcInvokeEvents, IpcSendEvents } from "./ipc.types";

const electronAPI = {
	invoke<Key extends keyof IpcInvokeEvents>(
		channel: Key,
		...args: IpcInvokeEvents[Key]["args"]
	): Promise<IpcInvokeEvents[Key]["return"]> {
		return ipcRenderer.invoke(channel, ...args);
	},

	send<Key extends keyof IpcSendEvents>(
		channel: Key,
		...args: IpcSendEvents[Key]["args"]
	): void {
		ipcRenderer.send(channel, ...args);
	},
};

contextBridge.exposeInMainWorld("electron", electronAPI);