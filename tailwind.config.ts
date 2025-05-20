import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#b2e4e6", // Ana kurumsal renk
          foreground: "#1a4a4c", // Koyu turkuaz (metin için)
          dark: "#8fd7da", // Daha koyu turkuaz
          light: "#d5f1f2", // Daha açık turkuaz
        },
        secondary: {
          DEFAULT: "#6a3d99", // Mor (kontrast renk)
          foreground: "#ffffff", // Beyaz (mor üzerinde metin)
          light: "#9a6cc8", // Açık mor
        },
        accent: {
          DEFAULT: "#bdb9eb", // Leylak/mor tonu (ART fırça efekti için)
          light: "#d1cef2", // Daha açık leylak
          dark: "#a29fe0", // Daha koyu leylak
          foreground: "#ffffff", // Beyaz (leylak üzerinde metin)
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          primary: "#333333",
          secondary: "#666666",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
