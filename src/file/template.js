const path = require('path')
const glob = require('glob-fs')({ gitignore: true })
const jstransformer = require('jstransformer')
const ejs = jstransformer(require('jstransformer-ejs'))

module.exports = (templateFiles, data) => {
  const middlewares = []

  console.log(templateFiles)
  let files = glob.readdirSync(templateFiles).map(filePath => {
    let { body } = ejs.renderFile(filePath, data)
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
