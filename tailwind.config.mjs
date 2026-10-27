import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Light palette from astro-theme-cactus
      colors: {
        "global-bg": "#fafafa",
        "global-text": "#22282c",
        "muted": "#4a5565",
        "link": "#4d8580",
        "accent": "#c8233f",
        "accent-2": "#111111",
      },
      fontFamily: {
        mono: [...defaultTheme.fontFamily.mono.slice(0, 3), "Kaiti SC", "STKaiti", "KaiTi", "楷体", "PingFang SC", "Noto Sans SC", ...defaultTheme.fontFamily.mono.slice(3)],
      },
    },
  },
  plugins: [typography],
};
