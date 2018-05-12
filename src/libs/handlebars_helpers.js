
/* vDataJSON is the main JSON data storage defined in index.html
  vDataJSON is provided as parameter to createHandleBarsCompiler(pDataJSON)
   * createHandleBarsCompiler() expects a hash key "tpl" containing the templates.
   * createHandleBarsCompiler() generates HandleBars compiler functions
     in pDataJSON["out"] for all keys pDataJSON["tpl"]
  create for all templates in the hash vDataJSON["tpl"] a Handlebars compiler
  e.g. vDataJSON["tpl"]["javascript"] is a Handlebars template for Javascript

Create all Handlebars4Code compiler with:

Handlebars4Code.get_compiler(vDataJSON[]);

vDataJSON["out"] = Handlebars4Code.get_compiler();

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
  };
  return vJSON;
}

function replaceString(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (vN >= 0)
		{
			if (vN > 0)
				vReturnString += pString.substring(0, vN);
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
}


// Use helper in Template with:
// {{#ifcond var1 '==' var2}}
//   ...
// {{/ifcond}}

Handlebars.registerHelper('ifcond', function (v1, operator, v2, options) {

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

Handlebars.registerHelper('bold', function(options) {
  return new Handlebars.SafeString(
      '<div class="mybold">'
      + options.fn(this)
      + '</div>');
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

Handlebars.registerHelper('listhtml', function(context, options) {
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

Handlebars.registerHelper('eachparam', function(context, pClassname,options) {

  var vText =  context.map(function(item) {
    return "" + options.fn(item) + "";
  }).join("\n");

  for (var varID in options.hash) {
    if (options.hash.hasOwnProperty(varID)) {
      console.log("eachparam options.hash['"+varID+"']='"+options.hash[varID]+"'");
      vText = vText.replace(new RegExp('{{' + varID + '}}', 'g'), options.hash[varID])
    }
  };
  return vText
});

Handlebars.registerHelper('foreach', function(pArray, pData, options) {
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
  };
  return ret
});


Handlebars.registerHelper('listhtmlattr', function(context, options) {
  var attrs = Object.keys(options.hash).map(function(key) {
    return key + '="' + options.hash[key] + '"';
  }).join(" ");

  return "<ul " + attrs + ">" + context.map(function(item) {
    return "<li>" + options.fn(item) + "</li>";
  }).join("\n") + "</ul>";
});

Handlebars.registerHelper('codeindent', function(pContext, options) {
  var vIndent = "";
  var vText = "";
  var vCR = "";
  if (options && options.hasOwnProperty("hash")) {
    if (options.hash.hasOwnProperty("indent")) {
      vIndent = options.hash["indent"];
      console.log("[codeindent] Indent for Code in HandleBars: '"+vIndent+"'");
    };
    vText = options.fn(pContext);
    console.log("[codeindent] vText="+vText.substr(0,120)+"...");
  } else {
    console.log("[codeindent] options in helper undefined");
  };
  //vIndent = "\n" + vIndent;
  if (vText && (vText != "")) {
    vText = vText.replace(/\n/g,"\n"+vIndent+"  ");
  };
  return new Handlebars.SafeString(vIndent+"  "+vText+"\n");
});

Handlebars.registerHelper('indent', function(pContext, options) {
  var vIndent = "";
  var vText = "";
  var vCR = "";
  if (options && options.hasOwnProperty("hash")) {
    if (options.hash.hasOwnProperty("text")) {
      console.log("text='"+options.hash["text"]+"'");
      vText = options.hash["text"];
    };
    if (options.hash.hasOwnProperty("indent")) {
      vIndent = options.hash["indent"];
      console.log("[indent] Indent for Code in HandleBars: '"+vIndent+"'");
    };
    //vText = options.fn(pContext);
    console.log("codeindent: vText="+vText.substr(0,120)+"...");
  } else {
    console.log("[indent] options in helper undefined");
  };
  //vIndent = "\n" + vIndent;
  if (vText && (vText != "")) {
    vText = vText.replace(/\n/g,"\n"+vIndent);
  };
  return new Handlebars.SafeString(vIndent+vText);
});

/*
{{lowercase myfilename}}
{{lowercase "My Filename"}}
*/

Handlebars.registerHelper('lowercase', function(pString) {
  var vString = pString.toLowerCase();
  return new Handlebars.SafeString(vString);
});

Handlebars.registerHelper('require_class_list', function(pSuperClass,pAttribs,pMethods,pBaseClasses,pExtendedClasses,pRequirePath) {
  var ret = "";
  // vRequire is a Hash that collects all classes
  // that are needed to create attributes or
  // create a return class of the type.
  var vRequire = {};
  var vLib = "";
  for (var i=0; i<pAttribs.length; i++) {
    // populate vRequire with classes that a needed as
    // constructors for attributes
    vLib = pAttribs[i].class;
    if (vLib != "") {
      // constructors are required if the class is NOT a base class
      // so class/library is added if an only if it is not a base class
      if (value_in_array(vLib,pBaseClasses) >= 0) {
        console.log("Library '"+vLib+"' is a Base Class - no required");
      } else {
        if (vLib != pSuperClass) {
          if (value_in_array(vLib,pExtendedClasses) >= 0) {
            console.log("Library '"+vLib+"' is an Exte Class - no required");
            // vLib is a local library
            vRequire[vLib] = pRequirePath + name2filename(vLib);
          } else {
            vRequire[vLib] = name2filename(vLib);
          };
        }
      };
    };
  };
  for (var i=0; i<pMethods.length; i++) {
    // populate vRequire with classes that a needed as
    // constructors for returned instances of those classes
    vLib = pMethods[i].return;
    if (vLib != "") {
      // constructors are required if the class is NOT a base class
      // so class/library is added if an only if it is not a base class
      if (value_in_array(vLib,pBaseClasses) == true) {
        if (value_in_array(vLib,pExtendedClasses) == true) {
          // vLib is a local library
          vRequire[vLib] = pRequirePath + name2filename(vLib);
        } else {
          vRequire[vLib] = name2filename(vLib);
        };
      };
    };
  };
  // vRequire is a Hash therefore double usage of classes
  // in attributes and returns of methods lead just to one
  // require call in the list
  var vSep = "";
  for (var iLib in vRequire) {
    if (vRequire.hasOwnProperty(iLib)) {
      ret += vSep + "const " + iLib + " = require('" + vRequire[iLib]+"');";
      vSep = "\n";
    }
  };
  return new Handlebars.SafeString(ret);
});

Handlebars.registerHelper('removereturn', function(pString) {
  var vString = pString.replace(/\n/g," - ");
  return new Handlebars.SafeString(vString);
});


function name2filename(pFilename) {
  var vFilename = pFilename || "undefined file";
  vFilename = vFilename.toLowerCase(vFilename);
  vFilename = vFilename.replace(/[^a-z0-9]/g,"_");
  vFilename = vFilename.replace(/_[_]+/g,"_");
  return vFilename;
}


Handlebars.registerHelper('filename', function(pString) {
   var vText = pString || "no_filename";
   return new Handlebars.SafeString(name2filename(vText));
});

// -----------

function paramCallString(pParamArray) {
  var ret = "";
  var vComma = "";

  for(var i=0, j=pParamArray.length; i<j; i++) {
    ret += vComma +  pParamArray[i].name;
    vComma = ",";
  };

  return new Handlebars.SafeString(ret);
}

Handlebars.registerHelper('paramcall', paramCallString);

// -----------

function paramTypeString(pParamArray) {
  // creates from JSON parameters of a method the variable list with types
  var ret = "";
  var vComma = "";
  if (pParamArray) {
    for(var i=0, j=pParamArray.length; i<j; i++) {
      ret += vComma +  pParamArray[i].name+":"+pParamArray[i].class;
      vComma = ",";
    };
  } else {
    console.log("No pParamArray in 'paramcall' helper.");
  }

  return ret;
}

Handlebars.registerHelper('paramtype', paramTypeString);
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
    };
    ret += vSep + " " + vVis + " " + pArray[i].name+":"+pArray[i].class;
    vSep = "<br>";
  };
  return new Handlebars.SafeString(ret);
}

Handlebars.registerHelper('require_attribs', attribs4UMLString);

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
    };
    ret += vSep + " " + vVis + " " + pArray[i].name+":"+pArray[i].class;
    vSep = "<br>";
  };
  return new Handlebars.SafeString(ret);
}

Handlebars.registerHelper('attribs_uml', attribs4UMLString);

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
      case "public":
        vVis = "-";
      break;
      default:
        vVis = "-";
    };
    ret += vSep + " " + vVis + " " + pArray[i].name+"(";
    ret += paramTypeString(pArray[i].parameter);
    ret += ")";
    if (pArray[i].return != "") {
      ret += ":"+pArray[i].return
    };
    vSep = "<br>";
  };
  return new Handlebars.SafeString(ret);
}

Handlebars.registerHelper('methods_uml', methods4UMLString);

// -----------

function parameterListString(pParamArray,pIndent) {
  var ret = "";
  var vNewLine = "";
  var vComment = "";
  var vExtraIndent = "  "
  for(var i=0, j=pParamArray.length; i<j; i++) {
    ret += vNewLine +  pParamArray[i].name + ":"+pParamArray[i].class;
    vNewLine = "\n"+pIndent;
    vComment = pParamArray[i].comment;
    if (vComment != "") {
      vComment = vComment.replace(/\n/g,vNewLine+vExtraIndent);
      // Split comment at "\n" and inject the vNewLine indent with additional spaces for the comment
      ret += vNewLine + vExtraIndent + vComment;
    };
  };
  return new Handlebars.SafeString(ret);
}

Handlebars.registerHelper('parameterlist', parameterListString);

// -----------
