const promptly = require('promptly')

const changeCase = require('../utils/change-case')
const label = require('../utils/label')

const validator = value => {
  if (value.length < 2) {
    throw new Error('Min length of 2')
  }
  return changeCase(value, 'pascalCase')
}

module.exports = async ({ componentName }) => {
  const defaultValue = changeCase(componentName, 'pascalCase')

  if (componentName) {
    return defaultValue
  }

  return await promptly.prompt(label('Component Name:', defaultValue), {
    validator,
    default: defaultValue,
  })
}
