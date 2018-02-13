const { white } = require('chalk');

function bool(defaultValue = true) {
  const yes = defaultValue ? white('Y') : 'y';
  const no = !defaultValue ? white('N') : 'n';
  return `${yes}/${no}`;
}

bool.toString = (defaultValue) => defaultValue ? 'y' : 'n'

module.exports = bool;
