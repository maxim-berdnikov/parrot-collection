const path = require("path")
const cracoAlias = require("craco-alias");

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  // webpack: {
  //   alias: {
  //     components: path.resolve(__dirname, "./src/Templates/Components"),
  //     assets: path.resolve(__dirname, "./src/Assets"),
  //     types: path.resolve(__dirname, "./src/Types"),
  //   },
  // },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json"
      }
    }
  ]
};
