module.exports = {
  enableJava,
  enableMaven,
  enableServerlessFramework
};

function enableJava(ctx) {
  ctx.fs.copyTpl(
    ctx.templatePath('java/Handler.java'),
    ctx.destinationPath('src/main/java/' + ctx.configOptions.packageFolder + '/Handler.java'),
    ctx.configOptions
  );
}

function enableServerlessFramework(ctx) {
  ctx.fs.copyTpl(
    ctx.templatePath('sls/package.json'),
    ctx.destinationPath('package.json'),
    ctx.configOptions
  );

  ctx.fs.copyTpl(
    ctx.templatePath('sls/**/*.yml'),
    ctx.destinationPath(''),
    ctx.configOptions
  );
}

function enableMaven(ctx) {
  const commonMavenConfigDir = 'maven/';

  ['mvnw', 'mvnw.cmd', '.gitignore'].forEach(tmpl => {
    ctx.fs.copy(
      ctx.templatePath(commonMavenConfigDir + tmpl),
      ctx.destinationPath(tmpl)
    );
  });

  ctx.fs.copyTpl(
    ctx.templatePath(commonMavenConfigDir + 'pom.xml'),
    ctx.destinationPath('pom.xml'),
    ctx.configOptions
  );


  ctx.fs.copy(
    ctx.templatePath(commonMavenConfigDir + 'assembly/*.xml'),
    ctx.destinationPath('src/main/assembly/')
  );
}
