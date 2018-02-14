const promptly = require('promptly')

const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = async ({ defaults }) => {
  return await promptly.confirm(label('And a README.md file?', bool(defaults)), {
    default: bool.toString(defaults),
  })
}
