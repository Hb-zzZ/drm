const fs = require('fs')
const path = require('path')
const os = require('os')
const ini = require('ini')
// user-defined config path
const HOME = os.homedir()
const PTMRC = path.join(HOME, '.ptmrc')

const config = require('../static/config.js')
const registries = require('../static/registries.json')

const { exitCmd, getTip } = require('./tools.js')

// get user-defined config
function getUserConfig() {
  return (
    (fs.existsSync(PTMRC) && ini.parse(fs.readFileSync(PTMRC, 'utf-8'))) || {}
  )
}

function getUserRegistries() {
  const { registries = {} } = getUserConfig()

  return { ...registries }
}

function getUserShorthand() {
  const { shorthandMap = {} } = getUserConfig()

  return { ...shorthandMap }
}

function getUserManagers() {
  const { managers = {} } = getUserConfig()

  return { ...managers }
}

function getAllRegistries() {
  return { ...registries, ...getUserRegistries() }
}

function getAllManagers() {
  return { ...config.managers, ...getUserManagers() }
}

function getAllShorthand() {
  return { ...config.shorthandMap, ...getUserShorthand() }
}

function toManagers(data) {
  if (!Array.isArray(data)) {
    data = [data]
  }

  const allManagers = getAllManagers()
  const allShorthandMap = getAllShorthand()

  const getSign = (key) => {
    if (Object.keys(allManagers).includes(key)) {
      return key
    } else if (Object.keys(allShorthandMap).includes(key)) {
      return allShorthandMap[key]
    } else {
      exitCmd(getTip('notFoundManager', { manager: key }))
      return null
    }
  }

  return data.map((key) => getSign(key))
}

// write user-defined registry
function writeRegistryToUser(registries, cbk) {
  const config = getUserConfig()

  config['registries'] = registries

  fs.writeFile(PTMRC, ini.stringify(config), cbk)
}

// write user-defined manager
function writeManagerToUser(manager, shorthand, cbk) {
  const config = getUserConfig()

  config['managers'] = manager
  config['shorthandMap'] = shorthand

  fs.writeFile(PTMRC, ini.stringify(config), cbk)
}

module.exports = {
  getUserRegistries,
  getAllRegistries,
  writeRegistryToUser,
  getAllManagers,
  getAllShorthand,
  getUserManagers,
  getUserShorthand,
  toManagers,
  writeManagerToUser,
}
