const { getTip, printMsg, exitCmd } = require('./tools.js')
const getCurrentRegistries = require('./getCurrentRegistries.js')
const { getUserRegistries, writeRegistryToUser } = require('./registriesLib.js')
const useRegistry = require('./useRegistry.js')

function delRegistry(name) {
  const userRegistries = getUserRegistries()

  if (!userRegistries.hasOwnProperty(name)) {
    printMsg(getTip('customRegistry', { name }))
    return
  }

  getCurrentRegistries(({ Yarn, Npm }) => {
    const delRegistry = userRegistries[name].registry

    // when deleting the registry being used
    if (delRegistry === Yarn) {
      useRegistry('yarn', 'yarn')
    } else if (delRegistry === Npm) {
      useRegistry('npm', 'npm')
    }

    delete userRegistries[name]

    writeRegistryToUser(userRegistries, (err) => {
      if (err) {
        exitCmd(err)
      } else {
        printMsg(getTip('delRegistry', { name }))
      }
    })
  })
}

module.exports = delRegistry
