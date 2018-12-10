const pkg = require('./package');
// ------ Build Settings -----------------
var vExportVar = pkg.exportvar; // defined in src/libs/exportmod.js
var vSrcPath = "./src/"; // Path to Source Libraries
var vDistPath = "./dist/"; // Path to distribution
var vLibPath = vSrcPath + 'libs/';
var vHtmlPath = vSrcPath + 'html/';
var vCssPath = vSrcPath + 'css/';
var vReadmePath = vSrcPath + 'readme/';
var vLibDist = './dist/'+pkg.name+'.js';
var vLibOut = './docs/js/'+pkg.name+'.js';
const f4b = require('./files4build');
// the following get-function return arrays of filenames
var vLibs4Build = f4b.getLibs4Build(vLibPath);
var vHtml4Build = f4b.getHtml4Build(vHtmlPath);
var vReadme4Build = f4b.getReadme4Build(vReadmePath);
var vCss4Build = f4b.getCss4Build(vCssPath);
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
// (4) create docs/index.html for browser test of WebApp
// (5) create README.md for documentation of WebApp

var codegen = require('./src/codegen.js');

pkg.exportvar = vExportVar;

//-----------------------------------------
//----CREATE main,libs,css,html,readem-----
codegen.create_header(pkg);
//-----------------------------------------
//--- for super class inheritance ---------
//codegen.create_inherit(pkg);
//codegen.create_readme_inherit(pkg);
//--- for extension of libraries ----------
codegen.create_inherit_static(pkg);
codegen.create_readme_inherit_static(pkg);
//-----------------------------------------
codegen.create_tail(pkg);
codegen.create_html_title(pkg);
codegen.create_html_description(pkg);
codegen.create_html_tail(pkg);
codegen.create_readme_header(pkg);
codegen.create_readme_install(pkg);
codegen.create_readme_devlibs(pkg);
codegen.create_readme_tail(pkg);
codegen.create_header(pkg);

//-----------------------------------------
//----CONCAT main,libs,css,html,readem-----
// MAIN.js create library and append "modules.export"
codegen.concat_main(pkg.main,vLibs4Build,pkg);
// LIB:  create the library in /dist folder
codegen.concat_libs(vLibDist,vLibs4Build,pkg);
// DOCS: create the library in /docs folder
codegen.concat_libs(vLibOut,vLibs4Build,pkg);


codegen.concat_html("./docs/index.html",vHtml4Build,pkg);
codegen.concat_css("./docs/css/build.css",vCss4Build,pkg);
codegen.concat_readme("./README.md",vReadme4Build,pkg);

/*
*/
