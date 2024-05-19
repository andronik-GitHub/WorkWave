import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

// color design tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
    ?
    {
        foggyGray: {
            100: "#f3f4f6",
            200: "#e7e9ee",
            300: "#dbdee5",
            400: "#cfd3dd",
            500: "#c3c8d4",
            600: "#9ca0aa",
            700: "#75787f",
            800: "#4e5055",
            900: "#27282a"
        },
        white: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff",
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        slateShadow: {
            100: "#e3e4e5",
            200: "#c7c8cb",
            300: "#acadb0",
            400: "#909196",
            500: "#74767c",
            600: "#5d5e63",
            700: "#46474a",
            800: "#2e2f32",
            900: "#171819"
        },
        azureBlaze: {
            100: "#cfe3fa",
            200: "#9fc7f6",
            300: "#70acf1",
            400: "#4090ed",
            500: "#1074e8",
            600: "#0d5dba",
            700: "#0a468b",
            800: "#062e5d",
            900: "#03172e"
        },
        midnightStone: {
            100: "#d6d6d8",
            200: "#acadb1",
            300: "#83848a",
            400: "#595b63",
            500: "#30323c",
            600: "#262830",
            700: "#1d1e24",
            800: "#131418",
            900: "#0a0a0c"
        },
        skyTwilight: {
            100: "#e7ecf7",
            200: "#cfd9ef",
            300: "#b8c5e8",
            400: "#a0b2e0",
            500: "#889fd8",
            600: "#6d7fad",
            700: "#525f82",
            800: "#364056",
            900: "#1b202b"
        },
        nightfall: {
            100: "#d2d3d4",
            200: "#a6a6a9",
            300: "#797a7e",
            400: "#4d4d53",
            500: "#202128",
            600: "#1a1a20",
            700: "#131418",
            800: "#0d0d10",
            900: "#060708"
        },
        stormyCloud: {
            100: "#e1e1e2",
            200: "#c3c4c6",
            300: "#a6a6a9",
            400: "#88898d",
            500: "#6a6b70",
            600: "#55565a",
            700: "#404043",
            800: "#2a2b2d",
            900: "#151516"
        }
    }
    :
    {
        foggyGray: {
            100: "#f3f4f6",
            200: "#e7e9ee",
            300: "#dbdee5",
            400: "#cfd3dd",
            500: "#c3c8d4",
            600: "#9ca0aa",
            700: "#75787f",
            800: "#4e5055",
            900: "#27282a"
        },
        white: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff",
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },
        slateShadow: {
            100: "#e3e4e5",
            200: "#c7c8cb",
            300: "#acadb0",
            400: "#909196",
            500: "#74767c",
            600: "#5d5e63",
            700: "#46474a",
            800: "#2e2f32",
            900: "#171819"
        },
        azureBlaze: {
            100: "#cfe3fa",
            200: "#9fc7f6",
            300: "#70acf1",
            400: "#4090ed",
            500: "#1074e8",
            600: "#0d5dba",
            700: "#0a468b",
            800: "#062e5d",
            900: "#03172e"
        },
        midnightStone: {
            100: "#d6d6d8",
            200: "#acadb1",
            300: "#83848a",
            400: "#595b63",
            500: "#30323c",
            600: "#262830",
            700: "#1d1e24",
            800: "#131418",
            900: "#0a0a0c"
        },
        skyTwilight: {
            100: "#e7ecf7",
            200: "#cfd9ef",
            300: "#b8c5e8",
            400: "#a0b2e0",
            500: "#889fd8",
            600: "#6d7fad",
            700: "#525f82",
            800: "#364056",
            900: "#1b202b"
        },
        nightfall: {
            100: "#d2d3d4",
            200: "#a6a6a9",
            300: "#797a7e",
            400: "#4d4d53",
            500: "#202128",
            600: "#1a1a20",
            700: "#131418",
            800: "#0d0d10",
            900: "#060708"
        },
        stormyCloud: {
            100: "#e1e1e2",
            200: "#c3c4c6",
            300: "#a6a6a9",
            400: "#88898d",
            500: "#6a6b70",
            600: "#55565a",
            700: "#404043",
            800: "#2a2b2d",
            900: "#151516"
        }
    })
});


// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ?
                {
                    foggyGray: {
                        main: colors.foggyGray[500],
                    },
                    white: {
                        main: colors.white[500],
                    },
                    slateShadow: {
                        main: colors.slateShadow[500],
                    },
                    azureBlaze: {
                        main: colors.azureBlaze[500],
                    },
                    midnightStone: {
                        main: colors.midnightStone[500],
                    },
                    skyTwilight: {
                        main: colors.skyTwilight[500],
                    },
                    nightfall: {
                        main: colors.nightfall[500],
                    },
                    stormyCloud: {
                        main: colors.stormyCloud[500],
                    },
                    background: {
                        default: colors.nightfall[500],
                    },
                }
                :
                {
                    foggyGray: {
                        main: colors.foggyGray[500],
                    },
                    white: {
                        main: colors.white[500],
                    },
                    slateShadow: {
                        main: colors.slateShadow[500],
                    },
                    azureBlaze: {
                        main: colors.azureBlaze[500],
                    },
                    midnightStone: {
                        main: colors.midnightStone[500],
                    },
                    skyTwilight: {
                        main: colors.skyTwilight[500],
                    },
                    nightfall: {
                        main: colors.nightfall[500],
                    },
                    stormyCloud: {
                        main: colors.stormyCloud[500],
                    },
                    background: {
                        default: colors.midnightStone[500],
                    },
                }
            )
        },
        typography: {
            fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
            fontSize: 18,
            h1: {
                fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
                fontSize: 75,
            },
            h2: {
                fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
                fontSize: 50,
            },
            h3: {
                fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h4: {
                fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
                fontSize: 28,
            },
            h5: {
                fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
                fontSize: 20,
            },
            h6: {
                fontFamily: ['Roboto Slab', 'sans-serif'].join(','),
                fontSize: 16,
            },
        },
    };
};


// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => 
                setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode]
};