const { white } = require('chalk');

module.exports = (defaultValue, options) => (
  options.map(value => value === defaultValue ? white(value.toUpperCase()) : value).join('/')
);
