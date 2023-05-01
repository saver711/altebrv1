/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        mainGreen: "#295E56",
        green: "#93aeaa",
        lightGreen: "#E9EDEC",
        mainBlack: "#303030",
        lightBlack: "#565656",

        mainOrange: "#db8028",
        mainRed: "#B31717",
        lightGray: "#e9eeed",
        flatWhite: "#F8F9FB",
        mainGray: "#DEE1E5",
      },
      gridTemplateColumns: {
        view: "max-content 1fr",
      },
      gridTemplateRows: {
        view: "max-content 1fr max-content",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-rtl"),
    require("tailwind-scrollbar"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
}
//   plugins: [...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})],
