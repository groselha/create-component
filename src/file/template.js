const path = require('path')
const glob = require('glob')
const jstransformer = require('jstransformer')
const ejs = jstransformer(require('jstransformer-ejs'))

module.exports = (templateFiles, data) => {
  let files = glob.sync(templateFiles).map(filePath => {
    const { body } = ejs.renderFile(filePath, data)
    return {
      filePath,
      body,
      fileName: path.basename(filePath),
    }
  })

  return {
    use(middleware) {
      files = middleware(files)
    },

    get files() {
      return files
    },
  }
}
