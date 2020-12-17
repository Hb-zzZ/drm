const {
  exitCmd,
  getTip,
  printMsg,
  getUniformRegistry,
  validateRegistry,
} = require('./tools.js')
const {
  getAllRegistries,
  getUserRegistries,
  writeRegistryToUser,
} = require('./registriesLib.js')

module.exports = (name, registry) => {
  const allRegistries = getAllRegistries()
  const userRegistries = getUserRegistries()

  if (allRegistries.hasOwnProperty(name)) {
    // already existed
    printMsg(getTip('hasRegistry', { name }))
  } else if (!validateRegistry(registry)) {
    // incorrect format
    printMsg(getTip('registryRule'))
  } else {
    userRegistries[name] = {
      registry: getUniformRegistry(registry),
    }

    writeRegistryToUser(userRegistries, (err) => {
      if (err) {
        exitCmd(err)
      } else {
        printMsg(getTip('addRegistry', { name }))
      }
    })
  }
}
