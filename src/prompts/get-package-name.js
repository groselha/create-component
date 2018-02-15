const promptly = require('promptly')
const { paramCase } = require('change-case')

const label = require('../utils/label')

module.exports = (config, { componentName, packageJSON }) => {
  const packageName = typeof packageJSON === 'string' ? packageJSON : paramCase(componentName)
  const defaultValue = config.scope ? `@${config.scope}/${packageName}` : packageName

  return promptly.prompt(label("And what's the package name?", defaultValue), {
    default: defaultValue,
  })
}
