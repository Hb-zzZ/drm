const { exitCmd, getTip, printMsg } = require('./tools.js')
const {
  getAllManagers,
  getUserManagers,
  getAllShorthand,
  getUserShorthand,
  getAllRegistries,
  writeManagerToUser,
} = require('./registriesLib.js')

module.exports = (
  manager,
  getRegistry,
  setRegistry,
  defaultRegistry,
  shorthand
) => {
  const allManagers = getAllManagers()
  const userManagers = getUserManagers()
  const allShorthand = getAllShorthand()
  const userShorthand = getUserShorthand()
  const allRegistries = getAllRegistries()

  if (allManagers.hasOwnProperty(manager)) {
    // already existed
    printMsg(getTip('hasManager', { name: manager }))
  } else if (shorthand && allShorthand.hasOwnProperty(shorthand)) {
    printMsg(getTip('hasShorthand', { name: shorthand }))
  } else if (
    defaultRegistry &&
    !allRegistries.hasOwnProperty(defaultRegistry)
  ) {
    printMsg(getTip('notFoundDefaultRegistry', { name: defaultRegistry }))
  } else {
    userManagers[manager] = {
      defaultRegistry,
      get: getRegistry,
      set: setRegistry,
    }

    if (shorthand) {
      userShorthand[shorthand] = manager
    }

    writeManagerToUser(userManagers, userShorthand, (err) => {
      if (err) {
        exitCmd(err)
      } else {
        printMsg(getTip('addManager', { name: manager }))
      }
    })
  }
}
