const { dim } = require('chalk')

module.exports = (defaultValue, options) =>
  options.map(value => (value === defaultValue ? dim(value.toUpperCase()) : value)).join('/')
