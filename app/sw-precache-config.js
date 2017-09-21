var packageJson = require('./package.json');

module.exports = {
  cacheId: packageJson.name,
  staticFileGlobs: [
    'assets/img/loadingAngular.gif',
    'assets/img/pwa-loading.gif',
    'assets/img/404.png',
    'assets/img/browntape_logo.png',
    'index.html',
    'manifest.json',
    'build/**.js',
    'build/**.css'
  ],
  navigateFallback: 'index.html',
  runtimeCaching: [
    {
      urlPattern: 'assets/**/**.*',
      handler: "networkFirst",
      options: {
        cache: {
          name: 'asset_cache',
        }
      }
    },
    {
      urlPattern: 'api/(.*)',
      handler: "networkFirst",
      options: {
        cache: {
          name: 'api_cache'
        }
      }
    }
  ],
  verbose: true
};
