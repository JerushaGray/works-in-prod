import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        success: "#00D26A",
        warning: "#FFB020",
        error: "#FF4C4C",
      },
    },
  },
  plugins: [],
}

export default config
