#! /usr/bin/env node

const ora = require('ora')
const cosmiconfig = require('cosmiconfig')
const merge = require('merge')
const chalk = require('chalk')
const pkg = require('../package.json')
const init = require('../lib')

console.log(chalk.green.bold('Create React components through the CLI'))

const explorer = cosmiconfig('component')
const defaultConfig = require('../default-config')

const spinner = ora('Looking for .componentrc...').start()
const allowedCases = ['pascal', 'param', 'camel', 'snake']
const allowedCSS = ['css', 'scss', 'sass', 'less', false, true]

const parseValue = function(val) {
  if (val === undefined) {
    return {}
  }
  return { skip: true, defaults: val }
}

const parseCSS = function(val) {
  if (val === undefined) {
    return {}
  }
  if (!allowedCSS.includes(val)) {
    throw new Error(`--css flag must be one of the following: ${allowedCSS.join(', ')}`)
  }
  return { skip: true, defaults: typeof val === 'boolean' && val ? 'css' : val }
}

explorer
  .load()
  .then(userConfig => {
    spinner.stop()

    const baseConfig = merge.recursive(defaultConfig, userConfig ? userConfig.config : {})
    const argv = require('yargs')
      .version(pkg.version)
      .usage('Usage: $0 [ComponentName] [options]')
      .option('test', {
        describe: 'Create a test file',
        type: 'boolean',
        default: undefined,
        coerce: parseValue,
      })
      .option('enzyme', {
        describe: 'Use enzyme for your tests',
        type: 'boolean',
        default: undefined,
        coerce: parseValue,
      })
      .option('storybook', {
        describe: 'Create a storybook file',
        type: 'boolean',
        default: undefined,
        coerce: parseValue,
      })
      .option('readme', {
        describe: 'Create a README file',
        type: 'boolean',
        default: undefined,
        coerce: parseValue,
      })
      .option('package', {
        describe: 'Create a package.json file for your component',
        type: 'boolean',
        default: undefined,
        coerce: parseValue,
      })
      .option('css', {
        describe: 'Choose the CSS syntax if you need it',
        default: undefined,
        coerce: parseCSS,
      })
      .option('file-case', {
        describe: 'Choose how the file name should be converted to',
        choices: allowedCases,
        default: baseConfig.fileCase,
      })
      .option('folder-case', {
        describe: 'Choose how the component folder should be converted to',
        choices: allowedCases,
        default: baseConfig.folderCase,
      })
      .example(
        '$0 Button',
        'Will create a component based on the user configuration and will prompt user for missing ones'
      )
      .example(
        '$0 Button --no-css --no-package --test --storybook',
        'Will set default values to the flags and skip the prompts'
      ).argv

    const config = merge.recursive(baseConfig, argv, { componentName: argv._.join(' ') })

    init(config)
  })
  .catch(err => {
    spinner.stop()
    throw err
  })
