const { dim, reset } = require('chalk')

function bool(defaultValue = true) {
  const yes = defaultValue ? reset('Y') : dim('y')
  const no = defaultValue ? dim('n') : reset('N')
  return `${yes}${dim('/')}${no}`
}

bool.toString = (defaultValue = true) => (defaultValue ? 'y' : 'n')

module.exports = bool
