'use strict';

let _= require('underscore'),
	glob=require('glob'),
  	path= require('path'),
  	baseProject= path.join(__dirname, '..', '..', '/'),
  	distFolder= path.join(baseProject, 'dist');


var Module= function(){

	let that= this;

	this.baseProject= baseProject;

	this.appFolder= 'app';

	this.confFolder= 'more/conf';

	this.distFolder= distFolder;

	this.nodeModules= 'node_modules';

	this.globs= {
		appTsGlobs: [ `${this.appFolder}/**/*.ts`, `!${this.appFolder}/jspm_packages/**/*`],
		appDefTsGlobs: [ 'typings/**/*.ts'],
		appEntryPoint: [ `${this.appFolder}/src/components/app/app.js` ],
		appEntryPoints: [ `${this.appFolder}/src/components/**/*.js` ],
		e2eGlobs:[`${this.appFolder}/testing/e2e/**/*.spec.js`],
		systemJs: `${this.appFolder}/jspm_packages/system.js`,
		appResources: [
			`${this.appFolder}/src/components/**/*`, 
			`${this.appFolder}/index.html`, 
			`!${this.appFolder}/src/components/**/*.{ts,js}`,
			`${this.appFolder}/styles/**/*`,
			`${this.appFolder}/data/**/*`,
			`${this.appFolder}/imgs/**/*`
		],
		polyfills: [
			`${this.nodeModules}/zone.js/dist/zone.js`, 
			`${this.nodeModules}/reflect-metadata/Reflect.js`,
			`${this.nodeModules}/reflect-metadata/Reflect.js`
		]
	};

	this.getFilesForPatterns= function(patterns){
	  return _.chain(patterns)
	  .map(function(pattern){return glob.sync(pattern); })
	  .reduce(function(memo, num){
	    return memo.concat(num);
	  }, []).value();
	};

};

module.exports=new Module();
