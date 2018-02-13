const promptly = require('promptly');

const label = require('./label');
const choices = require('./choices');

const options = ['no', 'css', 'scss', 'sass', 'less'];

module.exports = async (defaultValue = 'no') => {
  return await promptly.choose(
    label('Do you need some style?',
    choices(defaultValue, options)
  ), options, {
    default: defaultValue
  });
}
