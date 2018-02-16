module.exports = (config, { prevent, skip, defaults } = {}) => async (prompt, ...rest) => {
  if ((!config.skip && !skip) || prevent) {
    return prompt(config, ...rest)
  }
  return typeof defaults === 'undefined' ? config.defaults : defaults
}
