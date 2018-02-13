const promptly = require('promptly');

const label = require('./label');
const choices = require('./choices');

const options = ['n', 'css', 'scss', 'sass', 'less'];

module.exports = async (defaultValue) => {
  const acceptedDefault = defaultValue || 'n';
  const css = await promptly.choose(
    label('Do you need some style?',
    choices(acceptedDefault, options)
  ), options, {
    default: acceptedDefault
  });

  return css === 'n' ? false : css;
}
