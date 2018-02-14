const path = require('path')
const cosmiconfig = require('cosmiconfig')
const merge = require('merge')

const defaultConfig = require('./default-config')

const explorer = cosmiconfig('reactcomponent')

module.exports = async argv => {
  let config = defaultConfig

  try {
    const result = await explorer.load()
    if (result && result.config) {
      config = merge.recursive(defaultConfig, result.config)
    }
  } catch (err) {}

  const argvConfig = Object.keys(argv).reduce(
    (obj, key) => ({
      ...obj,
      [key]: {
        skip: true,
        defaults: argv[key],
      },
    }),
    {}
  )

  return merge.recursive(config, argvConfig)
}
