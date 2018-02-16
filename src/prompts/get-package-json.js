const promptly = require('promptly')

const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = ({ defaults }) => {
  return promptly.confirm(label('Does it need its own package.json?', bool(defaults)), {
    default: bool.toString(defaults),
  })
}
