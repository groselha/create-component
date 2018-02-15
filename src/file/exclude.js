const path = require('path')
const mm = require('micromatch')
const jstransformer = require('jstransformer')
const ejs = jstransformer(require('jstransformer-ejs'))

module.exports = (pattern, condition) => files => {
  return files.filter(file => {
    const isMatch = mm.isMatch(file.fileName, pattern)
    return isMatch ? !condition : true
  })
}
