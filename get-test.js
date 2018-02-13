const promptly = require('promptly');

const label = require('./label');
const bool = require('./bool');

module.exports = async (defaultValue) => {
  return await promptly.confirm(label('Are you going to test it?', bool(defaultValue)), {
    default: bool.toString(defaultValue)
  });
}
