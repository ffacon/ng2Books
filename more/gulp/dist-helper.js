'use strict';

const fs= require('fs'),
	path= require('path'),
	utils= require('./utils'),
	jspm= require('jspm'),
	gjspm= require('gulp-jspm'),
	grename= require('gulp-rename'),
	gfilter= require('gulp-filter'),
	debug = require('gulp-debug'),
	save= require('gulp-save'),
	htmlReplace= require('gulp-html-replace'),
	rimraf= require('rimraf');

class DistHelper{

	constructor(gulp){
		this.gulp= gulp;
	}

	registerTasks(){

		let gulp= this.gulp;
		let bundleFilename= 'bundle.js';

		gulp.task('rmdist', function(cb){
			rimraf(utils.distFolder, cb);
		});

		gulp.task('jspm', ['compileTs', 'rmdist'], function(cb){

			const builder = new jspm.Builder();

			builder.bundle('src/**/*.js')
			.then( (output) => {
				fs.existsSync(`${utils.distFolder}`) || fs.mkdirSync(`${utils.distFolder}`);
				fs.writeFile( path.join(`${utils.distFolder}`, bundleFilename) , output.source, function(err){
					if (err){
						throw err;
					}

					cb();
				} );
			} );


		});

		gulp.task('copyAndUpdateResources', ['rmdist'], function(){

			let inputFiles= utils.globs.appResources.concat(utils.globs.systemJs);
			let indexFilter= gfilter(`${utils.appFolder}/index.html`, {restore: true});

			return gulp.src(inputFiles, {base:utils.appFolder})
			.pipe(indexFilter)
			.pipe(htmlReplace({
				jspmBundle:[bundleFilename],
				jspmConfig:{
					src:null,
					tpl:`<script>System.config({baseURL: "/TrainingAngular2/gh",  defaultJSExtensions: true});</script>`
				}
			}))
			.pipe(indexFilter.restore)
			.pipe(gulp.dest(utils.distFolder));
		});

		gulp.task('copyPolyfills', ['rmdist'], function(){
			return gulp.src(utils.globs.polyfills, {base:  utils.nodeModules})
			.pipe(gulp.dest(utils.distFolder));
		});


		gulp.task('dist', ['jspm', 'copyAndUpdateResources', 'copyPolyfills']);
	}





}


module.exports= DistHelper;
