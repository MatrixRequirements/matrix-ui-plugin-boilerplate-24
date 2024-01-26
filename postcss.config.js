/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require("postcss-import"),
    require("postcss-prefix-selector")({
      prefix: ".addon",
      transform: function (prefix, selector, prefixedSelector) {
        if (selector.startsWith("html") || selector.startsWith("body")) {
          return selector;
        }
        return prefixedSelector;
      },
    }),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};

module.exports = config;
