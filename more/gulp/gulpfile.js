'use strict'; 

let gulp= require('gulp');


//Register server tasks
let ServerHelper= require('./server-helper'),
	serverHelper= new ServerHelper(gulp);
serverHelper.registerTasks();


//Register ts tasks
let TypescriptHelper= require('./typescript-helper'),
	typescriptHelper= new TypescriptHelper(gulp);
typescriptHelper.registerTasks();

//Register dist tasks
let DistHelper= require('./dist-helper'),
	distHelper= new DistHelper(gulp);
distHelper.registerTasks();

//Register unit tests tasks
let UnitTestsHelper= require('./unittests-helper'),
	utHelper= new UnitTestsHelper(gulp);
utHelper.registerTasks();

//Register test integrations tasks
let expressServer= serverHelper.getServer();
let E2eHelper= require('./e2e-helper'),
	e2eHelper= new E2eHelper(gulp, expressServer);
e2eHelper.registerTasks();

//Transverse tasks
gulp.task('dev', ['compileTs', 'express', 'watchTs'], function(cb){});