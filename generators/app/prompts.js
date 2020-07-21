'use strict';
const chalk = require('chalk');
module.exports = {
  prompting
};

function prompting() {
  const done = this.async();

  const prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: `What's your ${chalk.yellow('*Project Name*')}`,
      default: this.getDefaultAppName()
    },
    {
      type: 'input',
      name: 'packageName',
      message: `What ${chalk.yellow('*Package*')} should be used?`,
      validate: input =>
        /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input) ? true : 'The package name you have provided is not a valid Java package name.',
      default: 'com.drissamri.favorites'
    },
    {
      type: 'input',
      name: 'functionName',
      message: `What's your ${chalk.yellow('*Function Name*')}`,
      default: 'get-favorites'
    },
  ];

  this.prompt(prompts).then(answers => {
    Object.assign(this.configOptions, answers);
    this.configOptions.packageFolder = this.configOptions.packageName.replace(/\./g, '/');
    done();
  });
}
