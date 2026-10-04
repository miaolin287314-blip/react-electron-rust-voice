import type { IpcInvokeEvents, IpcSendEvents } from "./electron/ipc.types";

export {};

declare global {
    interface Window {
        electron: {
            invoke<Key extends keyof IpcInvokeEvents>(
                channel: Key,
                ...args: IpcInvokeEvents[Key]["args"]
            ): Promise<IpcInvokeEvents[Key]["return"]>;

            send<Key extends keyof IpcSendEvents>(
                channel: Key,
                ...args: IpcSendEvents[Key]["args"]
            ): void;
        };
    }
}

