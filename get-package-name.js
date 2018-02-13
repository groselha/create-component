const promptly = require('promptly');

const label = require('./label');

module.exports = async (defaultValue, packageJSON) => {
  if (packageJSON) {
    return await promptly.prompt(
      label('And what\'s the package name?', defaultValue)
    , { default: defaultValue });
  }

  return defaultValue;
}
