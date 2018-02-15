const path = require('path')
const cosmiconfig = require('cosmiconfig')
const merge = require('merge')
const argv = require('minimist')(process.argv.slice(2))

const defaultConfig = require('./default-config')
const changeCase = require('../utils/change-case')

const explorer = cosmiconfig('component')

module.exports = async () => {
  let config = defaultConfig

  try {
    const result = await explorer.load()
    if (result && result.config) {
      config = merge.recursive(defaultConfig, result.config)
    }
  } catch (err) {}

  const componentName = argv._.length ? changeCase(argv._[0], 'pascalCase') : undefined
  const fileKeys = ['test', 'enzyme', 'css', 'storybook', 'readme', 'package']
  const argvConfig = Object.keys(argv).reduce((obj, key) => {
    if (key === '_') {
      return obj
    } else if (!fileKeys.includes(key)) {
      return { ...obj, [changeCase(key, 'camelCase')]: argv[key] }
    }

    return {
      ...obj,
      [key]: {
        skip: true,
        defaults: argv[key],
      },
    }
  }, {})

  return merge.recursive(config, argvConfig, { componentName })
}
