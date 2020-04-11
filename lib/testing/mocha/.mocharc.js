const getTargets = function () {
  const testTypeWildcard = process.env.MOCHA_FAST_ONLY ? '(spec)' : '(spec|slow)'
  return [ `./dist/src/*/tests/**/*\.@${testTypeWildcard}.js` ]
}

module.exports = {
  timeout: Boolean(process.env.NODE_DEBUG) ? 36000000 : 60000,
  extension: 'js',
  spec: [
    __dirname + '/bootstrap-test.js',
    getTargets()
  ]
}