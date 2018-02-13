const promptly = require('promptly');

const label = require('./label');
const bool = require('./bool');

module.exports = async (defaultValue, test) => {
  if (test) {
    return await promptly.confirm(label('With enzyme, maybe?', bool(defaultValue)), {
      default: bool.toString(defaultValue)
    });
  }
  return false;
}
