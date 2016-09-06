'use strict';

let gcache = require('gulp-cached'),
	debug = require('gulp-debug'),
  	gutil= require('gulp-util'),
  	addsrc= require('gulp-add-src'),
  	tsc = require('gulp-typescript'),
  	sourcemaps = require('gulp-sourcemaps'),
	typescript = require('typescript'),
	path= require('path'),
	utils = require('./utils');

class TypescriptHelper{

	constructor(gulp){
		this.gulp = gulp;
	}

	registerTasks() { 

		let gulp = this.gulp;
		let globs= utils.globs;

		gulp.task('compileTs', function() {

			let tsProject = tsc.createProject(
				path.join(utils.baseProject, 'tsconfig.json'),
				{ typescript: typescript }
			);

			// let tsFiles = globs.appDefTsGlobs.concat(globs.appTsGlobs);
			let tsFiles = globs.appTsGlobs;

			return gulp.src(tsFiles, { base: utils.appFolder })
				.pipe(gcache('tscache'))
				.pipe(addsrc(globs.appDefTsGlobs))
				.pipe(debug())
				.pipe(sourcemaps.init())
				.pipe(tsc(tsProject))
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(utils.appFolder));
		});

		gulp.task('watchTs', function() {
			gutil.log('watching ts files');
			gulp.watch(globs.appTsGlobs, ['compileTs']);
		});


	}	

}

module.exports= TypescriptHelper;