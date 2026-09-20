'use client'

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function AuthButton() {
    const { isAuthenticated, logoutUser } = useAuth();
    const router = useRouter();

    return isAuthenticated ? (
        <Button onClick={logoutUser} variant="outline">
            Logout
        </Button>
    ) : (
        <Button onClick={() => router.push("/login")}>
            Login
        </Button>
    );
}