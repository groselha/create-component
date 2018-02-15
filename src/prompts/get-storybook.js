const promptly = require('promptly')

const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = async ({ defaults }) => {
  return await promptly.confirm(label('And are you using storybook?', bool(defaults)), {
    default: bool.toString(defaults),
  })
}
