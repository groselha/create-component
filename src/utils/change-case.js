const changeCase = require('change-case')

module.exports = (value, type) => {
  const method = changeCase.camelCase(`${type} case`)
  if (changeCase[method] && typeof changeCase[method] === 'function') {
    return changeCase[method](value)
  }
  throw new Error(`Invalid case style: ${type}`)
}
