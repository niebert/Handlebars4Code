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

module.exports = getLibs4Build
