module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/**/*.{woff,woff2,wtf,ott}',
    'build/**/*.png',
    'build/**/*.jpg',
    'build/**/*.mp3',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js'
};
