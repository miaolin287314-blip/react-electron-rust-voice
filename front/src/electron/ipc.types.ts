export interface IpcInvokeEvents {
    "app:getInfo": {
        args: [];
        return: {
            name: string;
            version: string;
            isPackaged: boolean;
        };
    };

    "auth:login": {
        args: [username: string, password: string];
        return: {
            token: string;
        };
    };

    "user:get": {
        args: [id: string];
        return: {
            id: string;
            username: string;
        };
    };
}

export interface IpcSendEvents {
    "window:minimize": {
        args: [];
    };

    "window:maximize": {
        args: [];
    };
}

export type IpcHandleEvents = IpcInvokeEvents;
export type IpcOnEvents = IpcSendEvents;