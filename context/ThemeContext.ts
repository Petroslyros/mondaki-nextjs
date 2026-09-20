import { createContext } from "react";

type ThemeContextProps = {
    theme: "dark" | "light";
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);