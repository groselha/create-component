const path = require('path')
const promptly = require('promptly')
const fixedWidth = require('fixed-width-string')
const { dim, yellow, underline } = require('chalk')

const changeCase = require('../utils/change-case')
const label = require('../utils/label')
const bool = require('../utils/bool')

module.exports = async (fields, config) => {
  const filePath = changeCase(fields.componentName, config.folderCase)
  const parentPath = config.parent || ''
  const output = path.join(config.path, parentPath, filePath)
  const printOutput = `  ${underline(path.join(dim(__dirname), output))}`

  console.log(yellow(`\n${fields.componentName} will be created at:`))
  console.log(fixedWidth(printOutput, 50, { align: 'right' }))

  const confirm = await promptly.confirm(label('Happy with that?', bool()), {
    default: bool.toString(),
  })

  if (confirm) {
    return output
  }

  throw new Error()
}
