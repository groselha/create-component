const { dim, reset } = require('chalk')

module.exports = (defaultValue, options) =>
  options
    .map(value => (value === defaultValue ? reset(value.toUpperCase()) : dim(value)))
    .join(dim('/'))
