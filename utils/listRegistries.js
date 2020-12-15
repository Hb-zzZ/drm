const getCurrentRegistries = require('./getCurrentRegistries.js')
const { getAllRegistries } = require('./registriesLib.js')

const { getUniformRegistry, printMsg } = require('./tools.js')

function listRegistries(showAll = true, customShow = false) {
  getCurrentRegistries(({ Yarn, Npm }) => {
    const allRegistries = getAllRegistries()

    const msgList = Object.keys(allRegistries)
      .map((name) => {
        const { registry = '' } = allRegistries[name] || {}

        const uniformRegistry = getUniformRegistry(registry)

        let prefix = '   '
        if (uniformRegistry === Yarn && uniformRegistry === Npm) {
          prefix = ' * '
        } else if (uniformRegistry === Yarn) {
          prefix = ' Y '
        } else if (uniformRegistry === Npm) {
          prefix = ' N '
        }

        if (showAll || prefix !== '   ') {
          if (customShow) {
            return customShow({ prefix, name, registry })
          } else {
            return `${prefix}${name} --- ${registry}`
          }
        } else {
          return null
        }
      })
      .filter(Boolean)

    printMsg(msgList)
  })
}

module.exports = listRegistries
