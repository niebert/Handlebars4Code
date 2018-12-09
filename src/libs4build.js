/* The Array vLibs4Build contains all libraries
   that are included in the 'build.js' call
   with 'npm run build'
*/
const getLibs4Build = function (pLibPath) {
  var vLibs4Build = [
    './src/npm_header.js',
    //pLibPath+'require_mods.js',
    //pLibPath+'arrayhash.js',
    pLibPath+'handlebars.js',
    pLibPath+'handlebars_helpers.js',
    //'./src/npm_inherit.js',
    pLibPath+'exportmod.js'
  ];
  return vLibs4Build;
}

const getHTML4Build = function (pPath) {
  var vHTML4Build = [
    pPath+'header.html',
    pPath+'headerlibs.html',
    pPath+'headerscript.html',
    pPath+'bodyheader.html',
    pPath+'body.html',
    pPath+'bodytail.html',
    pPath+'tail.html'
  ];
  return vLibs4Build;
}


module.exports = {
  getLibs4Build,
  getHTML4Build
}
