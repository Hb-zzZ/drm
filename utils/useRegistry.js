const { getAllRegistries } = require('./registriesLib.js')
const listRegistries = require('../utils/listRegistries.js')
const { execCmd, getTip, printMsg } = require('./tools.js')
const { Yarn, Npm } = require('../static/config.js')

function useRegistry(name, type) {
  const allRegistries = getAllRegistries()

  if (allRegistries.hasOwnProperty(name)) {
    const { registry } = allRegistries[name]
    let shells = []

    if (type) {
      switch (type) {
        case 'yarn':
        case 'Y':
          shells.push(`${Yarn.set} ${registry}`)
          break
        case 'npm':
        case 'N':
          shells.push(`${Npm.set} ${registry}`)
          break
      }
    } else {
      shells = [`${Yarn.set} ${registry}`, `${Npm.set} ${registry}`]
    }

    if (shells.length > 0) {
      execCmd(shells, (results) => {
        const errResult = results
          .filter((result) => result.error)
          .map((result) => result.stderr)

        if (errResult.length === 2) {
          printMsg(results)
        } else {
          if (errResult.length > 0) {
            printMsg(results)
          }

          listRegistries(false)
        }
      })
    } else {
      printMsg(getTip('notFoundType', { type }))
    }
  } else {
    printMsg(getTip('notFound', { name }))
  }
}

module.exports = useRegistry
