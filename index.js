const path = require('path');
const promptly = require('promptly');
const paramCase = require('param-case');
const argv = require('minimist')(process.argv.slice(2));

const copy = require('./copy');
const getConfig = require('./get-config');
const getName = require('./get-name');
const getTest = require('./get-test');
const getEnzyme = require('./get-enzyme');
const getCSS = require('./get-css');
const getReadme = require('./get-readme');
const getStorybook = require('./get-storybook');
const getPackageName = require('./get-package-name');
const getPackageJSON = require('./get-package-json');

const init = async () => {
  const { defaults, skip } = await getConfig();
  console.log(defaults, skip);

  const fields = {};
  fields.componentName = await getName();
  fields.packageJSON = await getPackageJSON(defaults.package);
  fields.packageName = await getPackageName(paramCase(fields.componentName), fields.packageJSON);
  fields.test = await getTest(defaults.test);
  fields.enzyme = await getEnzyme(defaults.enzyme, fields.test);
  fields.css = await getCSS(defaults.css);
  fields.storybook = await getStorybook(defaults.storybook);
  fields.readme = await getReadme(defaults.readme);

  try {
    await copy(fields);
  } catch (err) {
    console.log(err.stack);
  }
}

init();
