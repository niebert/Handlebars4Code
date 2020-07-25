/* ---------------------------------------
 Exported Module Variable: Handlebars4Code
 Package:  handlebars4code
 Version:  1.2.16  Date: 2020/07/25 17:07:15
 Homepage: https://github.com/niebert/Handlebars4Code#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2020/07/25 17:07:15
 Require Module with:
    const Handlebars4Code = require('handlebars4code');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */
// File: src/libs/require_mods.js
// require the Handlebars module from NPM
var Handlebars4Code = require('handlebars');
//--- File: src/libs/handlebars4code_helpers.js ---

/* vDataJSON is the main JSON data storage defined in index.html
  vDataJSON is provided as parameter to createHandleBarsCompiler(pDataJSON)
   * createHandleBarsCompiler() expects a hash key "tpl" containing the templates.
   * createHandleBarsCompiler() generates HandleBars compiler functions
     in pDataJSON["out"] for all keys pDataJSON["tpl"]
  create for all templates in the hash vDataJSON["tpl"] a Handlebars compiler
  e.g. vDataJSON["tpl"]["javascript"] is a Handlebars template for Javascript
  Code generation. Following iteration will create a compliler
  in vDataJSON["out"]["javascript"]
*/

var vCodeCompiler = {};

function clone_json(pJSON) {
  var vJSON = {};
  if (pJSON) {
    vJSON = JSON.parse(JSON.stringify(pJSON));
  } else {
    console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
  }
  return vJSON;
}


function value_in_array( pValue, pArray ) {
  var ret = -1;
  if (pArray) {
    for (var i = 0; i < pArray.length; i++) {
      if (pValue == pArray[i]) {
        ret = i;
      }
    }
  } else {
    console.log("value_in_array()-Call pArray undefined");
  }
  return ret;
}

function createHandleBarsCompiler(pDataJSON) {
  for (var tplID in pDataJSON.tpl) {
    if (pDataJSON.tpl.hasOwnProperty(tplID)) {
      pDataJSON.out[tplID] = Handlebars4Code.compile(pDataJSON.tpl[tplID]);
    }
  }
}

// Use helper in Template with:
// {{#ifcond var1 '==' var2}}
//   ...
// {{/ifcond}}

Handlebars4Code.registerHelper('ifcond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

// Block helpers can be called in template
// {{#bold}}{{body}}{{/bold}}

Handlebars4Code.registerHelper('bold', function(options) {
  var ret = "";
  ret += '<div class="mybold">';
  ret += options.fn(this);
  ret += '</div>';
  return new Handlebars4Code.SafeString(ret);
});

// Simple Iterators helper functions
/*
{{#listhtml attributes}}
   <div class="comment">
     <h2>{{subject}}</h2>
     {{{body}}}
   </div>
 {{/listhtml}}
*/

Handlebars4Code.registerHelper('listhtml', function(context, options) {
  var ret = "<ul>";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + options.fn(context[i]) + "</li>";
  }

  return ret + "</ul>";
});

/* Hash Arguments of Helper Calls
Like regular helpers, block helpers can accept an optional
 Hash as its final argument.
 Let's revisit the list helper and make it possible for us
 to add any number of optional attributes to the <ul> element we will create.

{{#listhtmlattr nav id="nav-bar" class="top"}}
 <a href="{{url}}">{{title}}</a>
{{/listhtmlattr}}

Handlebars provides the final hash as options.hash.
This makes it easier to accept a variable number of parameters,
while also accepting an optional Hash. If the template provides
no hash arguments, Handlebars will automatically pass an empty object ({}),
so you don't need to check for the existence of hash arguments.
*/

Handlebars4Code.registerHelper('eachparam', function(context, pClassname,options) {

  var vText =  context.map(function(item) {
    return "" + options.fn(item) + "";
  }).join("\n");

  for (var varID in options.hash) {
    if (options.hash.hasOwnProperty(varID)) {
      console.log("eachparam options.hash['"+varID+"']='"+options.hash[varID]+"'");
      vText = vText.replace(new RegExp('{{' + varID + '}}', 'g'), options.hash[varID]);
    }
  }
  return vText;
});

Handlebars4Code.registerHelper('foreach', function(pArray, pData, options) {
  var ret = "";
  // vRequire is a Hash that collects all classes
  // that are needed to create attributes or
  // create a return class of the type.
  var vRequire = {};
  var vLib = "";
  var item;
  for (var i=0; i<pArray.length; i++) {
    item = clone_json(pArray[i]);
    item.data = pData;
    ret += options.fn(item);
  }
  return ret;
});


Handlebars4Code.registerHelper('listhtmlattr', function(context, options) {
  var attrs = Object.keys(options.hash).map(function(key) {
    return key + '="' + options.hash[key] + '"';
  }).join(" ");

  return "<ul " + attrs + ">" + context.map(function(item) {
    return "<li>" + options.fn(item) + "</li>";
  }).join("\n") + "</ul>";
});

Handlebars4Code.registerHelper('indent', function(pText, pIndent) {
  var vText = pText ||"ERROR: undefined pText in helper-indent ";
  var vIndent = "        ";
  if(typeof(pIndent) == "string") {
    console.log("CALL: helper-indent: pIndent is of type 'String'");
    vIndent = pIndent;
  } else {
    if (pIndent.hasOwnProperty("hash")) {
      if (pIndent.hash.hasOwnProperty("indent")) {
        vIndent = pIndent.hash.indent;
      } else {
        console.log("ERROR: helper-indent: pIndent.hash 'indent' property undefined - use default indent");
      }
    } else {
      console.log("ERROR: helper-indent: pIndent undefined - use default indent");
    }
  }
  var vCR = "";
  console.log("indent-helper: vIndent='"+vIndent+"'");
  //vIndent = "\n" + vIndent;
  if (vText && (vText != "")) {
    vText = vText.replace(/\n/g,"\n"+vIndent);
  }
  return new Handlebars4Code.SafeString(vIndent+vText);
});



Handlebars4Code.registerHelper('codeindent', function(pContext, options) {
  var vIndent = "";
  var vText = "";
  var vCR = "";
  if (options) {
    if (options.hash.hasOwnProperty("indent")) {
      vIndent = options.hash.indent;
      //console.log("Indent for Code Coments in HandleBars: '"+vIndent+"'");
    }
    vText = options.fn(pContext);
    //console.log("pContext: "+pContext);
  } else {
    console.log("options in helper 'commentindent' undefined");
  }
  if (pContext) {
    //console.log("Type: "+typeof(pContext)+" '"+pContext+"'");
    vText = pContext;
  }
  //vIndent = "\n" + vIndent;
  if (vText != "") {
    vText = vText.replace(/\n/g,"\n"+vIndent+"  ");
  }
  return vIndent+"  "+vText+"\n";
});

/*
{{lowercase myfilename}}
{{lowercase "My Filename"}}
*/

Handlebars4Code.registerHelper('lowercase', function(pString) {
  var vString = pString.toLowerCase();
  return new Handlebars4Code.SafeString(vString);
});

Handlebars4Code.registerHelper('requirelibs', function(pArray, options) {
  var ret = ""; // return value
  var vSep = ""; // newline separator - empty for first line
  var vMod = "";


  function filename2var(pFile) {
    // converts first character to uppercase.
    // e.g. "myclass" to "Myclase"
    var vFile = pFile || "undef_require_lib";
    if (vFile.indexOf("/")>=0) {
      vFile = vFile.slice(vFile.lastIndexOf("/")+1);
    }
    vFile = vFile.replace(/[^A-Za-z0-9]/g,"_"); // remove illegial characters in variable name
    return vFile.charAt(0).toUpperCase() + vFile.slice(1);
  }

  for (var i = 0; i < pArray.length; i++) {
    vFile = pArray[i];
    //ret += options.fn({"variable":filename2var(vFile),"module":vFile})
    ret += options.fn(pArray[i]);
  }
  //return new Handlebars4Code.SafeString(ret);
  console.log("Require List:\n"+ret);
  return ret;
});

Handlebars4Code.registerHelper('requireclass', function(pData,pSettings, options) {
  var vRequirePath = pData.reposinfo.require_path || "./libs/";
  var ret = "";
  // vRequire is a Hash that collects all classes
  // that are needed to create attributes or
  // create a return class of the type.
  var vRequire = {};
  var vLib = "";
  var vPars;

  function addlib_check (pCheckTitle,pLib) {
    // constructors are required if the class is NOT a base class
    // so class/library is added if an only if it is not a base class
    console.log("("+pCheckTitle+") addlib_check('"+pLib+"')");
    if (pLib != "") {
      console.log("Base Class '"+pLib+"' index="+value_in_array(pLib,pSettings.baseclasslist));
      if ((value_in_array(pLib,pSettings.baseclasslist) >= 0) || (pLib == pData.superclassname)) {
        console.log("("+pCheckTitle+") Library '"+pLib+"' is a Base Class - no required");
      } else {
        console.log("Local Class '"+pLib+"' index="+value_in_array(pLib,pSettings.localclasslist));
        if (value_in_array(pLib,pSettings.localclasslist) >= 0) {
          // pLib is a local library
          vRequire[pLib] = vRequirePath + name2filename(pLib);
          console.log("("+pCheckTitle+") Library '"+pLib+"' is a Local Class - require('"+vRequire[pLib]+"')");
        } else {
          vRequire[pLib] = name2filename(pLib);
          console.log("("+pCheckTitle+") Library '"+pLib+"' is a Remote Class - require('"+vRequire[pLib]+"')");
        }
      }
    }
  } //END: addlib_check()

  console.log("Call Helper: requireclasslist - superclass='"+pData.superclassname+"' require_path='"+vRequirePath+"'");
  for (var i=0; i<pData.attributes.length; i++) {
    // populate vRequire with classes that a needed as
    // constructors for attributes
    addlib_check("Attribute",pData.attributes[i].class);
  }
  for (i=0; i<pData.methods.length; i++) {
    // populate vRequire with classes that a needed as
    // constructors for returned instances of those classes
    addlib_check("Method "+pData.methods[i].name+"() Return",pData.methods[i].return);
    vPars = pData.methods[i].parameter;
    for (var k=0; k<vPars.length; k++) {
      addlib_check("Parameter "+pData.methods[i].name+"()",vPars[k].class);
    }
  }
  // vRequire is a Hash therefore double usage of classes
  // in attributes and returns of methods lead just to one
  // require call in the list
  var vSep = "";
  for (var iLib in vRequire) {
    if (vRequire.hasOwnProperty(iLib)) {
      ret += options.fn({"variable":iLib,"module":vRequire[iLib]});
      //ret += vSep + "const " + iLib + " = require('" + vRequire[iLib]+"');";
      vSep = "\n";
    }
  }
  //return new Handlebars4Code.SafeString(ret);
  console.log("Require List:\n"+ret);
  return ret;
});

Handlebars4Code.registerHelper('removereturn', function(pString) {
  var vString = pString.replace(/\n/g," - ");
  return new Handlebars4Code.SafeString(vString);
});


function name2filename(pName) {
  var vFilename = "undefined_filename";
  if (pName) {
    vFilename = pName.toLowerCase();
    vFilename = vFilename.replace(/[^a-z0-9]/g,"_");
    vFilename = vFilename.replace(/_[_]+/g,"_");
  };
  return vFilename;
}


Handlebars4Code.registerHelper('filename', function(pString) {
   var vText = pString || "no_filename";
   return name2filename(vText);
});

// -----------

function paramCallString(pParamArray) {
  var ret = "";
  var vComma = "";

  for(var i=0, j=pParamArray.length; i<j; i++) {
    ret += vComma +  pParamArray[i].name;
    vComma = ",";
  }

  return new Handlebars4Code.SafeString(ret);
}

Handlebars4Code.registerHelper('paramcall', paramCallString);

// -----------

function paramTypeString(pParamArray) {
  // creates from JSON parameters of a method the variable list with types
  var ret = "";
  var vComma = "";
  if (pParamArray) {
    for(var i=0, j=pParamArray.length; i<j; i++) {
      ret += vComma +  pParamArray[i].name+":"+pParamArray[i].class;
      vComma = ",";
    }
  } else {
    console.log("No pParamArray in 'paramcall' helper.");
  }

  return new Handlebars4Code.SafeString(ret);
}

Handlebars4Code.registerHelper('paramtype', paramTypeString);
// -----------

function attribs4UMLString(pArray) {
  // pArray contains the array of Attributes
  var ret = "";
  var vSep = "";
  var vVis = "-";
  for(var i=0, j=pArray.length; i<j; i++) {
    switch (pArray[i].visibility) {
      case "public":
        vVis = "+";
      break;
      case "public":
        vVis = "-";
      break;
      default:
        vVis = "-";
    }
    ret += vSep + " " + vVis + " `" + pArray[i].name;
    if (pArray[i].class != " ") {
      ret += + ":"+pArray[i].class;
    }
    vSep = "`<br>";
  }
  ret += "`";
  return new Handlebars4Code.SafeString(ret);
}

Handlebars4Code.registerHelper('requireattribs', attribs4UMLString);

Handlebars4Code.registerHelper('attribs_uml', attribs4UMLString);

// -----------

function methods4UMLString(pArray) {
  // pArray contains the array of Attributes
  var ret = "";
  var vSep = "";
  var vVis = "-";
  for(var i=0, j=pArray.length; i<j; i++) {
    switch (pArray[i].visibility) {
      case "public":
        vVis = "+";
      break;
      case "private":
        vVis = "-";
      break;
      default:
        vVis = "-";
    }
    ret += vSep + " " + vVis + " `" + pArray[i].name+"(";
    ret += paramTypeString(pArray[i].parameter);
    ret += ")";
    if (pArray[i].return != " ") {
      ret += ":"+pArray[i].return;
    }
    vSep = "`<br>";
  }
  ret += "`";
  return new Handlebars4Code.SafeString(ret);
}

Handlebars4Code.registerHelper('methods_uml', methods4UMLString);

// -----------

function parameterListString(pParamArray,pIndent) {
  var ret = "";
  var vNewLine = "";
  var vComment = "";
  var vExtraIndent = "  ";
  for(var i=0, j=pParamArray.length; i<j; i++) {
    ret += vNewLine +  pParamArray[i].name + ":"+pParamArray[i].class;
    vNewLine = "\n"+pIndent;
    vComment = pParamArray[i].comment;
    if (vComment != "") {
      vComment = vComment.replace(/\n/g,vNewLine+vExtraIndent);
      // Split comment at "\n" and inject the vNewLine indent with additional spaces for the comment
      ret += vNewLine + vExtraIndent + vComment;
    }
  }
  return new Handlebars4Code.SafeString(ret);
}

Handlebars4Code.registerHelper('parameterlist', parameterListString);
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


// -------NPM Export Variable: Handlebars4Code---------------
module.exports = Handlebars4Code;