import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#ce7c2f",
        "surface-container-high": "#e7e8e9",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#00174a",
        "on-tertiary-fixed-variant": "#6e3900",
        "outline": "#757682",
        "tertiary-fixed": "#ffdcc3",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#76d6d5",
        "on-background": "#191c1d",
        "secondary": "#006a6a",
        "secondary-fixed": "#93f2f2",
        "inverse-surface": "#2e3132",
        "on-tertiary": "#ffffff",
        "inverse-on-surface": "#f0f1f2",
        "surface-tint": "#435b9f",
        "inverse-primary": "#b3c5ff",
        "primary-container": "#002366",
        "tertiary": "#240f00",
        "surface-bright": "#f8f9fa",
        "on-surface": "#191c1d",
        "tertiary-container": "#422000",
        "surface": "#f8f9fa",
        "surface-container": "#edeeef",
        "on-secondary-container": "#006e6e",
        "background": "#f8f9fa",
        "on-primary-container": "#758dd5",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e1e3e4",
        "outline-variant": "#c5c6d2",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "on-secondary-fixed": "#002020",
        "tertiary-fixed-dim": "#ffb77d",
        "primary": "#00113a",
        "surface-variant": "#e1e3e4",
        "on-surface-variant": "#444650",
        "on-secondary-fixed-variant": "#004f4f",
        "surface-container-low": "#f3f4f5",
        "primary-fixed": "#dbe1ff",
        "surface-dim": "#d9dadb",
        "on-primary-fixed-variant": "#2a4386",
        "secondary-container": "#90efef",
        "error": "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "primary-fixed-dim": "#b3c5ff",
        "on-tertiary-fixed": "#2f1500"
      },
      fontFamily: {
        "headline": ["Manrope"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [forms, containerQueries],
}
