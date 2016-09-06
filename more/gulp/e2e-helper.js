'use strict';

let  protractor= require('gulp-protractor').protractor,
    webdriver_standalone = require('gulp-protractor').webdriver_standalone,
    webdriver_update = require('gulp-protractor').webdriver_update,
    utils= require('./utils');


class E2eHelper{

  constructor(gulp, expressServer){
    this.gulp= gulp;
    this.expressServer= expressServer;
  }

  registerTasks(){
    
    let gulp= this.gulp,
        that= this;

    gulp.task('webdriver_update', webdriver_update);
    gulp.task('webdriver_standalone', ['webdriver_update'], function(cb){
      webdriver_standalone(cb);
    } );

    //E2e tests
    gulp.task('test-e2e', ['webdriver_update', 'express'],  function(cb){

      let e2eGlobs= utils.globs.e2eGlobs;

      //start protractor
      gulp.src(e2eGlobs, { read:false })
          .pipe(protractor({
            configFile: './more/conf/protractor.conf.js' //,
            // args: ['--baseUrl', 'http://localhost:' + server.address().port +'/e2eTemplates/']
          })).on('error', function(e) {
            that.expressServer.close();
            throw e;
            cb();
          }).on('end', function() {
            that.expressServer.close();
            cb();
          });
    });

  }


}

module.exports= E2eHelper;
