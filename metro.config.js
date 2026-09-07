const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Allow importing .pdf files via require()
config.resolver.assetExts.push("pdf");

module.exports = withNativeWind(config, { input: "./global.css" });
