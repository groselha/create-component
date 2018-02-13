const path = require('path');
const cosmiconfig = require('cosmiconfig');
const merge = require('merge');

const defaultConfig = require('./default-config');

const explorer = cosmiconfig('component');

module.exports = async () => {
  let config = defaultConfig;

  try {
    const result = await explorer.load();
    if (result && result.config) {
      config = merge(defaultConfig, result.config);
    }
  } catch(err) {}

  return config;
}
