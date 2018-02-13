const promptly = require('promptly');

const label = require('./label');
const bool = require('./bool');

module.exports = async (defaultValue) => {
  return await promptly.confirm(label('And are you using storybook?', bool(defaultValue)), {
    default: bool.toString(defaultValue)
  });
}
