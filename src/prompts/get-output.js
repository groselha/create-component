const path = require('path')
const promptly = require('promptly')
const truncate = require('cli-truncate')
const { dim, yellow, underline } = require('chalk')

const changeCase = require('../utils/change-case')
const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = async (fields, config) => {
  const toFolderCase = val => changeCase(val, config.folderCase)
  const cwd = process.cwd()
  const filePath = toFolderCase(fields.componentName)
  const parents = config.parent ? config.parent.split('/').map(toFolderCase) : []
  const relativePath = path.join(config.path, ...parents, filePath)
  const printOutput = truncate(path.join(dim(cwd), relativePath), 40, {
    position: 'start',
  })
  const output = path.join(cwd, relativePath)

  console.log(yellow(`\n${fields.componentName} will be created at:`))
  console.log(`  ${underline(printOutput)}`)

  const confirm = await promptly.confirm(label('Happy with that?', bool()), {
    default: bool.toString(),
  })

  if (confirm) {
    return output
  }

  throw new Error('canceled')
}
