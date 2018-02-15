const mm = require('micromatch')

module.exports = (pattern, cb) => files =>
  files.map(file => {
    let fileName = file.fileName

    if (mm.isMatch(file.fileName, pattern)) {
      fileName = cb(file.fileName)
    }

    return { ...file, fileName }
  })
