const fs = require('fs')
const path = require('path')
const os = require('os')
const ini = require('ini')
// user-defined path
const HOME = os.homedir()
const DRMRC = path.join(HOME, '.drmrc')

const registries = require('../static/registries.json')

// get user-defined registries
function getUserRegistries() {
  return (
    (fs.existsSync(DRMRC) && {
      ...ini.parse(fs.readFileSync(DRMRC, 'utf-8')),
    }) ||
    {}
  )
}

// get all registries(user and registries.json)
function getAllRegistries() {
  return { ...registries, ...getUserRegistries() }
}

// write user-defined registry
function writeRegistryToUser(config, cbk) {
  fs.writeFile(DRMRC, ini.stringify(config), cbk)
}

module.exports = {
  getUserRegistries,
  getAllRegistries,
  writeRegistryToUser,
}
