'use strict';

let dataEnv= {
	"rxVersion":"5.0.0-beta.6",
	"ngVersion":"2.0.0-rc.1",
	"app":"app",
	"conf":"more/conf",
	"jspmPackages":"app/jspm_packages",
	"nodePackages":"node_modules"
}

if (typeof module !== 'undefined' && module){
	module.exports= dataEnv;
}