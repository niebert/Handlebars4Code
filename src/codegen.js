var fs = require('fs');
var concat = require('concat-files');

function save_file(pFilename,pContent, pMessage) {
  var vMessage = pMessage || "File '"+pFilename+"' was saved!";
  fs.writeFile(pFilename, pContent, function(err) {
      if(err) {
          return console.log(err);
      };
      console.log(vMessage);
  });

};

function concat_libraries(pFilename,pLibArray) {
  concat_libs(vLibOut,vLibArray);
  var vLibTailArray = clone_json(vLibArray);
  vLibTailArray.push('./src/npm_tail.js');
  var vMainJS = "./"+pkg.main;
  concat_libs(vMainJS,vLibTailArray);
}

function concat_libs(pFilename,pLibArray) {
  console.log("Create Library '"+pFilename+"'");
  concat(pLibArray, pFilename, function(err) {
      if (err) {
        console.log("ERROR: generating '"+pFilename+"'\n"+err);
        throw err
      };
      console.log("File: '"+pFilename+"' generated for libraries successfully!\n  Libs:\n     "+pLibArray.join("\n     "));
  });

};

function create_header(pkg) {

  var vHeader = "/* ---------------------------------------";
  vHeader += "\n Exported Module Variable: "+vExportVar;
  vHeader += "\n Package:  "+pkg.name;
  vHeader += "\n Version:  "+pkg.version;
  vHeader += "\n Homepage: "+pkg.homepage;
  vHeader += "\n Author:   "+pkg.author;
  vHeader += "\n License:  "+pkg.license;
  if (pkg.hasOwnProperty("inherit")) {
    vHeader += "\nInheritance: '"+vExportVar+"' inherits from '"+pkg.inherit+"'";
  };
  vHeader += "\n Require Module with:";
  vHeader += "\n    const "+vExportVar+" = require('" + pkg.name+ "');";
  vHeader += "\n    var  compileCode = "+vExportVar+".compile(vTemplate);";
  vHeader += "\n JSHint: installation with 'npm install jshint -g'";
  vHeader += "\n ------------------------------------------ */";
  vHeader += "\n";
  vHeader += "\n/*jshint  laxcomma: true, asi: true, maxerr: 150 */";
  vHeader += "\n/*global alert, confirm, console, prompt */";
  vHeader += "\n";
  save_file("./src/npm_header.js", vHeader,"Module Header file 'src/npm_header.js' was saved!");
}

function create_tail(pkg) {
  var vTail = "\n";
  vTail += "\n// -------NPM Export Variable: " +vExportVar+ "---------------";
  //vTail += "\nmodule.exports = "+vExportVar+";";
  vTail += "\nmodule.exports = "+vExportVar+";";
  codegen.save_file("./src/npm_tail.js", vTail,"Module Header file 'src/npm_tail.js' was saved!");
}

function create_inherit(pkg) {
  var vInherit = "\n";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n//---Super Class------------------------";
    vInherit += "\n// Inheritance: '"+vExportVar+"' inherits attributes and methods from '"+pkg.inherit+"'";
    vInherit += "\n"+vExportVar+" = "+pkg.inherit+";";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n";
  };
  codegen.save_file("./src/npm_inherit.js", vInherit,"Inheritage code file 'src/npm_inherit.js' was saved!");
}

function clone_json(pJSON) {
  var vJSON = {};
  if (pJSON) {
    vJSON = JSON.parse(JSON.stringify(pJSON));
  } else {
    console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
  };
  return vJSON;
};

module.exports = {
  "save_file":save_file,
  "concat_libs":concat_libs,
  "create_header": create_header,
  "create_tail": create_tail
};
