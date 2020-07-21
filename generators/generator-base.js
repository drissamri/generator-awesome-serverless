const Generator = require('yeoman-generator');
const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');

module.exports = class extends Generator {
  printLogo() {
    this.log('\n');
    this.log(`${chalk.yellow(' █████╗ ██╗    ██╗███████╗███████╗ ██████╗ ███╗   ███╗███████╗')}`);
    this.log(`${chalk.yellow('██╔══██╗██║    ██║██╔════╝██╔════╝██╔═══██╗████╗ ████║██╔════╝')}`);
    this.log(`${chalk.yellow('███████║██║ █╗ ██║█████╗  ███████╗██║   ██║██╔████╔██║█████╗  ')}`);
    this.log(`${chalk.yellow('██╔══██║██║███╗██║██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  ')}`);
    this.log(`${chalk.yellow('██║  ██║╚███╔███╔╝███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗')}`);
    this.log(`${chalk.yellow('╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝')}`);
    this.log(chalk.yellow.bold('\nWelcome to Awesome Serverless Generator                     \n'));
    this.log(chalk.green(`Application will be generated in: ${chalk.yellow(process.cwd())}`));
    this.log(
      chalk.yellow(
        ' _______________________________________________________________________________________________________________\n'
      ));
  }

  isGitInstalled(callback) {
    this.gitExec('--version', {trace: false}, code => {
      if (code !== 0) {
        this.warning('git is not found on your computer.\n', ` Install git: ${chalk.yellow('https://git-scm.com/')}`);
      }
      if (callback) {
        callback(code);
      }
    });
  }

  gitExec(args, options, callback) {
    if (!Array.isArray(args)) {
      args = [args];
    }
    const command = `git ${args.join(' ')}`;
    shelljs.exec(command, options, callback);
  }

  getDefaultAppName() {
    return /^[a-zA-Z0-9_-]+$/.test(path.basename(process.cwd())) ? path.basename(process.cwd()) : 'awesome-service';
  }

  warning(msg) {
    this.log(`${chalk.yellow.bold('WARNING!')} ${msg}`);
  }

  buildPackage() {
    shelljs.exec("./mvnw package");
  }

  initGitRepo() {
    const done = this.async();
    this.isGitInstalled(code => {
      if (code === 0) {
        this.gitExec('rev-parse --is-inside-work-tree', {trace: false}, (err, gitDir) => {
          if (gitDir && gitDir.trim() === 'true') {
            this.gitInitialized = true;
          } else {
            this.gitExec('init', {trace: false}, () => {
              this.log(chalk.green.bold('Git repository initialized.'));
              this.gitInitialized = true;
            });
          }
          done();
        });
      } else {
        this.warning('Git repository could not be initialized, as Git is not installed on your system');
        done();
      }
    });
  }
};
