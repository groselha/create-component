const promptly = require('promptly')

const label = require('../utils/label')
const choices = require('../utils/choices')

const options = ['n', 'css', 'scss', 'sass', 'less']

module.exports = async ({ defaults }) => {
  const acceptedDefault = defaults || 'n'
  const css = await promptly.choose(
    label('Do you need some style?', choices(acceptedDefault, options)),
    options,
    {
      default: acceptedDefault,
    }
  )

  return css === 'n' ? false : css
}
