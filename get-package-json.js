const promptly = require('promptly');

const label = require('./label');
const bool = require('./bool');

module.exports = async (defaultValue) => {
  return await promptly.confirm(label('Does it need its own package.json?', bool(defaultValue)), {
    default: bool.toString(defaultValue)
  });
}
