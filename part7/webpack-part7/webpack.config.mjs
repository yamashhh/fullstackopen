import path from "path";
import { fileURLToPath } from "url";
// NOTE:
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import webpack from "webpack";

export default (env, argv) => {
  const backend_url =
    argv.mode === "production"
      ? "https://obscure-harbor-49797.herokuapp.com/api/notes"
      : "http://localhost:3001/notes";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    devServer: {
      static: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
  };
};
