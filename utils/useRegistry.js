const {
  getAllRegistries,
  getAllManagers,
  toManagers,
} = require('./registriesLib.js')
const listRegistries = require('../utils/listRegistries.js')
const { execCmd, getTip, printMsg, stringRender } = require('./tools.js')

module.exports = (name, manager) => {
  const allRegistries = getAllRegistries()

  if (allRegistries.hasOwnProperty(name)) {
    const { registry } = allRegistries[name]
    const allManagers = getAllManagers()
    let managersList = []

    if (!manager) {
      managersList = Object.keys(allManagers)
    } else {
      managersList = toManagers(manager)
    }

    const shells = managersList.map((sign) =>
      stringRender(allManagers[sign].set, { registry })
    )
    execCmd(shells, (results) => {
      const errResult = results.filter((result) => result.error)

      if (errResult.length === shells.length) {
        printMsg(errResult.map((result) => result.stderr))
      } else {
        listRegistries(
          ({ name: showName, prefix, registry: showRegistry, managers }) => {
            if (managersList.some((sign) => managers.includes(sign))) {
              return `${prefix}${showName} --- ${showRegistry}`
            } else {
              return null
            }
          }
        )
      }
    })
  } else {
    printMsg(getTip('notFound', { name }))
  }
}
