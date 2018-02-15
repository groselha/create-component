const path = require('path')
const mm = require('micromatch')
const jstransformer = require('jstransformer')
const ejs = jstransformer(require('jstransformer-ejs'))

module.exports = (pattern, transformer) => files =>
  files.map(file => {
    if (mm.isMatch(file.fileName, pattern)) {
      return { ...file, body: transformer(file.body) }
    }

    return file
  })
