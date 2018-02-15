const path = require('path')
const promptly = require('promptly')
const fixedWidth = require('fixed-width-string')
const { reset, dim, yellow, underline } = require('chalk')

const changeCase = require('../utils/change-case')
const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = async (fields, config) => {
  const toFolderCase = val => changeCase(val, config.folderCase)
  const cwd = process.cwd()
  const filePath = toFolderCase(fields.componentName)
  const parents = config.parent ? config.parent.split('/').map(toFolderCase) : []
  const parentPath = config.parent ? changeCase(config.parent, config.folderCase) : ''
  const truncatedPath = fixedWidth(cwd, Math.min(cwd.length, 30), { align: 'right' })
  const relativePath = path.join(config.path, ...parents, filePath)
  const printOutput = path.join(dim(truncatedPath), reset(relativePath))

  const output = path.join(process.cwd(), relativePath)

  console.log(yellow(`\n${fields.componentName} will be created at:`))
  console.log(`  ${underline(printOutput)}`)

  const confirm = await promptly.confirm(label('Happy with that?', bool()), {
    default: bool.toString(),
  })

  if (confirm) {
    return output
  }

  throw new Error()
}
