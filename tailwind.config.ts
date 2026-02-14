import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                romantic: {
                    dark: "#1a0505",
                    red: "#8a1c1c",
                    pink: "#ff9eb5",
                    gold: "#d4af37",
                    cream: "#f5e6e8",
                },
            },
            fontFamily: {
                playfair: ["var(--font-playfair)", "serif"],
                cormorant: ["var(--font-cormorant)", "serif"],
            },
            animation: {
                "heartbeat": "heartbeat 1.5s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "fade-in": "fadeIn 2s ease-out forwards",
                "slide-up": "slideUp 1s ease-out forwards",
            },
            keyframes: {
                heartbeat: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
