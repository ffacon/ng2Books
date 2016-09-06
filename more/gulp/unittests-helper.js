'use strict';

let path= require('path'),
    karma = require('karma'),
    utils = require('./utils');

class UnitTestsHelper {

  constructor(gulp) {
    this.gulp = gulp;
  }

  runKarma(done) {

    let confFile= path.join(utils.baseProject, utils.confFolder, 'karma.conf.js');
    console.log(confFile);

    return new Promise((resolve, reject) => {
      new karma.Server(
        {
          configFile: confFile,
          singleRun: true,
          browserNoActivityTimeout: 20000,
          captureTimeout: 12000
        },
        function(err) {
          if (err) {
            reject(err);
            process.exit(1);
          } else {
            resolve();
            process.exit(0);
          }
        })
        .start();
    });
  }

  registerTasks() {
    let that= this,
        gulp = this.gulp;

    // Unit Tests
    gulp.task('karma', function(cb) {
      that.runKarma(cb);
    });

  }

}


module.exports = UnitTestsHelper;