import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

type AuthContextProps = {
    isAuthenticated: boolean;
    user: User | null;
    userRole: string | null;
    loginUser: (email: string, password: string) => Promise<{ error: string | null }>;
    logoutUser: () => Promise<void>;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);