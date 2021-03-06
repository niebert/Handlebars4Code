// --- CodeGen Version: 1.0.0 -------------
var fs = require('fs');
var concat = require('concat-files');

function replaceString(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	var vReturnString = '';
	//alert("cstring.js - replaceString() "+pString);
	pString = pString || "undefined string parameter in replaceString() call ";
	if (!pString) {
		console.log("replaceString()-Call - pString not defined!");
	} else if (pString != '') {
		var vHelpString = '';
    var vN = pString.indexOf(pSearch);
		while ( vN+1 > 0 ) {
			if (vN > 0) {
				vReturnString += pString.substring(0, vN);
			};
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return (vReturnString + pString);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDevLibs4readme(pkg) {
	var vOut = "\n## Libraries for Building and Developement";
	vOut += "\nThe following libraries are necessary for building the `"+pkg.name+"`. ";
	vOut += "\nThese libraries are not included in `"+pkg.name+".js`, but e.g. are required in `build.js`.";
	for (var lib in pkg.devDependencies) {
		if (pkg.devDependencies.hasOwnProperty(lib)) {
			vOut += "\n* Lib: `"+lib+"` Version: `"+pkg.devDependencies[lib]+"`"
		};
	};
	vOut +="\n\n"
	return vOut
}

function getLibs4readme(pkg) {
	var vOut = "\n## Libraries required for  `"+pkg.exportvar+"`";
	vOut += "\nThe following libraries are necessary for `"+pkg.name+".js`:";
	for (var lib in pkg.dependencies) {
		if (pkg.dependencies.hasOwnProperty(lib)) {
			vOut += "\n* Lib: `"+lib+"` Version: `"+pkg.dependencies[lib]+"`"
		};
	};
	vOut +="\n\n"
	return vOut
}

function replaceJSON(pContent,pJSON) {
  for (var id in pJSON) {
    if (pJSON.hasOwnProperty(id)) {
			if (typeof(pJSON[id]) === 'string') {
      	pContent = replaceString(pContent,"{{"+id+"}}",pJSON[id]);
			}
    }
  }
  return pContent;
}

function replaceFileOutput(pContent,pkg) {
	pContent = replaceJSON(pContent,pkg);
	return pContent
}


function load_file (pFilename) {
  //var fs = require('fs');
  var vContent = fs.readFileSync(pFilename, 'utf8');
  //console.log(vContent);
  if (vContent) {
    console.log("load_file('" + pFilename + "') was sucessful");
  } else {
    vContent = " ";
    console.log("WARNING: load_file('" + pFilename + "') has no content");
  }
  return vContent;
}

function save_file(pFilename, pContent) {
  fs.writeFile(pFilename, pContent, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file '" + pFilename + "' was saved!");
  });
}

function load_json(pFilename) {
  // vJSON = require(pFilename);
  var vJSONstring = load_file(pFilename);
  var vJSON = null;
  try {
    vJSON = JSON.parse(vJSONstring);
    console.log("load_json('" + pFilename + "')");
    // console.log(JSON.parse(vJSONstring));
  } catch (objError) {
    if (objError instanceof SyntaxError) {
        console.err(objError.name);
    } else {
        console.err(objError.message);
    }
    vJSON = null;
  }
  return vJSON;
}

function save_json(pFilename, pJSON) {
  var vContent = JSON.stringify(pJSON,null,4);
  save_file(pFilename,vContent);
}

function concat_files_to_string(pFileArr) {
  var vOut = "";
  for (var i = 0; i < pFileArr.length; i++) {
    vOut += load_file(pFileArr[i]);
  }
  return vOut;
}

function is_function (obj) {
  // test if an object is a function
  return !!(obj && obj.constructor && obj.call && obj.apply);
}


function getConvertedFile4JSON(srcPath,pJSON) {
	fs.readFile(srcPath, 'utf8', function(err, contents) {
    console.log(processJSON(contents,pJSON));
	});

}

function processJSON(pContent,pJSON) {
	for (var key in pJSON) {
		if (pJSON.hasOwnProperty(key)) {
			var vSearch = "___PKG_"+key.toUpperCase()+"___";
			if (pJSON[key]) {}
			console.log("CONVERT: key='"+key+"' vSearch='"+vSearch+"'");
			pContent = replaceString(pContent,vSearch,pJSON[key])
		}
	};
	//console.log("REPLACE: "+pContent);
	return pContent
}

function writeConvertJSON(srcPath, savPath, pJSON) {
  fs.readFile(srcPath, 'utf8', function(err, contents) {
    var vContent = processJSON(contents,pJSON);
    if (vContent) {
      fs.writeFile (savPath, vContent, function(err) {
          if (err) throw err;
              console.log('writeConvertJSON("'+savPath+'","'+srcPath+'",pJSON)-Call complete');
          }
      );
    } else {
      console.log("ERROR writeConvertJSON(): generating '"+savPath+"' failed - no content generated\n");
      throw err;
    }
	});
}
/*
var pkg_test = {
	"name":"handlebars4code5",
	"exportvar":"Handlebars4Code5",
	"githubuser":"myusername"
}
//writeConvertJSON('./src/readme/folderrepo.md','./src/readme/folderrepo.test.md',pkg_test);
console.log(getConvertedFile4JSON('./src/readme/folderrepo.md',pkg_test));
*/

function concat_libraries(pFilename,pLibArray,pkg) {
  var vMainJS = pFilename || "./dist/"+pkg.name+".js";
  concat_libs(vMainJS,pLibArray);
}

function concat_main(pFilename,pLibArray,pkg) {
  concat_libs(pFilename,pLibArray);
  var vLibTailArray = clone_json(pLibArray);
  vLibTailArray.push('./src/npm_tail.js');
  var vMainJS = "./"+pkg.main;
  concat_libs(vMainJS,vLibTailArray);
}

function create_script_tags4libs(pFilename,pLibArray,pkg) {
	var vLibURL = [];
	for (var i = 0; i < pLibArray.length; i++) {
		vLibURL.push("../"+pLibArray[i]);
	};
	var vPrefix = "\n<script src='";
	var vPostfix = "'></script>";
	var vOut = "<!-- HTML code for embedding the source libraries into docs/index_src_libs.html -->";
	vOut += vPrefix + vLibURL.join(vPostfix+vPrefix) + vPostfix;
  save_file(pFilename,vOut, "Save '"+pFilename+"' as HTML code for embedding the source libraries");
}


function concat_libs(pFilename,pLibArray) {
  console.log("Create Library '"+pFilename+"'");
  concat(pLibArray, pFilename, function(err) {
      if (err) {
        console.log("ERROR: generating '"+pFilename+"'\n"+err);
        throw err;
      }
      console.log("File: '"+pFilename+"' generated for libraries successfully!\n  Libs:\n     "+pLibArray.join("\n     "));
    });
}

function concat_html(pFilename,pFileArray,pkg) {
    console.log("Create HTML '"+pFilename+"'");
    concat(pFileArray, pFilename, function(err) {
        if (err) {
          console.log("ERROR: generating HTML '"+pFilename+"'\n"+err);
          throw err;
        }
        console.log("File: '"+pFilename+"' generated for HTML parts successfully!\n  HTML files:\n     "+pFileArray.join("\n     "));
    });

}

function concat_css(pFilename,pFileArray,pkg) {
    console.log("Create CSS '"+pFilename+"'");
    concat(pFileArray, pFilename, function(err) {
        if (err) {
          console.log("ERROR: generating CSS '"+pFilename+"'\n"+err);
          throw err;
        }
        console.log("File: '"+pFilename+"' generated from CSS style sheet files successfully!\n  CSS files:\n     "+pFileArray.join("\n     "));
    });

}

function concat_readme(pFilename,pFileArray,pkg) {
    console.log("Create README file '"+pFilename+"'");
    concat(pFileArray, pFilename, function(err) {
        if (err) {
          console.log("ERROR: generating HTML '"+pFilename+"'\n"+err);
          throw err
        }
        console.log("File: '"+pFilename+"' generated for HTML parts successfully!\n  README files:\n     "+pFileArray.join("\n     "));
    });

}


function outTime(pNr) {
	var vOut = pNr;
	if (pNr == 0) {
		vOut = "00"
	} if (pNr<10) {
		vOut = "0"+pNr;
	};
	return vOut
}


function getDateTime() {
	var vNow = new Date();
	var vSep = "/"; // set separator for date
	var vOut = vNow.getFullYear() + vSep +outTime(vNow.getMonth()+1) + vSep + outTime(vNow.getDate());
  vOut += " "; // Separator between Date and Time
	vSep = ":"; // set separator for time
	vOut += vNow.getHours() + vSep + outTime(vNow.getMinutes()) + vSep + outTime(vNow.getSeconds());
	return vOut;
}

function create_header(pkg) {
  var vFileName = "npm_header.js";
  var vHeader = "/* ---------------------------------------";
  vHeader += "\n Exported Module Variable: "+pkg.exportvar;
  vHeader += "\n Package:  "+pkg.name;
  vHeader += "\n Version:  "+pkg.version + "  Date: "+getDateTime();
  vHeader += "\n Homepage: "+pkg.homepage;
  vHeader += "\n Author:   "+pkg.author;
  vHeader += "\n License:  "+pkg.license;
	vHeader += "\n Date:     "+getDateTime();
  if (pkg.hasOwnProperty("inherit")) {
    vHeader += "\n Inheritance: '"+pkg.exportvar+"' inherits from '"+pkg.inherit+"'";
  }
  vHeader += "\n Require Module with:";
  vHeader += "\n    const "+pkg.exportvar+" = require('" + pkg.name+ "');";
	if (pkg.is_constructor && pkg.is_constructor == true ) {
		vHeader += "\n    var v" + pkg.name+ " = new "+pkg.exportvar+"();";
	}
  //vHeader += "\n    var  compileCode = "+pkg.exportvar+".compile(vTemplate);";
  vHeader += "\n JSHint: installation with 'npm install jshint -g'";
  vHeader += "\n ------------------------------------------ */";
  vHeader += "\n";
  vHeader += "\n/*jshint  laxcomma: true, asi: true, maxerr: 150 */";
  vHeader += "\n/*global alert, confirm, console, prompt */";
  vHeader += "\n";
  save_file("./src/"+vFileName , vHeader,"Module Header file 'src/"+vFileName +"' was saved!");
}

function create_tail(pkg) {
  var vTail = "\n";
  var vFileName = "npm_tail.js";
  vTail += "\n// -------NPM Export Variable: " +pkg.exportvar+ "---------------";
  //vTail += "\nmodule.exports = "+pkg.exportvar+";";
  vTail += "\nmodule.exports = "+pkg.exportvar+";";
  save_file("./src/"+vFileName, vTail,"Module Header file 'src/"+vFileName+"' was saved!");
}

function create_inherit(pkg) {
  var vInherit = "\n";
  var vFileName = "npm_inherit.js";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n//---Super Class------------------------";
    vInherit += "\n// Inheritance: '"+pkg.exportvar+"' inherits from '"+pkg.inherit+"'";
    vInherit += "\n"+pkg.exportvar+".prototype = new "+pkg.inherit+"();";
    vInherit += "\n// Constructor for instances of '"+pkg.exportvar+"' has to updated.";
    vInherit += "\n// Otherwise constructor of '"+pkg.inherit+"' is called";
    vInherit += "\n"+pkg.exportvar+".prototype.constructor="+pkg.exportvar+";";
    vInherit += "\n// see http://phrogz.net/js/classes/OOPinJS2.html for explanation";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n";
  }
  save_file("./src/"+vFileName, vInherit,"create Inheritage code file 'src/"+vFileName+"' was saved!");
}


function create_inherit_static(pkg) {
  var vInherit = "\n";
	var vFileName = "npm_inherit.js";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n//---Extend Module----------------------";
    vInherit += "\n// The module '"+pkg.exportvar+"' extends '"+pkg.inherit+"' and";
    vInherit += "\n// inherits all attributes and methods form '"+pkg.inherit+"'";
    vInherit += "\n"+pkg.exportvar+" = "+pkg.inherit+";";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n";
  }
  save_file("./src/"+vFileName, vInherit,"create Inheritage code file 'src/"+vFileName+"' was saved!");
}

function create_inherit_require(pkg) {
  var vInherit = "\n";
	var vFileName = "npm_inherit.js";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n//---Require Module---------------------";
    vInherit += "\n// The module '"+pkg.exportvar+"' extends '"+pkg.inherit+"' and";
    vInherit += "\n// inherits all attributes and methods form '"+pkg.inherit+"'";
    vInherit += "\nlet "+pkg.inherit+" = require('"+(pkg.inherit).toLowerCase()+"');";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n";
  }
  save_file("./src/"+vFileName, vInherit,"create Inheritage code file 'src/"+vFileName+"' was saved!");
}

function create_html_title(pkg) {
	var vFileName = "html_title.html";
  var vOut = `
      <title>` + pkg.exportvar + `</title>
      <meta http-equiv="author" content="`+pkg.author+`">
`;

	save_file("./src/"+vFileName, vOut,"create HTML Title code - file 'src/"+vFileName+"' was saved!");
}

function create_html_description(pkg) {
  var vFileName = "html_description.html";
  var vOut = "";
  vOut += "\nThe library <tt>"+pkg.exportvar+"</tt> is a "+pkg.description+". ";
  vOut += "\nThe source code of  "+pkg.exportvar+" can be downloaded as <a href=\"https://github.com/"+pkg.githubuser+"/" +pkg.exportvar+"/archive/master.zip\"  target=\"_blank\">ZIP-file "+pkg.name+".zip</a>";
  vOut += "\n";
  save_file("./src/"+vFileName, vOut,"create HTML code - 'src/"+vFileName+"' was saved!");
}

function create_html_tail(pkg) {
	var vFileName = "html_tail.html";
	var vRepo = pkg.repository.url;
	var vBegin = vRepo.indexOf("https:");
	var vEnd = vRepo.lastIndexOf(".git");
	var vURL = "https://www.github.com/" + pkg.githubuser + "/" + pkg.exportvar;
	if ((vBegin >= 0) && (vEnd > vBegin)) {
		vURL = vRepo.substring(vBegin,vEnd);
	};
  var vOut = `
	   <!-- BEGIN: src/`+vFileName+` -->
	   <center style="font-size: 10px;">
			  <a href="`+vURL+`" target="_blank"> GitHub Sources `+pkg.exportvar+`</a> - <a href="`+ vURL +`/archive/master.zip"  target="_blank">Download `+pkg.exportvar+` ZIP</a>
			  <br>
			  Version: `+pkg.version+` Date: `+getDateTime()+` Author: `+pkg.author+`
	   </center>
     <!-- END:  src/`+vFileName+` -->

	`;
	save_file("./src/"+vFileName, vOut,"HTML Title code file 'src/"+vFileName+"' was saved!");
}

function create_readme_header(pkg) {
  var vFileName = "readme_header.md";
	var vOut = "";
  vOut += "# "+pkg.exportvar;
  vOut += "\n`"+pkg.exportvar+"` is a "+pkg.description;
	if (pkg.hasOwnProperty("demolink")) {
		vOut += "\n* **[Demo "+pkg.exportvar+"](" + pkg.demolink + ")**";
	}
  vOut += "\n";
  save_file("./src/"+vFileName, vOut,"README.md code file 'src/"+vFileName+"' was saved!");
}

function create_readme_install(pkg) {
  var vFileName = "readme_install.md";
  var vOut = "\n";
	vOut += "\n## Installation `"+pkg.exportvar+"`";
	vOut += "\nThere are two main types to use `"+pkg.exportvar+"` for you projects. With a `script`-tag in your HTML file or with a package manager like [NPM](https://www.npmjs.com/) with [NodeJS]()";
	vOut += "\n### Installation `"+pkg.exportvar+"` with NPM for Scripts";
	vOut += "\nAssume you have NPM installed and your have created e.g. a folder `mypackage/` for your package with `package.json` in the folder `. Go to the folder `mypackage/` and call";
	vOut += "\n```javascript";
	vOut += "\nnpm install "+pkg.name+" --save";
	vOut += "\n```";
	vOut += "\nThen you will find `"+pkg.name+"` in the folder `mypackage/node_modules/"+pkg.name+"`.";
 	vOut += "\nIf you want to use `"+pkg.exportvar+"` in your scripts use the following require-call:";
	vOut += "\n```javascript";
	vOut += "\nconst  "+pkg.exportvar+" = require('"+pkg.name+"');";
  vOut += "\n```";
	vOut += "\nNow it is possible to use `"+pkg.exportvar+"` in your scripts.";
  vOut += "\n### Installation `"+pkg.exportvar+"` for Browser for Scripts-Tags";
	vOut += "\nIf you want to use the library `"+pkg.name+".js` in a browser, please copy the file `dist/"+pkg.name+".js` into your library folder (e.g. `/js`) and"
  vOut += "\nimport the library with `script`-tag with:";
  vOut += "\n```html";
	vOut += "\n<script src=\"js/"+pkg.name+".js\"></script>";
  vOut += "\n```";
  vOut += "\nNow it is possible to use `"+pkg.exportvar+"` in your other imported scripts.";
  vOut += "\n";
  save_file("./src/"+vFileName, vOut,"README.md code file 'src/"+vFileName+"' was saved!");
}

function create_readme_devlibs(pkg) {
  var vFileName = "readme_devlibs.md";
  var vOut = "";
  vOut += getLibs4readme(pkg);
  vOut += getDevLibs4readme(pkg);
  save_file("./src/"+vFileName, vOut,"README.md code file 'src/"+vFileName+"' was saved!");
}

function create_readme_inherit(pkg) {
  var vInherit = "\n";
  var vFileName = "readme_inherit.md";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n## Extension with a Super Class";
    vInherit += "\nThe library `"+pkg.exportvar+"` extends the library `"+pkg.inherit+"` and `"+pkg.exportvar+"` inherits all attributes and methods from `"+pkg.inherit+"` ";
    vInherit += "\nThe  inheritance for `"+pkg.exportvar+"`  from `"+pkg.inherit+"` can defined with the following code:";
    vInherit += "\n```javascript";
    vInherit += "\n"+pkg.exportvar+" = "+pkg.inherit+";";
    vInherit += "\n"+pkg.exportvar.mymethod+" = function (param1,param2) {\n   ...\n};";
    vInherit += "\n```";
    vInherit += "\nNow the library `"+pkg.exportvar+"` has an additional method `mymethod()`.";
    vInherit += "\n";
  }
  save_file("./src/"+vFileName, vInherit,"Inheritage README file 'src/"+vFileName+"' was saved!");
}

function create_readme_inherit_static(pkg) {
  var vInherit = "\n";
  var vFileName = "readme_inherit.md";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n## Extension of Library `"+pkg.inherit+"`";
    vInherit += "\nThe library `"+pkg.exportvar+"` extends the library `"+pkg.inherit+"` with additional feature and an extended API, so  `"+pkg.exportvar+"` inherits all attributes and methods from `"+pkg.inherit+"` ";
    vInherit += "\nThe extension for `"+pkg.exportvar+"`  from `"+pkg.inherit+"` can defined with the following code:";
    vInherit += "\n```javascript";
    vInherit += "\n"+pkg.exportvar+".prototype = new "+pkg.inherit+"();";
    vInherit += "\n// Constructor for instances of '"+pkg.exportvar+"' must be updated.";
    vInherit += "\n// Otherwise constructor of '"+pkg.inherit+"' is called";
    vInherit += "\n"+pkg.exportvar+".prototype.constructor="+pkg.exportvar+";";
    vInherit += "\n```";
    vInherit += "\nFor further details see http://phrogz.net/js/classes/OOPinJS2.html and explanation for inheritance with JavaScript.";
    vInherit += "\n";
  }
  save_file("./src/"+vFileName, vInherit,"Inheritage README file 'src/"+vFileName+"' was saved!");
}


function create_readme_tail(pkg) {
  var vFileName = "readme_tail.md";
  var vOut = "## NPM Library Information";
  vOut += "\n* Exported Module Variable: `"+pkg.exportvar+"`";
  vOut += "\n* Package:  `"+pkg.name+"`";
  vOut += "\n* Version:  `"+pkg.version + "`   (last build "+getDateTime()+")";
  vOut += "\n* Homepage: `"+pkg.homepage+"`";
  vOut += "\n* License:  "+pkg.license;
	vOut += "\n* Date:     "+getDateTime();
  if (pkg.hasOwnProperty("inherit")) {
    vOut += "\n* Inheritance: `"+pkg.exportvar+"` inherits from `"+pkg.inherit+"`";
  }
  vOut += "\n* Require Module with:";
  vOut += "\n```javascript";
  vOut += "\n    const v"+pkg.exportvar+" = require('" + pkg.name+ "');";
  vOut += "\n```";
  vOut += "\n* JSHint: installation can be performed with `npm install jshint -g`";
  vOut += "\n";
  save_file("./src/"+vFileName , vOut,"create README content - file 'src/"+vFileName +"' was saved!");
}

function clone_json(pJSON) {
  var vJSON = {};
  if (pJSON) {
    vJSON = JSON.parse(JSON.stringify(pJSON));
  } else {
    console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
  }
  return vJSON;
}

module.exports = {
	"capitalizeFirstLetter":capitalizeFirstLetter,
	"is_function": is_function,
  "load_file": load_file,
  "save_file": save_file,
  "load_json": load_json,
  "save_json": save_json,
	"concat_files_to_string": concat_files_to_string,
  "concat_libs":concat_libs,
  "concat_main":concat_main,
  "concat_html":concat_html,
  "concat_css":concat_css,
  "concat_readme":concat_readme,
  "concat_libraries":concat_libraries,
  "create_header": create_header,
  "create_inherit": create_inherit,
  "create_inherit_static": create_inherit_static,
  "create_tail": create_tail,
  "create_html_title":create_html_title,
  "create_html_description":create_html_description,
  "create_html_tail":create_html_tail,
  "create_readme_header": create_readme_header,
	"create_readme_install":create_readme_install,
  "create_readme_inherit": create_readme_inherit,
  "create_readme_inherit_static": create_readme_inherit_static,
  "create_readme_devlibs": create_readme_devlibs,
  "create_readme_tail": create_readme_tail,
	"create_script_tags4libs": create_script_tags4libs,
  "write_convert_json": writeConvertJSON
};
