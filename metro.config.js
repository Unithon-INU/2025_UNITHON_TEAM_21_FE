const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * Combines NativeWind support (global.css) and SVG transformer
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

// Custom metro settings for SVGs
const customConfig = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
    },
    resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};

// Merge default config with custom settings
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Export wrapped with NativeWind (global.css)
module.exports = withNativeWind(mergedConfig, {
    input: './global.css',
    inlineRem: 16,
});
