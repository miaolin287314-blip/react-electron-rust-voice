import { create } from "zustand";

export interface AuthUser {
    id: string;
    username: string;
}

interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: async (username, password) => {
        const result = await window.electron.invoke("auth:login", username, password);
        set({
            user: { id: username, username },
            token: result.token,
            isAuthenticated: true,
        });
    },
    logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));