'use strict';
const BaseGenerator = require('../generator-base');

const chalk = require('chalk');
const prompts = require('./prompts');
const features = require('./features');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);
    this.configOptions = this.options.configOptions || {};
  }

  get initializing() {
    return {
      printLogo() {
        this.printLogo();
      }
    };
  }

  get prompting() {
    return prompts.prompting;
  }

  get configuring() {
    return {
      setup() {
        this.generatorVersion = packagejs.version;
      }
    };
  }

  get writing() {
    return {
      copyFiles() {
        features.enableJava(this);
        features.enableMaven(this);
        features.enableServerlessFramework(this);
      },


      initGit() {
        this.initGitRepo();
      }
    }
  }

  get install() {
    return {
      installing() {
        this.log(chalk.bold(`\nInstalling ${this.configOptions.projectName} locally using npm`));
        this.npmInstall();
        this.buildPackage();
      }
    };
  }

  get end() {
    return {

      gitCommit() {
        const done = this.async();
        this.isGitInstalled(code => {
          if (code === 0 && this.gitInitialized) {
            this.gitExec('add -A', {trace: false}, () => {
              let commitMsg = `Initial application generated by Awesome Serverless generator v${this.generatorVersion}`;

              const executableDone = this.async();
              this.gitExec('update-index --chmod=+x gradlew', {trace: false}, () => {
                executableDone();
              });

              this.gitExec(`commit -am "${commitMsg}"`, {trace: false}, () => {
                this.log(chalk.green.bold('Application successfully committed to Git.'));
                done();
              });
            });
          } else {
            this.warning(
              'The generated application could not be committed to Git, as a Git repository could not be initialized.'
            );
            done();
          }
        });
      },

      printComplete() {
        this.log(chalk.green('Project ' + this.configOptions.projectName + ' generated!'));
      }
    };
  }
};
