const { exec } = require('child_process')
const tips = require('../static/tips.js')

// normal print
function printMsg(msg) {
  if (!Array.isArray(msg)) {
    msg = [msg]
  }
  msg.forEach(function (info) {
    console.log(info)
  })
}

// execute multiple commands
function execCmd(command = [], cb, result = []) {
  if (command.length > result.length) {
    exec(command[result.length], (error, stdout, stderr) => {
      result.push({ error, stdout: stdout.trim(), stderr })
      execCmd(command, cb, result)
    })
  } else {
    cb(result)
  }
}

// break off CMD
function exitCmd(msg) {
  if (msg) {
    printMsg(msg)
  }
  process.exit(1)
}

function validateRegistry(registry = '') {
  return /^http(s)?\:\/\//.test(registry)
}

function getUniformRegistry(registry = '') {
  if (registry[registry.length - 1] !== '/') {
    return registry + '/'
  } else {
    return registry
  }
}

function stringRender(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => context[key.trim()])
}

function getTip(code, context = {}) {
  return stringRender(tips[code] || '', context)
}

module.exports = {
  printMsg,
  execCmd,
  exitCmd,
  getUniformRegistry,
  stringRender,
  getTip,
  validateRegistry,
}
