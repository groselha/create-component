const path = require('path')
const promptly = require('promptly')
const argv = require('minimist')(process.argv.slice(2))
const { red } = require('chalk')

const copy = require('./copy')
const getConfig = require('./config/get-config')
const getName = require('./prompts/get-name')
const getTest = require('./prompts/get-test')
const getEnzyme = require('./prompts/get-enzyme')
const getCSS = require('./prompts/get-css')
const getReadme = require('./prompts/get-readme')
const getStorybook = require('./prompts/get-storybook')
const getPackageName = require('./prompts/get-package-name')
const getPackageJSON = require('./prompts/get-package-json')
const skippable = require('./utils/skippable')

const init = async () => {
  const config = await getConfig(argv)
  const fields = {}

  try {
    fields.componentName = await getName()
    fields.packageJSON = await skippable(config.package)(getPackageJSON)
    fields.packageName = await skippable(config.package, {
      prevent: fields.packageJSON,
    })(getPackageName, fields)
    fields.test = await skippable(config.test)(getTest)
    fields.enzyme = await skippable(config.enzyme, {
      skip: !fields.test,
    })(getEnzyme)
    fields.css = await skippable(config.css)(getCSS)
    fields.storybook = await skippable(config.storybook)(getStorybook)
    fields.readme = await skippable(config.readme)(getReadme)
  } catch (e) {
    console.log(red('\n× Cancelled by user.'))
  }

  try {
    await copy(fields, config)
  } catch (err) {
    console.log(err.stack)
  }
}

init()
