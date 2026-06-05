/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070A",
        foreground: "#FFFFFF",
        card: "rgba(10, 15, 24, 0.7)",
        border: "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#00E5FF",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#7000FF",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#00FFA3",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#FF003D",
          foreground: "#FFFFFF",
        },
        muted: "rgba(255, 255, 255, 0.4)",
        ring: "#00E5FF",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neural-grid': 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-xs': '20px 20px',
        'grid-md': '50px 50px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 229, 255, 0.2), 0 0 10px rgba(0, 229, 255, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 229, 255, 0.3)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
