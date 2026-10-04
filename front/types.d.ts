interface Window {
  electron: {
    subscribeStatistics: (cb: (usage: SystemUsage) => void) => void;
    getStaticData: () => Promise<StorageData>;
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    hide: () => void;
    getNetWorkStatus: (cb: (network: NetWorkStatus) => void) => void;
    getGameInfo: () => Promise<GameSelectorInfo>;
    getGameInfoList: () => Promise<{
      data: GameSelectorInfo[];
      success: boolean;
    }>;
    getAuthStatus: () => Promise<boolean>;
    setUserAuth: (data: unknown) => Promise<boolean>;
    getUserAuth: () => Promise<string>;
    electronReady: (cb: () => Promise<unknown>) => void;
    fetchCsrfToken: () => Promise<{
      code: number;
      message: string;
      data: { csrfToken: string };
    }>;
    clearUserAuth: () => Promise<boolean>;
  };
}

type SystemUsage = {
  cpuUsage: number;
  ramUsage: number;
  usage: number;
};

type StorageData = {
  total: number;
  cpnModel: string;
  totalMemoryGB: number;
};

type UserAuthLogin = {
  userId: string;
  token: string;
  username: string;
};

type NetWorkStatus = {
  download: string;
  upload: string;
  unit: string;
};

type GameSelectorInfo = {
  id: string;
  message: string;
  success: boolean;
  exeIcon: string;
  exeName: string;
  exeVersion: string;
  createdAt: number;
  fullPath: string;
  gameAlias: string[];
};

type FsError = {
  code: string;
  message: string;
};
