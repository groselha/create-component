require('@babel/polyfill')

const { red, green } = require('chalk')

const createFiles = require('./file/create-files')
const getConfig = require('./config/get-config')
const getName = require('./prompts/get-name')
const getTest = require('./prompts/get-test')
const getEnzyme = require('./prompts/get-enzyme')
const getCSS = require('./prompts/get-css')
const getReadme = require('./prompts/get-readme')
const getStorybook = require('./prompts/get-storybook')
const getPackageName = require('./prompts/get-package-name')
const getPackageJSON = require('./prompts/get-package-json')
const getOutput = require('./prompts/get-output')
const skippable = require('./utils/skippable')
const changeCase = require('./utils/change-case')

module.exports = async () => {
  const config = await getConfig()
  const fields = {}
  let output

  try {
    fields.componentName = await getName(config)
    fields.packageJSON = await skippable(config.package, {
      skip: Boolean(config.parent),
      defaults: config.parent ? false : undefined,
    })(getPackageJSON)
    fields.packageName = await skippable(config.package, {
      prevent: fields.packageJSON,
      skip: !fields.packageJSON || config.parent,
    })(getPackageName, fields)
    fields.fileName = changeCase(fields.componentName, config.fileCase)
    fields.test = await skippable(config.test)(getTest)
    fields.enzyme = await skippable(config.enzyme, {
      skip: !fields.test,
    })(getEnzyme)
    fields.css = await skippable(config.css)(getCSS)
    fields.storybook = await skippable(config.storybook)(getStorybook)
    fields.readme = await skippable(config.readme)(getReadme)

    output = await getOutput(fields, config)
  } catch (err) {
    if (err.message === 'canceled') {
      console.log(red('\n× Cancelled by user.'))
      process.exit(0)
    } else {
      throw err
    }
  }

  try {
    await createFiles(fields, config, output)
    console.log(green(`\n⚡ File created successfuly!`))
    process.exit(0)
  } catch (err) {
    console.log(red('\n× Something went wrong :('))
    throw err
  }
}
