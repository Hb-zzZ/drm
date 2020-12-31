#!/usr/bin/env node

const cmd = require('commander')
const PKG = require('../package.json')

const listRegistries = require('../utils/listRegistries')
const useRegistry = require('../utils/useRegistry')
const addRegistry = require('../utils/addRegistry')
const delRegistry = require('../utils/delRegistry')
const testRegistries = require('../utils/testRegistries')
const addManager = require('../utils/addManager')
const delManager = require('../utils/delManager')

cmd.version(PKG.version)

cmd
  .command('list')
  .alias('ls')
  .description('List all the registries')
  .action(() => listRegistries())

cmd
  .command('use <name> [manager]')
  .description('Change registry to target registry')
  .action(useRegistry)

cmd
  .command('add <name> <registry>')
  .description('Add new custom registry')
  .action(addRegistry)

cmd
  .command('del <name>')
  .description('Delete the custom registry')
  .action(delRegistry)

cmd
  .command('test [name]')
  .description('Show response time for specific or all registries')
  .action(testRegistries)

cmd
  .command(
    'add-manager <manager> <getRegistry> <setRegistry> [defaultRegistry] [shorthand]'
  )
  .description('Add new custom manager')
  .action(addManager)

cmd
  .command('del-manager <manager>')
  .description('Delete the custom manager')
  .action(delManager)

cmd
  .command('help')
  .description('Print out for help')
  .action(() => cmd.outputHelp())

cmd.parse(process.argv)

// the above cmd is not executed
if (process.argv.length === 2) {
  cmd.outputHelp()
}
