const changeCase = require('change-case')

module.exports = (value, type) => {
  if (changeCase[type] && typeof changeCase[type] === 'function') {
    return changeCase[type](value)
  }
  throw new Error(`Invalid case style: ${type}`)
}
