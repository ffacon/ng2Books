'use strict';

let dataEnv= require('./data-env');

module.exports = function(config) {
  config.set({

    basePath:'../../',

    frameworks: ['jasmine'],

    files: [
      // JSPM sources
      {pattern: `${dataEnv.jspmPackages}/github/**/*.js`, included: false, watched: false},
      {pattern: `${dataEnv.jspmPackages}/npm/*.js`, included: false, watched: false},
      {pattern: `${dataEnv.jspmPackages}/npm/process*/**/*.js`, included: false, watched: false},
      // Angular and rx js
      {pattern: `${dataEnv.jspmPackages}/npm/@angular/**/*.js`, included: false, watched: false},
      {pattern: `${dataEnv.jspmPackages}/npm/rxjs@${dataEnv.rxVersion}/**/*.js`, included: false, watched: false, served: true},
      //App sources
      {pattern: `${dataEnv.app}/src/**`, included: false, watched: false, served: true},

      // Including systemjs because it defines `__eval`, which produces correct stack traces.
      `${dataEnv.jspmPackages}/system.src.js`,
      `${dataEnv.nodePackages}/zone.js/dist/zone.js`,
      `${dataEnv.nodePackages}/reflect-metadata/Reflect.js`,
      `${dataEnv.app}/config-data.js`,
      `${dataEnv.conf}/data-env.js`,
      `${dataEnv.conf}/test-helper.js`
    ],

    exclude:[
      `${dataEnv.jspmPackages}/npm/@angular/**/e2e_test/**`,
      `${dataEnv.jspmPackages}/npm/@angular/platform-browser@${dataEnv.ngVersion}/testing/e2e_util.js`
    ],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-mocha-reporter'
    ],

    // reporters: ['mocha'],
    reporters: ['mocha'],

    browsers: ['Chrome'],

    port: 9876
  });

};