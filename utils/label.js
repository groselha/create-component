const { bold, dim } = require('chalk')

module.exports = (question, defaults) => {
  const extra = defaults ? ` (${defaults}${dim(')')}` : ''
  return `${bold(question)}${dim(extra)}`
}
