import { createContext, useContext, ReactNode, useState } from "react";

type darkLightContext = {
    dark: boolean;
    darkPage: () => void;
};

const darkLightContextDefaultValues: darkLightContext = {
    dark: false,
    darkPage: () => {}
};

const DarkContext = createContext<darkLightContext>(darkLightContextDefaultValues);

export function useDark() {
    return useContext(DarkContext);
}


type Props = {
    children: ReactNode;
};

export function DarkenProvider({ children }: Props) {
    const [dark, setDark] = useState<boolean>(false);

    const darkPage = () => {
        setDark(!dark);
    };

    const value = {
        dark,
        darkPage
    };

    return (
        <>
            <DarkContext.Provider value={value}>
                {children}
            </DarkContext.Provider>
        </>
    );
}
