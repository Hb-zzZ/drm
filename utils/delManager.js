const { getTip, printMsg, exitCmd } = require('./tools.js')
const {
  getUserManagers,
  getUserShorthand,
  writeManagerToUser,
} = require('./registriesLib.js')

module.exports = (manager) => {
  const userManagers = getUserManagers()
  const userShorthand = getUserShorthand()

  if (!userManagers.hasOwnProperty(manager)) {
    printMsg(getTip('customManager', { manager }))
    return
  }

  delete userManagers[manager]

  // delete manager shorthandMap
  for (const shorthand in userShorthand) {
    if (userShorthand[shorthand] === manager) {
      delete userShorthand[shorthand]
      break
    }
  }

  writeManagerToUser(userManagers, userShorthand, (err) => {
    if (err) {
      exitCmd(err)
    } else {
      printMsg(getTip('delManager', { name: manager }))
    }
  })
}
