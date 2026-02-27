import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        romantic: ['Dancing Script', 'cursive'],
        elegant: ['Playfair Display', 'serif'],
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          light: "hsl(var(--rose-light))",
          dark: "hsl(var(--rose-dark))",
        },
        lavender: {
          DEFAULT: "hsl(var(--lavender))",
          light: "hsl(var(--lavender-light))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          dark: "hsl(var(--cream-dark))",
        },
      },
      backgroundImage: {
        'gradient-romantic': 'var(--gradient-romantic)',
        'gradient-soft': 'var(--gradient-soft)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-rose-gold': 'var(--gradient-rose-gold)',
        'gradient-twilight': 'var(--gradient-twilight)',
        'gradient-nostalgic': 'var(--gradient-nostalgic)',
        'gradient-eternal': 'var(--gradient-eternal)',
        'gradient-cosmic': 'var(--gradient-cosmic)',
        'gradient-serenity': 'var(--gradient-serenity)',
        'gradient-desire': 'var(--gradient-desire)',
        'gradient-timewarp': 'var(--gradient-timewarp)',
        'gradient-mirror': 'var(--gradient-mirror)',
      },
      boxShadow: {
        'romantic': 'var(--shadow-romantic)',
        'glow': 'var(--shadow-glow)',
        'soft': 'var(--shadow-soft)',
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        glow: {
          "0%, 100%": { 
            textShadow: "0 0 10px hsl(340 100% 85% / 0.5), 0 0 20px hsl(340 100% 85% / 0.3)" 
          },
          "50%": { 
            textShadow: "0 0 20px hsl(340 100% 85% / 0.8), 0 0 40px hsl(340 100% 85% / 0.5)" 
          },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(340 82% 65% / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(340 82% 65% / 0.6)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "10%, 30%": { transform: "scale(1.1)" },
          "20%, 40%": { transform: "scale(1)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
        slideScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.8)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        first: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        second: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        third: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fourth: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        fifth: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "slide-scroll": "slideScroll 30s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        first: "first 20s linear infinite",
        second: "second 25s linear infinite",
        third: "third 30s linear infinite",
        fourth: "fourth 35s linear infinite",
        fifth: "fifth 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
