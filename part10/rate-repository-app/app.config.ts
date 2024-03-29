// https://docs.expo.dev/guides/typescript/#appconfigjs
import "dotenv/config";
import { type ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "rate-repository-app",
  slug: "rate-repository-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    // NOTE:
    // hermes does not support Intl.NumberFormat
    // https://github.com/facebook/hermes/issues/23#issuecomment-1253927200
    jsEngine: "jsc",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    env: process.env.NODE_ENV,
    apolloUri: process.env.APOLLO_URI,
    restUri: process.env.REST_URI,
  },
};

export default config;
