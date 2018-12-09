var fs = require('fs');
var concat = require('concat-files');

function replaceString(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (!pString) {
		alert("replaceString()-Call - pString not defined!");
	} else if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (this.greater(vN+1,0)) {
			if (this.greater(vN , 0)) {
				vReturnString += pString.substring(0, vN);
			};
			vReturnString += pReplace;
            if (this.lower(vN + pSearch.length , pString.length)) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
};

function getDevLibs4readme(pkg) {
	var vOut = "\n\n## Libraries for Developement";
	vOut += "\nThe following libraries are necessary for building the `"+pkg.name+"`":
	for (var lib in pkg.devDependencies) {
		if (pkg.devDependencies.hasOwnProperty(lib)) {
			"\n* Lib: `"+lib+"` Version: `"+pkg.devDependencies[lib]+"`"
		};
	};
	vOut +="\n"
	return vOut
}

function replaceJSON(pContent,pJSON) {
  for (var id in pJSON) {
    if (pJSON.hasOwnProperty(id)) {
			if (typeof(pJSON[id]) === 'string') {
      	pContent = replaceString(pContent,"{{"+id+"}}",pJSON[id]);
			}
    }
  };
  return pContent
}

function replaceFileOutput(pContent,pkg) {
	pContent = replaceJSON(pContent,pkg);
	return pContent
}

function save_file(pFilename,pContent, pMessage) {
  var vMessage = pMessage || "File '"+pFilename+"' was saved!";
  fs.writeFile(pFilename, pContent, function(err) {
      if(err) {
          return console.log(err);
      };
      console.log(vMessage);
  });

};

function concat_main(pFilename,pLibArray,pkg) {
  var vLibTailArray = clone_json(pLibArray);
  vLibTailArray.push('./src/npm_tail.js');
  var vMainJS = pFilename || "./"+pkg.main;
  concat_libs(vMainJS,vLibTailArray);
}

function concat_libraries(pFilename,pLibArray,pkg) {
  concat_libs(pFilename,pLibArray);
  var vLibTailArray = clone_json(pLibArray);
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

function concat_html(pFilename,pFileArray,pkg) {
    console.log("Create HTML '"+pFilename+"'");
    concat(pFileArray, pFilename, function(err) {
        if (err) {
          console.log("ERROR: generating HTML '"+pFilename+"'\n"+err);
          throw err
        };
        console.log("File: '"+pFilename+"' generated for HTML parts successfully!\n  HTML files:\n     "+pLibArray.join("\n     "));
    });

};


function outTime(pNr) {
	var vOut = pNr;
	if (pNr == 0) {
		vOut = "00"
	} if (pNr<10) {
		vOut = "0"+pNr;
	};
	return vOut
};


function getDateTime() {
	var vNow = new Date();
	var vSep = "/"; // set separator for date
	var vOut = vNow.getFullYear() + vSep +outTime(vNow.getMonth()+1) + vSep + outTime(vNow.getDate());
  vOut += " "; // Separator between Date and Time
	vSep = ":"; // set separator for time
	vOut += vNow.getHours() + vSep + outTime(vNow.getMinutes()) + vSep + outTime(vNow.getSeconds());
	return vOut;
};

function create_header(pkg) {

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
  };
  vHeader += "\n Require Module with:";
  vHeader += "\n    const "+pkg.exportvar+" = require('" + pkg.name+ "');";
  vHeader += "\n    var  compileCode = "+pkg.exportvar+".compile(vTemplate);";
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
  vTail += "\n// -------NPM Export Variable: " +pkg.exportvar+ "---------------";
  //vTail += "\nmodule.exports = "+pkg.exportvar+";";
  vTail += "\nmodule.exports = "+pkg.exportvar+";";
  save_file("./src/npm_tail.js", vTail,"Module Header file 'src/npm_tail.js' was saved!");
}

function create_inherit(pkg) {
  var vInherit = "\n";
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
  };
  save_file("./src/npm_inherit.js", vInherit,"Inheritage code file 'src/npm_inherit.js' was saved!");
}


function create_inherit_static(pkg) {
  var vInherit = "\n";
  if (pkg.hasOwnProperty("inherit")) {
    vInherit += "\n";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n//---Extend Module----------------------";
    vInherit += "\n// The module '"+pkg.exportvar+"' extends '"+pkg.inherit+"' and";
    vInherit += "\n// inherits all attributes and methods form '"+pkg.inherit+"'";
    vInherit += "\n"+pkg.exportvar+" = "+pkg.inherit+";";
    vInherit += "\n//--------------------------------------";
    vInherit += "\n";
  };
  save_file("./src/npm_inherit.js", vInherit,"Inheritage code file 'src/npm_inherit.js' was saved!");
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
  "concat_main":concat_main,
  "concat_html":concat_main,
  "concat_libraries":concat_libraries,
  "create_header": create_header,
  "create_inherit": create_inherit,
  "create_inherit_static": create_inherit_static,
  "create_tail": create_tail
};
