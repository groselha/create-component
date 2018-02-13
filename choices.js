const { white } = require('chalk');

module.exports = (defaultValue, options) => (
  options.map(value => value === defaultValue ? white(value) : value).join('/')
);
