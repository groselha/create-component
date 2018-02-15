const { dim, reset } = require('chalk')

function bool(defaultValue = true) {
  const yes = defaultValue ? reset('Y') : dim('y')
  const no = !defaultValue ? reset('N') : dim('n')
  return `${yes}${dim('/')}${no}`
}

bool.toString = (defaultValue = true) => (defaultValue ? 'y' : 'n')

module.exports = bool
