const {
  exitCmd,
  getTip,
  printMsg,
  getUniformRegistry,
  validateRegistry,
} = require('./tools.js')
const { getUserRegistries, writeRegistryToUser } = require('./registriesLib.js')

function addRegistry(name, registry) {
  const userRegistries = getUserRegistries()

  if (userRegistries.hasOwnProperty(name)) {
    // already existed
    printMsg(getTip('hasRegistry', { name }))
  } else if (!validateRegistry(registry)) {
    // incorrect format
    printMsg(getTip('registryRule'))
  } else {
    const config = {
      registry: getUniformRegistry(registry),
    }
    userRegistries[name] = config

    writeRegistryToUser(userRegistries, (err) => {
      if (err) {
        exitCmd(err)
      } else {
        printMsg(getTip('addRegistry', { name }))
      }
    })
  }
}

module.exports = addRegistry
