const { bold, gray } = require('chalk')

module.exports = (question, defaults) => {
  const extra = defaults ? ` (${defaults})` : ''
  return `${bold(question)}${gray(extra)}`
}
