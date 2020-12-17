const getCurrentRegistries = require('./getCurrentRegistries.js')
const { getAllRegistries } = require('./registriesLib.js')

const { printMsg } = require('./tools.js')

module.exports = (customShow = false) => {
  getCurrentRegistries((currentMap) => {
    const allRegistries = getAllRegistries()

    const registriesList = Object.keys(allRegistries).map((name) => {
      const { registry = '' } = allRegistries[name] || {}

      const managers = []
      for (const manager in currentMap) {
        const managerRegistry = currentMap[manager]

        if (managerRegistry === registry) {
          managers.push(manager)
        }
      }

      return { managers, registry, name }
    })

    // prefix maxLength
    const maxLen = registriesList.reduce((maxLen, item) => {
      if (maxLen < item.managers.toString().length + 4) {
        return item.managers.toString().length + 4
      } else {
        return maxLen
      }
    }, 4)

    const msgList = registriesList
      .map((data) => {
        if (data.managers.length === 0) {
          data.prefix = Array(maxLen).fill(' ').join('')
        } else {
          const temp = ` [${data.managers.toString()}] `
          const placeholder = Array(maxLen - temp.length)
            .fill(' ')
            .join('')
          data.prefix = placeholder + temp
        }

        if (customShow) {
          return customShow(data)
        } else {
          return `${data.prefix}${data.name} --- ${data.registry}`
        }
      })
      .filter(Boolean)

    printMsg(msgList)
  })
}
