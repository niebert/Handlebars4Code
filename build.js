const pkg = require('./package');
// ------ Build Settings -----------------
var vExportVar = pkg.exportvar; // defined in src/libs/exportmod.js
var vSrcPath = "./src/"; // Path to Source Libraries
var vDistPath = "./dist/"; // Path to distribution
var vLibPath = vSrcPath + 'libs/';
var vHtmlPath = vSrcPath + 'html/';
var vReadmePath = vSrcPath + 'readme/';
var vLibDist = './dist/'+pkg.name+'.js';
var vLibOut = './docs/js/'+pkg.name+'.js';
var getLibs4Build = require('./src/libs4build');
var vLibs4Build = getLibs4Build(vLibPath);
var vHTML4Build = getHTML4Build(vHtmlPath);
var vREADME4Build = getREADME4Build(vReadmePath);
/* vLibs4Build will look like this
var vLibs4Build = [
  './src/npm_header.js',
  //vLibPath+'require_mods.js',
  //vLibPath+'arrayhash.js',
  vLibPath+'handlebars.js',
  vLibPath+'handlebars_helpers.js',
  //'./src/npm_inherit.js',
  vLibPath+'exportmod.js'
];
*/
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
codegen.concat_main(pkg.main,vLibs4Build,pkg);
codegen.concat_libs(vLibOut,vLibs4Build,pkg);
codegen.concat_libs(vSrcPath,vLibs4Build,pkg);
codegen.concat_html("./html/index_test.html",vHtml4Build,pkg);
codegen.concat_readme("./README_test.md",vReadme4Build,pkg);
