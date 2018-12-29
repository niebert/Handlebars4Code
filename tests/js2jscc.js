var fs = require('fs');

// Script DOES not work for static classes
//require('handlebars');

var vConstructor = require('../src/main.js');
const Handlebars = require('handlebars');
var vUML = require('../jscc/default_uml');
var vClass = "Handelbars4Code";
var bool_Methods_as_Prototype = false;
var vPrototype = vConstructor.prototype;


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
}


function cloneJSON(pJSON) {
    return JSON.parse(JSON.stringify(pJSON));
}

function extract_body(pFunctionDef) {
  var vString = pFunctionDef + " ";
  var vBody = "";
  if (vString) {
    var begin = vString.indexOf("{");
    var end   = vString.lastIndexOf("}");
    vBody = vString.substring(begin+1,end);
  }
  return vBody;
}

function extract_param(pFunctionDef) {
  var vString = pFunctionDef + " ";
  var vParam = "";
  if (vString) {
    var begin = vString.indexOf("(");
    var end   = vString.indexOf(")");
    vParam = vString.substring(begin+1,end);
  }
  return vParam;
}

function find_name_index(pname,parray) {
  var vFound = -1;
  for (var i = 0; i < parray.length; i++) {
    if (pname == parray[i].name) {
      vFound = i;
    }
  }
  return vFound;
}

function get_method_parameter(pFunctionDef,pmethod) {
  var vParamString = extract_param(pFunctionDef);
  var vParArr = vParamString.split(",");
  var vNewPar = [];
  // console.log("pmethod="+JSON.stringify(pmethod,null,4));
  var vOldPar = pmethod.parameter;
  for (var i = 0; i < vParArr.length; i++) {
    if (vParArr[i] !== "") {
      var par_i = find_name_index(vParArr[i],vOldPar);
      if (par_i >= 0) {
        // paraemeter already exists in UML of method
        // push old parameter definition to new parameter array
        vNewPar.push(cloneJSON(vOldPar[par_i]));
      } else {
        // create the new parameter in UML model
        vNewPar.push({
            "name": vParArr[i],
            "class": " ",
            "comment": "the parameter provides ..."
          });
      }
    }
  }
  //pmethod.parameter = vNewPar;
  return vNewPar;
}


function get_method(pMethodID,pFunctionDef,pData) {
  var vMethodHash = null;
  var vParamString = extract_param(pFunctionDef);
  var meth_i = find_name_index(pMethodID,pData.methods);
  if (meth_i >= 0) {
    console.log("Method '" + pMethodID + "(" + vParamString + ")' found");
    // method name found in vUML.data.methods
    // update the code
    vMethodHash = cloneJSON(pData.methods[meth_i]);
    vMethodHash.code = extract_body(pFunctionDef);
    vMethodHash.parameter = get_method_parameter(pFunctionDef,vMethodHash);
  } else {
    console.log("NEW Method '" + pMethodID + "(" + vParamString + ")' created in UML");
    vMethodHash = {
      "visibility": "public",
      "name": pMethodID,
      "parameter": [],
      "return": " ",
      "comment": "the method performs ...",
      "code": extract_body(pFunctionDef)
    };
    vMethodHash.parameter = get_method_parameter(pFunctionDef,vMethodHash);
  }
  // update the methods in UML model
  return vMethodHash;
}

function get_prototype_methods (pPrototype,pData) {
  var vMethArray = [];
  for (var meth_name in pPrototype) {
    if (pPrototype.hasOwnProperty(meth_name)) {
      console.log("CALL: "+vClass+".prototype." + meth_name + "(" + extract_param(pPrototype[meth_name]) + ")");
      //console.log("FUNCTION: LoadFile4DOM.prototype." + variable + "\nFunction:\n"+vHash[variable]);
      //console.log("CODE: LoadFile4DOM.prototype." + variable + "\nCode:\n"+extract_body(vHash[variable]));
      //console.log("PARAM: LoadFile4DOM.prototype." + variable + "\nParam:"+extract_param(vHash[variable]));
      vMethArray.push(get_method(meth_name,pPrototype[meth_name],pData));
    }
  }
  return vMethArray;
}

function get_instance_methods(pConstructor,pData) {
  var vMethodArray = [];
  var vInstance = new pConstructor();
  for (var variable in vInstance) {
    if (vInstance.hasOwnProperty(variable)) {
      var vType = get_type_of_attribute(vInstance[variable]);
      var vDefault = JSON.stringify(vInstance[variable],null,4);
      console.log("Methods: 'this." + variable  + " Type: '"+vType+"'  ' Default: " + vDefault);
			vMethArray.push(get_method(meth_name,pPrototype[meth_name],pData));
    }
  }

  return vMethodArray;
}

function get_type_of_attribute(obj) {
  var TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
  };
  var TOSTRING = Object.prototype.toString;

  return TYPES[typeof obj] || TYPES[TOSTRING.call(obj)] || (obj ? 'object' : 'null');

};

function get_attrib(pAttribID,pType,pDefault,pData) {
  var vAttribHash = null;
  var attrib_i = find_name_index(pAttribID,pData.attributes);
  if (attrib_i >= 0) {
    console.log("Attribute '" + pAttribID + "' Type: '" + pType + "' found");
    // Attrib name found in vUML.data.Attribs
    // update the code
    vAttribHash = cloneJSON(pData.attributes[attrib_i]);
    vAttribHash.init = pDefault;
  } else {
    console.log("NEW Attrib '" + pAttribID + "' Type: '" + pType + "' created in UML");
    vAttribHash = {
      "visibility": "public",
      "name": pAttribID,
      "init": pDefault,
      "comment": "the attribute stores ...",
    };
  }
  // update the methods in UML model
  return vAttribHash;
}


function get_instance_attibutes(pConstructor,pData) {
	console.log("get_instance_attibutes(pConstructor,pData) for "+vClass);
var vAttribArray = [];
  var vInstance = new pConstructor();
  for (var variable in vInstance) {
    if (vInstance.hasOwnProperty(variable)) {
      var vType = get_type_of_attribute(vInstance[variable]);
      var vDefault = JSON.stringify(vInstance[variable],null,4);
      console.log("Attribute: 'this." + variable  + " Type: '"+vType+"'  ' Default: " + vDefault);
      vAttribArray.push(get_attrib(variable,vType,vDefault,pData));
    }
  }

  return vAttribArray;
}

function get_static_attibutes(pConstructor,pData) {
	console.log("get_static_attibutes(pConstructor,pData) for "+vClass);
  var vAttribArray = [];
  var vInstance = pConstructor;
  for (var variable in vInstance) {
    if (vInstance.hasOwnProperty(variable)) {
      var vType = get_type_of_attribute(vInstance[variable]);
      var vDefault = JSON.stringify(vInstance[variable],null,4);
      console.log("Attribute: 'this." + variable  + " Type: '"+vType+"'  ' Default: " + vDefault);
      vAttribArray.push(get_attrib(variable,vType,vDefault,pData));
    }
  }

  return vAttribArray;
}
if (bool_Methods_as_Prototype === true) {
	vUML.data.methods = get_prototype_methods(vPrototype,vUML.data);
} else {
	vUML.data.methods = get_instance_methods(vPrototype,vUML.data);
}

if (bool_Methods_as_Prototype === true) {
	vUML.data.attributes = get_instance_attibutes(vConstructor,vUML.data);
} else {
	vUML.data.attributes = get_static_attributes(vConstructor,vUML.data);
}

if (vUML.data.reposinfo && vUML.data.reposinfo.modified) {
  vUML.data.reposinfo.modified = getDateTime();
}

var vContent = JSON.stringify(vUML, null, 4);
//console.log("JSCC:\n" + vContent);
fs.writeFile("./jscc/loadfile4dom_uml_build.json", vContent, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
