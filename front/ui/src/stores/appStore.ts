import { create } from "zustand";

interface AppState {
    selectedRoom: string;
    isConnected: boolean;
    isMuted: boolean;
    isDeafened: boolean;
    selectRoom: (room: string) => void;
    toggleConnection: () => void;
    toggleMuted: () => void;
    toggleDeafened: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedRoom: "午后闲聊",
    isConnected: false,
    isMuted: false,
    isDeafened: false,
    selectRoom: (selectedRoom) => set({ selectedRoom, isConnected: false }),
    toggleConnection: () => set((state) => ({
        isConnected: !state.isConnected,
        isMuted: false,
        isDeafened: false,
    })),
    toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),
    toggleDeafened: () => set((state) => ({ isDeafened: !state.isDeafened })),
}));