const promptly = require('promptly');

const label = require('./label');
const bool = require('./bool');

module.exports = async (defaultValue) => {
  return await promptly.confirm(label('And a README.md file?', bool(defaultValue)), {
    default: bool.toString(defaultValue)
  });
}
