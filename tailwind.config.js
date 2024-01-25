/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      width: {
        15: "3.75rem",
      },
      height: {
        15: "3.75rem",
      },
      colors: {
        primary: {
          10: "#7070c2",
          20: "#dedeed",
          30: "#2b2b6e",
          40: "#bdbddb",
          50: "#9c9cc9",
          60: "#f2f2f8",
          70: "#FF8A7C",
          80: "#FFB4AA",
          90: "#FFDAD5",
          100: "#FAFDFD",
        },
        secondary: {
          10: "#febe34",
          20: "#0002AB",
          30: "#060DEA",
          40: "#333DFE",
          50: "#5964FF",
          60: "#7B85FF",
          70: "#9DA3FF",
          80: "#BEC2FF",
          90: "#E0E0FF",
        },
        tertiary: {
          10: "#261900",
          20: "#402D00",
          30: "#5C4200",
          40: "#7A5900",
          50: "#997000",
          60: "#B98900",
          70: "#DAA200",
          80: "#FBBC1E",
          90: "#FFDEA2",
        },
        gray: {
          10: "#E0E3E3",
          20: "#C4C7C7",
          30: "#A9ACAC",
          40: "#8E9192",
        },
        dark: "#0d1117",
        error: "#E53E3E",
        success: "#27AE60",
        warning: "#FFCB3D",
        info: "#72C8CC",
        surface: {
          DEFAULT: "#F8FAFA",
          light: "#3F484A",
        },
        onsurface: "#191C1D",
        surfacecontainer: "#ECEEEE",
      },
      boxShadow: {
        DEFAULT:
          "0px 1px 3px 1px rgba(33, 1, 1, 0.15), 0px 1px 2px 0px rgba(33, 1, 1, 0.30)",
        "elevation-1":
          "0px 1px 3px 1px rgba(33, 1, 1, 0.15), 0px 1px 2px 0px rgba(33, 1, 1, 0.30)",
        "elevation-2":
          "0px 2px 6px 2px rgba(19, 0, 0, 0.15), 0px 1px 2px 0px rgba(19, 0, 0, 0.30)",
        "elevation-3":
          "0px 2px 3px 0px rgba(19, 0, 0, 0.30), 0px 6px 10px 4px rgba(19, 0, 0, 0.15)",
        "elevation-4":
          "0px 2px 3px 0px rgba(19, 0, 0, 0.30), 0px 6px 10px 4px rgba(19, 0, 0, 0.15)",
        "elevation-5":
          "0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(33, 1, 1, 0.15)",
        inner:
          "0px 1px 3px 1px rgba(0, 0, 0, 0.15) inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.30) inset",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      aspectRatio: {
        cover: "157 / 32",
        story: "9 / 16",
      },
    },
    fontFamily: {
      sans: ["var(--font-poppins)"],
      mplus: ["var(--font-mplus)"],
      poppins: ["var(--font-poppins)"],
    },
  },
  plugins: [],
};
