const webpack = require('webpack')
const CopywebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const cesiumSource = 'node_modules/cesium/Source'
const cesiumWorkers = '../Build/Cesium/Workers'

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CopywebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
          { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
          { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
        ],
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      })
    )
    return config
  },
}

module.exports = nextConfig
