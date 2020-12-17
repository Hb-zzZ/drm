const async = require('async')
const request = require('request')

const listRegistries = require('../utils/listRegistries.js')
const { getAllRegistries } = require('./registriesLib.js')
const { getTip } = require('./tools.js')

module.exports = (name) => {
  const allRegistries = getAllRegistries()

  let toTest

  if (name) {
    if (!allRegistries.hasOwnProperty(name)) {
      getTip('notFound', { name })
      return
    } else {
      toTest = { [name]: allRegistries[name] }
    }
  } else {
    toTest = allRegistries
  }

  async.map(
    Object.keys(toTest),
    function (name, cbk) {
      const { registry } = toTest[name]
      const start = +new Date()
      request(registry + 'pedding', function (error) {
        cbk(null, {
          name: name,
          registry: registry,
          time: +new Date() - start,
          error: error ? true : false,
        })
      })
    },
    function (err, results) {
      const resultsObj = results.reduce((obj, item) => {
        obj[item.name] = item
        return obj
      }, {})

      listRegistries(({ name, prefix }) => {
        if (Object.keys(resultsObj).includes(name)) {
          const result = resultsObj[name]
          const suffix = result.error ? 'Fetch Error' : result.time + 'ms'

          return `${prefix}${name} --- ${suffix}`
        } else {
          return null
        }
      })
    }
  )
}
