const mm = require('micromatch')

module.exports = (pattern, transformer) => files =>
  files.map(file => {
    if (mm.isMatch(file.fileName, pattern)) {
      return { ...file, body: transformer(file.body) }
    }

    return file
  })
