// copy this file into node_modules/@ionic/app-scripts/config/copy.config.js to disable copy of service-worker.js
// from src folder into build and skip generation of sw-toolbox.js into build folder as these files are now generated
// at the end of the cordova build process (Cyrus)

// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
    dest: '{{BUILD}}'
  }
}