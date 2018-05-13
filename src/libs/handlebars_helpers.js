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
    };
  } else {
    console.log("value_in_array()-Call pArray undefined");
  };
  return ret;
}

function createHandleBarsCompiler(pDataJSON) {
  for (var tplID in pDataJSON.tpl) {
    if (pDataJSON.tpl.hasOwnProperty(tplID)) {
      pDataJSON.out[tplID] = Handlebars.compile(pDataJSON.tpl[tplID]);
    }
  }
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
  var ret = "";
  ret += '<div class="mybold">';
  ret += options.fn(this);
  ret += '</div>';
  return new Handlebars.SafeString(ret);
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

Handlebars.registerHelper('indent', function(pContext, options) {
  var vIndent = "";
  var vText = "";
  var vCR = "";
  if (options && options.hasOwnProperty("hash")) {
    if (options.hash.hasOwnProperty("text")) {
      //console.log("text='"+options.hash["text"]+"'");
      vText = options.hash["text"];
    };
    if (options.hash.hasOwnProperty("indent")) {
      vIndent = options.hash["indent"];
      //console.log("[indent] Indent for Code in HandleBars: '"+vIndent+"'");
    };
    //vText = options.fn(pContext);
    //console.log("codeindent: vText="+vText.substr(0,120)+"...");
  } else {
    console.log("[indent] options in helper undefined");
  };
  //vIndent = "\n" + vIndent;
  if (vText && (vText != "")) {
    vText = vText.replace(/\n/g,"\n"+vIndent);
  };
  return new Handlebars.SafeString(vIndent+vText);
});



Handlebars.registerHelper('codeindent', function(pContext, options) {
  var vIndent = "";
  var vText = "";
  var vCR = "";
  if (options) {
    if (options.hash.hasOwnProperty("indent")) {
      vIndent = options.hash["indent"];
      //console.log("Indent for Code Coments in HandleBars: '"+vIndent+"'");
    };
    vText = options.fn(pContext);
    //console.log("pContext: "+pContext);
  } else {
    console.log("options in helper 'commentindent' undefined");
  };
  if (pContext) {
    //console.log("Type: "+typeof(pContext)+" '"+pContext+"'");
    vText = pContext;
  };
  //vIndent = "\n" + vIndent;
  if (vText != "") {
    vText = vText.replace(/\n/g,"\n"+vIndent+"  ");
  };
  return vIndent+"  "+vText+"\n";
});

/*
{{lowercase myfilename}}
{{lowercase "My Filename"}}
*/

Handlebars.registerHelper('lowercase', function(pString) {
  var vString = pString.toLowerCase();
  return new Handlebars.SafeString(vString);
});

Handlebars.registerHelper('requirelibs', function(pArray, options) {
  var ret = ""; // return value
  var vSep = ""; // newline separator - empty for first line
  var vMod = "";


  function filename2var(pFile) {
    var vFile = pFile || "undef_require_lib";
    if (vFile.indexOf("/")>=0) {
      vFile = vFile.slice(vFile.lastIndexOf("/")+1);
    };
    vFile = vFile.replace(/[^A-Za-z0-9]/g,"_"); // remove illegial characters in variable name
    return vFile.charAt(0).toUpperCase() + vFile.slice(1);
  };

  for (var i = 0; i < pArray.length; i++) {
    vFile = pArray[i];
    ret += options.fn({"variable":filename2var(vFile),"module":vFile})
  };
  //return new Handlebars.SafeString(ret);
  console.log("Require List:\n"+ret);
  return ret
});

Handlebars.registerHelper('requireclass', function(pSuperClass,pAttribs,pMethods,pBaseClasses,pLocalClasses,pRequirePath, options) {
  var vRequirePath = pRequirePath || "./libs/";
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
      console.log("Base Class '"+pLib+"' index="+value_in_array(pLib,pBaseClasses));
      if ((value_in_array(pLib,pBaseClasses) >= 0) || (pLib == pSuperClass)) {
        console.log("("+pCheckTitle+") Library '"+pLib+"' is a Base Class - no required");
      } else {
        console.log("Local Class '"+pLib+"' index="+value_in_array(pLib,pLocalClasses));
        if (value_in_array(pLib,pLocalClasses) >= 0) {
          // pLib is a local library
          vRequire[pLib] = vRequirePath + name2filename(pLib);
          console.log("("+pCheckTitle+") Library '"+pLib+"' is a Local Class - require('"+vRequire[pLib]+"')");
        } else {
          vRequire[pLib] = name2filename(pLib);
          console.log("("+pCheckTitle+") Library '"+pLib+"' is a Remote Class - require('"+vRequire[pLib]+"')");
        };
      };
    };
  }; //END: addlib_check()

  console.log("Call Helper: requireclasslist - superclass='"+pSuperClass+"' require_path='"+vRequirePath+"'");
  for (var i=0; i<pAttribs.length; i++) {
    // populate vRequire with classes that a needed as
    // constructors for attributes
    addlib_check("Attribute",pAttribs[i].class);
  };
  for (var i=0; i<pMethods.length; i++) {
    // populate vRequire with classes that a needed as
    // constructors for returned instances of those classes
    addlib_check("Method "+pMethods[i].name+"() Return",pMethods[i].return);
    vPars = pMethods[i].parameter;
    for (var k=0; k<vPars.length; k++) {
      addlib_check("Parameter "+pMethods[i].name+"()",vPars[k].class);
    };
  };
  // vRequire is a Hash therefore double usage of classes
  // in attributes and returns of methods lead just to one
  // require call in the list
  var vSep = "";
  for (var iLib in vRequire) {
    if (vRequire.hasOwnProperty(iLib)) {
      ret += options.fn({"variable":iLib,"module":vRequire[iLib]})
      //ret += vSep + "const " + iLib + " = require('" + vRequire[iLib]+"');";
      vSep = "\n";
    }
  };
  //return new Handlebars.SafeString(ret);
  console.log("Require List:\n"+ret);
  return ret;
});

Handlebars.registerHelper('removereturn', function(pString) {
  var vString = pString.replace(/\n/g," - ");
  return new Handlebars.SafeString(vString);
});


function name2filename(pName) {
  var vFilename = pName.toLowerCase();
  vFilename = vFilename.replace(/[^a-z0-9]/g,"_");
  vFilename = vFilename.replace(/_[_]+/g,"_");
  return vFilename;
}


Handlebars.registerHelper('filename', function(pString) {
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

  return new Handlebars.SafeString(ret);
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

Handlebars.registerHelper('requireattribs', attribs4UMLString);

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
  return ret;
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
