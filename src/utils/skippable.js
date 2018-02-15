module.exports = (config, { prevent, skip } = {}) => async (prompt, ...rest) => {
  if ((!config.skip && !skip) || prevent) {
    return prompt(config, ...rest)
  }
  return config.defaults
}
