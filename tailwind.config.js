const { colors } = require("tailwindcss/defaultTheme");
module.exports = {
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.blue["300"]
    }
  },
  variants: {},
  plugins: []
};
