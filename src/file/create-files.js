const path = require('path')
const fs = require('fs-extra')
const merge = require('merge')

const template = require('./template')
const transform = require('./transform')
const rename = require('./rename')
const exclude = require('./exclude')

module.exports = async (fields, config, output) => {
  const tpl = template(path.join(process.cwd(), 'template/*'), fields)

  tpl.use(
    transform('package.json', body => {
      const json = JSON.parse(body)
      const { skip, defaults, scope, ...pkg } = config.package
      return JSON.stringify(merge.recursive(json, pkg), null, 2)
    })
  )

  tpl.use(exclude('*.test.js', !fields.test || fields.enzyme))
  tpl.use(exclude('*.test.enzyme.js', !fields.enzyme))
  tpl.use(exclude('*.story.js', !fields.storybook))
  tpl.use(exclude('README.md', !fields.readme))
  tpl.use(exclude('package.json', !fields.packageJSON))
  tpl.use(exclude('*.css', Boolean(!fields.css)))

  tpl.use(rename('Component.*', name => name.replace('Component', fields.fileName)))
  tpl.use(rename('*.enzyme.js', name => name.replace('.enzyme', '')))
  tpl.use(rename('*.css', name => name.replace('.css', `.${fields.css}`)))

  return Promise.all(
    tpl.files.map(async file => fs.outputFile(path.join(output, file.fileName), file.body))
  )
}
