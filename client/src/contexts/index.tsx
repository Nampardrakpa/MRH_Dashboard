import React, {
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "@refinedev/mui";

type ColorModeContextType = {
    mode: string;
};

export const ColorModeContext = createContext<ColorModeContextType>(
    { mode: "light" },
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [mode] = useState("light");

    return (
        <ColorModeContext.Provider
            value={{
                mode,
            }}
        >
            <ThemeProvider theme={LightTheme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
