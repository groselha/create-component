const path = require('path');
const promptly = require('promptly');
const copy = require('kopy');
const argv = require('minimist')(process.argv.slice(2));

const getName = require('./get-name');
const getTest = require('./get-test');
const getEnzyme = require('./get-enzyme');
const getCSS = require('./get-css');
const getReadme = require('./get-readme');

const init = async () => {
  const name = await getName();
  const test = await getTest(true);
  const enzyme = await getEnzyme(false, test);
  const css = await getCSS('css');
  const readme = await getReadme(true);

  const templateDir = path.join(process.cwd(), 'template');
  const outDir = path.join(process.cwd(), 'out');
  const options = {
    clean: true,
    data: {
      name
    },
    filters: {
      '*.test.js': test && !enzyme,
      '*.test.enzyme.js': enzyme,
    },
    move: {
      '*.test.enzyme.js': filepath => filepath.replace('.enzyme', '')
    }
  }

  try {
    const data = await copy(templateDir, outDir, options);
  } catch (err) {
    console.log(err.stack);
  }
}

init();
