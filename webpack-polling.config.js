// Alternative webpack configuration that uses polling instead of file watching
// This can help avoid inotify watch limit issues
// Use by setting environment variable: NEXT_WEBPACK_CONFIG=webpack-polling.config.js

module.exports = (config, options) => {
  // Use polling instead of native file watcher
  if (options.dev) {
    config.watchOptions = {
      ...config.watchOptions,
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay rebuild
      ignored: [
        '**/node_modules/**',
        '**/.yarn/cache/**',
        '**/.git/**',
        '**/.next/**',
      ],
    }
  }

  return config
}