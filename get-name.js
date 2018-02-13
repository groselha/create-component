const promptly = require('promptly');
const pascalCase = require('pascal-case');
const paramCase = require('param-case');

const label = require('./label');

const validator = (value) => {
  if (value.length < 2) {
    throw new Error('Min length of 2');
  }
  return {
    packageName: paramCase(value),
    componentName: pascalCase(value),
  }
}

module.exports = async () => {
  return await promptly.prompt(label('Component Name:'), { validator });
}
