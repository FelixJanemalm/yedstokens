const { filterTokensByType } = require("./fns");
const tokens = require("./output/css/default-light.json")

const colors = filterTokensByType('color', tokens)

module.exports = {
  content: [],
  theme: {
    colors,
  },
  variants: {},
  plugins: [],
}