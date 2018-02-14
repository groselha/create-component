const path = require('path')
const kopy = require('kopy')

module.exports = async fields => {
  const templateDir = path.join(process.cwd(), 'template')
  const outDir = path.join(process.cwd(), 'out')
  const options = {
    clean: true,
    data: {
      css: fields.css,
      name: {
        packageName: fields.packageName,
        componentName: fields.componentName,
      },
    },
    filters: {
      '*.test.js': fields.test && !fields.enzyme,
      '*.test.enzyme.js': fields.enzyme,
      '*.story.js': fields.storybook,
      'README.md': fields.readme,
      'package.json': fields.packageJSON,
      '*.css': Boolean(fields.css),
    },
    move: {
      '*.enzyme.js': filepath => filepath.replace('.enzyme', ''),
      '*.css': filepath => filepath.replace('.css', `.${fields.css}`),
      'Component.*': filepath => filepath.replace('Component', fields.componentName),
    },
  }

  return await kopy(templateDir, outDir, options)
}
