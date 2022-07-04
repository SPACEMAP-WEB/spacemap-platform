const webpack = require('webpack')
const CopywebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const envrc = require('./.env.config.json')
const env = envrc[process.env.SPACEMAP_NODE_ENV]
console.log(envrc)
console.log(env)

const nextConfig = {
  reactStrictMode: false,
  env: {
    SPACEMAP_PLATFORM_API_URI: env.SPACEMAP_PLATFORM_API_URI,
  },
  webpack: (config) => {
    config.plugins.push(
      new CopywebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Workers'),
            to: '../public/cesium/Workers',
          },
          {
            from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/ThirdParty'),
            to: '../public/cesium/ThirdParty',
          },
          {
            from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Assets'),
            to: '../public/cesium/Assets',
          },
          {
            from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Widgets'),
            to: '../public/cesium/Widgets',
          },
        ],
      })
    )
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('/cesium'),
      })
    )
    return config
  },
}

module.exports = nextConfig
