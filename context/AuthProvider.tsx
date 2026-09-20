'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { AuthContext } from "@/context/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setUserRole(session?.user?.user_metadata?.role ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setUserRole(session?.user?.user_metadata?.role ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const loginUser = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
    };

    const logoutUser = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                userRole,
                loginUser,
                logoutUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};