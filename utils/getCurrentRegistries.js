const { getAllManagers, toManagers } = require('./registriesLib.js')
const { execCmd, exitCmd } = require('./tools.js')

module.exports = (cb, manager) => {
  const allManagers = getAllManagers()
  let managersList = []

  if (!manager) {
    managersList = Object.keys(allManagers)
  } else {
    managersList = toManagers(manager)
  }

  const getRegistriesCmd = managersList.map((sign) => allManagers[sign].get)

  execCmd(getRegistriesCmd, (results) => {
    // error handle
    const errResults = results.filter((result) => result.error)
    if (errResults.length === getRegistriesCmd.length) {
      return exitCmd(errResults.map((err) => err.stderr))
    }

    cb(
      managersList.reduce((registries, sign, index) => {
        const result = results[index]

        if (!result.error) {
          registries[sign] = result.stdout
        }

        return registries
      }, {})
    )
  })
}
