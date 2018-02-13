const promptly = require('promptly');
const pascalCase = require('pascal-case');

const label = require('./label');

const validator = (value) => {
  if (value.length < 2) {
    throw new Error('Min length of 2');
  }
  return pascalCase(value);
}

module.exports = async () => {
  return await promptly.prompt(label('Component Name:'), { validator });
}
