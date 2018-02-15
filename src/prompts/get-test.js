const promptly = require('promptly')

const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = async ({ defaults }) => {
  return await promptly.confirm(label('Are you going to test it?', bool(defaults)), {
    default: bool.toString(defaults),
  })
}
