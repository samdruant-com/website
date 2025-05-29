import type { Config } from "tailwindcss";
import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import DaisyUi from "daisyui";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],

  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        primary: "#A4AFFD",
        secondary: "#92D09A"
      },
      height: {
        "vh-80": "80vh",
        "vh-90": "90vh"
      },
      width: {
        "vw-70": "70vw",
        "vw-80": "80vw",
        "vw-90": "90vw"
      }
    }
  },

  plugins: [
    iconsPlugin({ collections: getIconCollections(["mdi"]) }),
    DaisyUi
  ],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "dark", // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    // styled: true, // include daisyUI colors and design decisions for all components
    // utils: true, // adds responsive and modifier utility classes
    // prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false // Shows info about daisyUI version and used config in the console when building your CSS
    // themeRoot: ":root", // The element that receives theme color CSS variables
  }
} satisfies Config;
