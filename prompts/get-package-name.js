const promptly = require('promptly')
const paramCase = require('param-case')

const label = require('../utils/label')

module.exports = async (config, { componentName, packageJSON }) => {
  const packageName = typeof packageJSON === 'string' ? packageJSON : paramCase(componentName)
  const defaultValue = config.scope ? `@${config.scope}/${packageName}` : packageName

  return await promptly.prompt(label("And what's the package name?", defaultValue), {
    default: defaultValue,
  })
}
