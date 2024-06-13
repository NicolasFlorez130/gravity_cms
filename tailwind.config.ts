import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
   darkMode: ["class"],
   content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
   ],
   prefix: "",
   theme: {
      container: {
         center: true,
         padding: "2rem",
         screens: {
            "2xl": "1400px",
         },
      },
      extend: {
         colors: {
            bg_veil: "hsl(200, 55%, 10%)",

            bg_light: "#052837",

            bg_accordion: "#073042",

            bo_close: "#6e7178",

            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: {
               DEFAULT: "hsl(var(--background))",
               dark: "hsl(var(--background-dark))",
            },
            foreground: "hsl(var(--foreground))",
            primary: {
               DEFAULT: "hsl(var(--primary))",
               foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
               DEFAULT: "hsl(var(--secondary))",
               foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            highlight: {
               DEFAULT: "hsl(var(--highlight))",
               foreground: "hsl(var(--highlight-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
            bo: {
               blue: {
                  DEFAULT: "hsl(var(--bo-blue))",
                  light: "hsl(var(--bo-blue-light))",
               },
               violet: {
                  DEFAULT: "hsl(var(--bo-violet))",
                  light: "hsl(var(--bo-violet-light))",
               },
               secondary: {
                  DEFAULT: "hsl(var(--bo-secondary))",
                  foreground: "hsl(var(--bo-secondary-foreground))",
               },
               red: {
                  DEFAULT: "hsl(var(--bo-red))",
               },
               green: {
                  DEFAULT: "hsl(var(--bo-green))",
               },
               card: {
                  background: "#f9f8ff",
                  border: "#e6e4f0",
               },
            },
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
            jump: {
               "0%, 40%, 80%": {
                  transform: "translateY(0)",
               },
               "20%, 60%": {
                  transform: "translateY(1rem)",
               },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            jump: "jump 3s ease-in-out infinite",
         },
         fontFamily: {
            epilogue: ["var(--epilogue)"],
            inter: ["var(--inter)"],
            dm_sans: ["var(--dm_sans)"],
            din: ["var(--din_condensed)"],
            din_alt: ["var(--din_alternate)"],
         },
         borderWidth: {
            3: "3px",
         },
         letterSpacing: {
            din: ".16rem",
         },
         gap: {
            18: "72px",
         },
         padding: {
            18: "72px",
         },
         screens: {
            fhd: "1900px",
            "3xl": "2560px",
         },
      },
   },
   plugins: [
      require("tailwindcss-animate"),
      require("@designbycode/tailwindcss-text-stroke"),
      plugin(({ addUtilities }) => {
         const newUtilities = {
            ".horizontal-tb": {
               writingMode: "horizontal-tb",
            },
            ".vertical-rl": {
               writingMode: "vertical-rl",
            },
            ".vertical-lr": {
               writingMode: "vertical-lr",
            },
         };
         addUtilities(newUtilities);
      }),
   ],
} satisfies Config;

export default config;
