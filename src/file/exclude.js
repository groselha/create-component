const mm = require('micromatch')

module.exports = (pattern, condition) => files => {
  return files.filter(file => {
    const isMatch = mm.isMatch(file.fileName, pattern)
    return isMatch ? !condition : true
  })
}
