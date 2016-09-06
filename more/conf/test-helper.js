'use strict';

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};


configData.baseURL= `base/${dataEnv.app}/`;
System.config(configData);

// Set up the test injector, then import all the specs, execute their `main()`
// method and kick off Karma (Jasmine).
System.import('@angular/core/testing')
  .then(function(coreTesting){
    return System.import('@angular/platform-browser/testing')
      .then(function(browserTesting){
         coreTesting.setBaseTestProviders(
          browserTesting.TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
          browserTesting.TEST_BROWSER_STATIC_APPLICATION_PROVIDERS
        );
      });
  })
  .then(function() {
  return Promise.all(
    // All files served by Karma
    Object.keys(window.__karma__.files) 
    // Filter spec files
    .filter(onlySpecFiles)
    .map(function(path) {
      //Import spec files and run their main() function
      return System.import(path).then(function(module) {
        console.log('# SPEC: ' + path);
        if (module.hasOwnProperty('main')) {
          module.main();
        } else {
          throw new Error('Module ' + path + ' does not implement main() method.');
        }
      });
    }));
})
.then(function() {
  __karma__.start();
}, function(error) {
  __karma__.error(error.stack || error);
});



function onlySpecFiles(path) {
  //console.log('file ' + path);
  var res= /.spec\.js$/.test(path);
  return res;
}