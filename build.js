const pkg = require('./package');
// ------ Build Settings -----------------
var vExportVar = "Handlebars4Code"; // defined in src/libs/exportmod.js
var vSrcPath = "./src/"; // Path to Source Libraries
var vDistPath = "./src/"; // Path to distribution
var vLibPath = vSrcPath + 'libs/';
var vLibDist = './dist/'+pkg.name+'.js';
var vLibOut = './docs/js/'+pkg.name+'.js';
var vLibArray = [
  './src/npm_header.js',
  //vLibPath+'require_mods.js',
  //vLibPath+'arrayhash.js',
  vLibPath+'handlebars.js',
  vLibPath+'handlebars_helpers.js',
  //'./src/npm_inherit.js',
  vLibPath+'exportmod.js'
];
// ----------------------------------------
// Process Chaining
// (1) create "npm_header.js" and "npm_tail.js" in src/libs
// (2) concat files export library to docs/js with prepend npm_header.js
// (3) create src/main.js for browserify and append "npm_tail.js"

var codegen = require('./src/codegen.js');

pkg.exportvar = vExportVar;

codegen.create_header(pkg);
//codegen.create_inherit_static(pkg);
codegen.create_tail(pkg);
codegen.concat_main(pkg.main,vLibArray,pkg);
codegen.concat_libs(vLibOut,vLibArray,pkg);
