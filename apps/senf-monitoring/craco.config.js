const path = require("path");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
module.exports = {
  webpack: {
    configure: (config, { paths }) => {
      //overwrite build path
      /*  paths.appBuild = config.output.path = path.resolve(
        "../../dist/apps/senf-monitoring"
      ); */

      // Remove guard against importing modules outside of `src`.
      // Needed for workspace projects.
      config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
      );
      // Add support for importing workspace projects.
      config.resolve.plugins.push(
        new TsConfigPathsPlugin({
          configFile: path.resolve(__dirname, "tsconfig.json"),
          extensions: [".ts", ".tsx", ".js", ".jsx"],
          mainFields: ["module", "main"],
        })
      );

      // Replace include option for babel loader with exclude
      // so babel will handle workspace projects as well.
      config.module.rules[1].oneOf.forEach((r) => {
        if (r.loader && r.loader.indexOf("babel") !== -1) {
          r.exclude = /node_modules/;
          delete r.include;
        }
      });

      // import only 1 react per application to prevent react hooks error
      config.resolve.alias = {
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom"),
      };
      return config;
    },
  },
  jest: {
    configure: (config) => {
      config.resolver = "@nrwl/jest/plugins/resolver";
      return config;
    },
  },
};
