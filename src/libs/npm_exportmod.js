//---- Define the static class Handlebars4Code
// The class was extended by src/libs/handlebars_helpers.js
// build.js creates main.js

function create_compiler(pTplJSON) {
  var vTemplate = "";
  for (var tplID in pTplJSON) {
    if (pTplJSON.hasOwnProperty(tplID)) {
      vTemplate = pTplJSON[tplID];
      vCodeCompiler[tplID] = Handlebars4Code.compile(vTemplate);
    }
  }
}

function create_compiler4template (pTemplate) {
  var vCodeCompiler = function () {
    console.error("ERROR: Handelbars4Code.create_compiler(pTemplate) - Handlebars4Code compiler undefined")
  };
  if (pTemplate) {
      vCodeCompiler = Handlebars4Code.compile(pTemplate);
  };
  return vCodeCompiler;
};

function get_compiler () {
  return vCodeCompiler;
};

function compile_code(pTplID,pJSON) {
  // pJSON is JSON data of the UML Class
  var vCode = vCodeCompiler[pTplID](pJSON);
  return vCode;
}


// Handlebars4Code = Handlebars;
Handlebars4Code.create_compiler = create_compiler;
Handlebars4Code.create_compiler4template = create_compiler4template;
//Handlebars4Code.compile = create_compiler4template;
Handlebars4Code.compile_code = compile_code;
Handlebars4Code.get_compiler = get_compiler;
