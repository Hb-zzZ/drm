const { getTip, printMsg, exitCmd } = require('./tools.js')
const getCurrentRegistries = require('./getCurrentRegistries.js')
const {
  getUserRegistries,
  writeRegistryToUser,
  getAllManagers,
} = require('./registriesLib.js')
const useRegistry = require('./useRegistry.js')

module.exports = (name) => {
  const userRegistries = getUserRegistries()
  const allManagers = getAllManagers()

  if (!userRegistries.hasOwnProperty(name)) {
    printMsg(getTip('customRegistry', { name }))
    return
  }

  getCurrentRegistries((currentMap) => {
    const delRegistry = userRegistries[name].registry

    delete userRegistries[name]

    writeRegistryToUser(userRegistries, (err) => {
      if (err) {
        exitCmd(err)
      } else {
        printMsg(getTip('delRegistry', { name }))

        // when deleting the registry being used
        for (const manager in currentMap) {
          const managerRegistry = currentMap[manager]

          if (managerRegistry === delRegistry) {
            useRegistry(allManagers[manager].defaultRegistry || 'npm', manager)
          }
        }
      }
    })
  })
}
