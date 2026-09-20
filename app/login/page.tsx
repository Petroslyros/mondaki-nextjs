'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type UserLogin, userLoginSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UserLogin>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: UserLogin) => {
        const { error } = await loginUser(data.email, data.password);
        if (error) {
            setError("email", { type: "manual", message: "Invalid email or password" });
            setError("password", { type: "manual", message: "Invalid email or password" });
            return;
        }
        toast.success("Welcome back!");
        router.push("/admin");
        router.refresh();
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] p-8">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl text-center text-white mb-8 font-bold">
                    Admin Login
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-[#121212] border border-[#2a2a2a] p-8 rounded-lg space-y-4"
                    autoComplete="off"
                >
                    <div>
                        <Label htmlFor="email" className="text-gray-300">Email</Label>
                        <Input
                            id="email"
                            {...register("email")}
                            className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-1"
                        />
                        {errors.email && (
                            <div className="text-gray-400 text-sm mt-1">{errors.email.message}</div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-1"
                        />
                        {errors.password && (
                            <div className="text-gray-400 text-sm mt-1">{errors.password.message}</div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white hover:bg-gray-200 text-black mt-2"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}