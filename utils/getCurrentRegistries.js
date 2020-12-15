const { Yarn, Npm } = require('../static/config.js')
const { execCmd, exitCmd, printMsg, getUniformRegistry } = require('./tools.js')

function getCurrentRegistries(cb) {
  execCmd([Yarn.get, Npm.get], ([YarnResult, NpmResult]) => {
    // error handle
    if (YarnResult.error && NpmResult.error) {
      return exitCmd([stderrN, stderrY])
    } else if (YarnResult.error) {
      printMsg(YarnResult.stderr)
    } else if (NpmResult.error) {
      printMsg(NpmResult.stderr)
    }

    cb({
      Yarn: getUniformRegistry(YarnResult.stdout),
      Npm: getUniformRegistry(NpmResult.stdout),
    })
  })
}

module.exports = getCurrentRegistries
