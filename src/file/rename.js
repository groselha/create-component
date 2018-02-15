const path = require('path')
const mm = require('micromatch')
const jstransformer = require('jstransformer')
const ejs = jstransformer(require('jstransformer-ejs'))

module.exports = (pattern, cb) => files =>
  files.map(file => {
    let fileName = file.fileName

    if (mm.isMatch(file.fileName, pattern)) {
      fileName = cb(file.fileName)
    }

    return { ...file, fileName }
  })
