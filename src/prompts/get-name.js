const promptly = require('promptly')

const changeCase = require('../utils/change-case')
const label = require('../utils/label')

const validator = value => {
  if (value.length < 2) {
    throw new Error('Min length of 2')
  }
  return changeCase(value, 'pascal')
}

module.exports = ({ componentName }) => {
  const defaultValue = changeCase(componentName, 'pascal')

  if (componentName) {
    return defaultValue
  }

  return promptly.prompt(label('Component Name:', defaultValue), {
    validator,
    default: defaultValue,
  })
}
