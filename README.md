# Handlebars4Code
`Handlebars4Code` is a library and NPM module that extends Handlebars with Helpers for Code Generation in a specific programming language (e.g. Javascript).

* **[Webbased Demo Handlebars4Code](https://niebert.github.io/Handlebars4Code)**
<hr>
<h2>Table of Contents</h2>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Template Hash](#template-hash)
- [vDataJSON as Template Storage](#vdatajson-as-template-storage)
- [Templates and JSON into vDataJSON](#templates-and-json-into-vdatajson)
  - [Load JSON Data with Script Tag](#load-json-data-with-script-tag)
  - [Load Templates with Script Tag](#load-templates-with-script-tag)
- [Script Tag for handlebars4code.js](#script-tag-for-handlebars4codejs)
- [Additional Handlebars Helpers for Code generation](#additional-handlebars-helpers-for-code-generation)
  - [List of Helpers in Handlebars4Code](#list-of-helpers-in-handlebars4code)
  - [Helper: `filename`](#helper-filename)
    - [Template 1: `filename`](#template-1-filename)
    - [JSON Data 1: `filename`](#json-data-1-filename)
    - [Compiler Output 1: `filename`](#compiler-output-1-filename)
    - [JSON Data 2: `filename`](#json-data-2-filename)
    - [Template 2: `filename`](#template-2-filename)
    - [Compiler Output 2: `filename`](#compiler-output-2-filename)
  - [Helper: `ifcond`](#helper-ifcond)
    - [Template: `ifcond`](#template-ifcond)
    - [JSON Data: `ifcond`](#json-data-ifcond)
    - [Compiler Output: `ifcond`](#compiler-output-ifcond)
  - [Helper: `require_class_list`](#helper-require_class_list)
    - [Template: `require_class_list`](#template-require_class_list)
    - [JSON Data: `require_class_list`](#json-data-require_class_list)
    - [Compiler Output: `require_class_list`](#compiler-output-require_class_list)
  - [Helper: `requirelibs`](#helper-requirelibs)
    - [Template: `requirelibs`](#template-requirelibs)
    - [JSON Data: `requirelibs`](#json-data-requirelibs)
    - [Compiler Output: `requirelibs`](#compiler-output-requirelibs)
  - [Helper: `foreach`](#helper-foreach)
    - [Template: `foreach`](#template-foreach)
    - [Parameter of Helper:  `foreach`](#parameter-of-helper--foreach)
    - [JSON Data: `foreach`](#json-data-foreach)
    - [Compiler Output: `foreach`](#compiler-output-foreach)
  - [Helper: `paramcall`](#helper-paramcall)
    - [Template: `paramcall`](#template-paramcall)
    - [JSON Data: `paramcall`](#json-data-paramcall)
    - [Compiler Output: `paramcall`](#compiler-output-paramcall)
  - [Helper: `parameterlist`](#helper-parameterlist)
    - [Template: `parameterlist`](#template-parameterlist)
    - [JSON Data: `parameterlist`](#json-data-parameterlist)
    - [Compiler Output: `parameterlist`](#compiler-output-parameterlist)
  - [Helper: `indent`](#helper-indent)
    - [Template: `indent`](#template-indent)
    - [JSON Data: `indent`](#json-data-indent)
    - [Compiler Output: `indent`](#compiler-output-indent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Template Hash
In the `Handlebars4Code` demo the JSON data is stored in `vDataJSON`, which is the main JSON data storage defined in `index.html`. Data (`docs/db/`) and templates (`docs/tpl/`) are loaded into the JSON. All templates reside in `vDataJSON.tpl`, which is provided as parameter to `Handlebars4Code.create_compiler(vDataJSON.tpl)`. The method `create_compiler(vDataJSON.tpl)` creates Handlebars compilers for all templates in `vDataJSON.tpl`.  
* `create_compiler(vTplHash)` expects a hash, for which the template ID is the key for accessing template (e.g. `vDataJSON.tpl["docu4github"])` or `vDataJSON.tpl["javascript"])` (see directory `docs/tpl/`).
* The compilers need to be generated only once. Then the compiler for all templates are ready to process JSON data and generate output form according to the template definition.
* `var my_compilers = Handlebars4Code.get_compiler()` stores the generated Handlebars compilers in an individual compiler hash. `var my_output = my_compilers.javascript(vJSON)` provides JSON to the compiler function for the template `javascript`. `var my_output = my_compilers.docu4github(vJSON)` provides JSON to the compiler function for the template `docu4github`.

## vDataJSON as Template Storage
Create a template storage in your main HTML file.
```html
<script language="javascript">
  var vDataJSON = {};
  vDataJSON.tpl = {};
  vDataJSON.out = {};
</script>
```

## Templates and JSON into vDataJSON
The javascript files in `docs/tpl/` and `docs/db/` are designed in way that allows the population of `vDataJSON` just by including a script tag in the underlying HTML file (see example `docs/index.html`).

### Load JSON Data with Script Tag
```html
<script src="db/umljs.js"></script>
```

### Load Templates with Script Tag
Every script tag loads a single template from the subdirectory `docs/js/`:
```html
<script src="tpl/javascript_tpl.js"></script>
<script src="tpl/docu4github_tpl.js"></script>
```

## Script Tag for handlebars4code.js
Use the script tag to embed the Handlebars4Code library in your HTML file::

```html
<script src="js/handlebars4code.js"></script>
```

## Additional Handlebars Helpers for Code generation
The following Handlebars helpers are added to the basic Handlebars features, to support better code generation. Generated code can be in any programming language (of course including markup or markdown languages):

### List of Helpers in Handlebars4Code
* `filename` create lower case filenames from camel-case class names (e.g. `MyClass` into `myclass`).
* `ifcond` creates id-conditions in the Handlebars template to create JSON context dependent compiler output.
* `require_class_list` inserts `require` commands according the used classes in the attributes and return values of the methods. It requires only modules that are not base classes that are provided by the programming language itself.
* `requirelibs` The helper is designed to generate local and remote require commands in a class/module.
* `foreach` is slighty different from the standard `each` helper in Handlebars. It allows to assign parent `data` hash to `foreach` context of the template

### Helper: `filename`
The helper function `filename` generates from any input string a usable filename in lowercase that contains no blanks an no special characters.

#### Template 1: `filename`
Assume we have the following templates stored `vDataJSON.tpl["mytpl1"]` with
```javascript
// The filename of the class {{data.classname}} is {{filename data.classname}}.js
```
The template ID `mytpl1` is

#### JSON Data 1: `filename`
The following JSON
```javascript
var my_json = {
  "data":{
    "classname" : "MyClass"
  }
}
```

#### Compiler Output 1: `filename`
The compiler call `Handlebars4Code.compile.mytpl1(my_json)` for the JSON data `my_json` and the template generates the following code

```javascript
// The filename of the class MyClass is myclass.js
```
#### JSON Data 2: `filename`
The following JSON
```javascript
var my_json = {
  "data":{
    "classname" : "MyClass",
    "superclassname" : "MySuperClass"
  }
}
```

#### Template 2: `filename`
Assume we have templates `vDataJSON.tpl["mytpl2"]` with:
```javascript
const {{data.superclassname}} = require('{{filename data.superclassname}}');

```

#### Compiler Output 2: `filename`
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:

```javascript
const MySuperClass = require('mysuperclass');

```
If the input string contains blanks then these blanks are replaced by an underscore.


### Helper: `ifcond`

`If` condition and application of JSON path to specific attribute to JSON. The following template generates a header as comment for the javascript output. Dependent on the value of `data.superclassname` (string not empty) an additional name for the superclass is inserted in the header of generated output of code (see [Blog in StackOverflow](https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional))

#### Template: `ifcond`
Assume we have the following templates is stored `vDataJSON.tpl["mytpl"]` with
```javascript
//#################################################################
//# Javascript Class: {{data.classname}}()
{{#ifcond data.superclassname "!=" ""}}
//#       SuperClass: {{data.superclassname}}
{{/ifcond}}
//#
//# Author of Class:      {{data.reposinfo.author}}
//# email:                {{data.reposinfo.email}}
//#################################################################
```
The `ifcond` is an if-condition, that inserts a line with name of the super class if the `superclassname` is not empty.

#### JSON Data: `ifcond`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
      "comment": "Description of the class",
      "reposinfo": {
        "repository": "https://www.github.com/author/NewClass",
        "author": "My Name",
        "email": "name@example.com",
      },
    }
  };
```
The `superclassname` is not empty and has the value `"MySuperClass"`. The `ifcond` used in the template will insert a line by the use of an  if-condition.

#### Compiler Output: `ifcond`
The compiler call for the JSON data and the template generates the following code:

```javascript
//#################################################################
//# Javascript Class: NewClass()
//#       SuperClass: MySuperClass
//#
//# Author of Class:      My Name
//# email:                name@example.com
//#################################################################
```
The compiled result contains a comment about the super class, due to the fact that the attribute `superclassname` is not empty and contains the value `"MySuperClass"`.

### Helper: `require_class_list`
The helper function creates a list of liberaries that must be required/imported (e.g. Javascript) so that the defined libary for the new class can used the required resources in other modules. Some classes/instances are already defined by the programming language (e.g. `Math`, `JSON` in Javascript). Those libraries do not need a require command. The code generator should know about
* base classes  (`baseclasslist`) - no need to create require
* local classes  (`localclasslist`) - store in local directory, a path is necessary to these locally defined libraries (see `data.reposinfo.require_path`).
* remote classes  (`remoteclasslist`) - retrieved from a remote server via a package manager.


#### Template: `require_class_list`
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with
```javascript
{{{require_class_list data settings}}}
```
The helper needs the `data` and the `settings` attribute of the JSON input as parameter:
* `data` contains all the defined elements of the class.
* `settings` contain basic definitions for the classes that are available in the software development project.
* `data.superclassname` because a superclass will be handled with a separate `require` command.
* `settings.baseclasses` because those classes are provided by the programming language by default and they do not need a require command.
* `settings.localclasses` because those classes are created within the software developement of the repository and these modules need a special require command with a local pathname, where to to find the libraries, e.g. `require('./libs/mylocallib')`.
* `data.reposinfor.require_path` contain the local path to the libraries/modules of `localclasses`  `./libs/`.
* `settings.remoteclasses` remote classes are download with a package manager and these modules are required just by the module name, e.g. `require('mylocallib')`.

#### JSON Data: `require_class_list`
The following JSON
```json
var my_json = {
  "data": {
    "classname": "NewClass",
    "superclassname": "MySuperClass"
  },
  "settings": {
    "extension4code":".js",
    "localclasslist": [
      "App",
      "AppAbstract"
    ],
    "remoteclasslist": [
      "LinkParam",
      "JSONEditor"
    ],
    "baseclasslist": [
      "",
      "Array",
      "Boolean",
      "Float",
      "Function",
      "Hash",
      "Integer",
      "Object",
      "RegularExp",
      "String"
    ]
  }  
};
```

#### Compiler Output: `require_class_list`
Assume that `App`, `LinkParam` and `JSONEditor` are used in the class as attributes or returned instances of method. `App` is a locally defined class while `LinkParam` and `JSONEditor` are remote classes downloaded from the package manager (e.g. NPM).
The compiler call for the JSON data and the template generates the following code.

```javascript
require('./libs/app');
require('linkparam');
require('jsoneditor');
```


### Helper: `requirelibs`
The helper is designed to generate local and remote require commands in a class/module.

#### Template: `requirelibs`
Assume we have the following templates is stored `vDataJSON.tpl["requiretpl"]` with:
```javascript
// NodeJS: Require additional Modules
{{#requirelibs data.reposinfo.requirelist}}
const {{variable}} = require('{{module}}');
{{/requirelibs}}
```

#### JSON Data: `requirelibs`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "reposinfo": {
        "requirelist": [
          {
            "module":"handlebars",
            "variable":"Handlebars"
          },
          {
            "module":"filesaver",
            "variable":"FileSaver"
          },
          {
            "module":"jquery",
            "variable":"$"
          }
        ]
      },
    }
  };
```

#### Compiler Output: `requirelibs`
The compiler call `Handlebars4Code.compile.requiretpl(my_json)` for the JSON data `my_json` and the template generates the following code. The variable for the repository uses the module name in the `requirelist` and creates a variable name with an uppercase first character of the module name.

```javascript
const Handlebars = require('handlebars');
const Filesaver  = require('filesaver');  
const $          = require('jquery');     
```


### Helper: `foreach`
The example for the `foreach` helper will generate HTML code e.g. for the document explaining the available methods in the class. The example for the `paramcall` helper provides an application of `foreach` for code generation.

#### Template: `foreach`
Assume we have the following templates stored in `vDataJSON.tpl["htmltpl"]` with:
```html
<ul>
{{#foreach data.methods data}}
  <li>
  The {{visibility}} method {{name}} is defined in class {{data.classname}}
  </li>
{{/foreach}}
</ul>
```

#### Parameter of Helper:  `foreach`
The output format is HTML and the template uses
* the array `data.methods` to iterate over all methods and
* the hash `data` as second parameter of the helper, so that parent attribute of the JSON like `data.classname` are available in the content of the `foreach` definition as well.
* The second parameter `data` is added as `data` attribute to method items the array `data.methods`. You can assign a different hash e.g. `mydata` to the second parameter. For the template above the hash `mydata` needs the attribute `mydata.classname`. The second parameter is still mapped to `{{data}}` in the helper context. So if `mydata.classname="MyNewClass2"` the Handlebars `{{data.classname}}` will be set to `MyNewClass2`. With the new second parameter the template context will look this:

```html
<ul>
{{#foreach data.methods mydata}}
  <li>
  The {{visibility}} method {{name}}(params) is defined in class {{data.classname}}
  </li>
{{/foreach}}
</ul>
```
For a Handlebars4Code helper `foreach` helper is called for arrays `myarray` with:
```html
{{#foreach myarray data}}
    context for each array element
{{/foreach}}
```


#### JSON Data: `foreach`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "methods": [
        {
          "visibility": "public",
          "name": "init",
        },
        {
          "visibility": "private",
          "name": "create",
        },
        {
          "visibility": "public",
          "name": "display",
        }
    }
  };
```

#### Compiler Output: `foreach`
The template was stored in `vDataJSON.tpl["htmltpl"]`, so the compiler call will be `Handlebars4Code.compile.htmltpl(my_json)` for the JSON data `my_json`. The defined template generates the following code:


```html
<ul>
  <li>
  The public method init(params) is defined in class NewClass
  </li>
  <li>
  The private method create(params) is defined in class NewClass
  </li>
  <li>
  The public method display(params) is defined in class NewClass
  </li>
</ul>
```


### Helper: `paramcall`
The helper `paramcall` creates a list of parameter names of the method, that is comma separated.

#### Template: `paramcall`
Assume we have the following templates stored in `vDataJSON.tpl["methodtpl"]` with:
```
{{#foreach data.methods data}}
{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = function ({{#paramcall parameter}}{{/paramcall}})
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    // private function of class {{data.classname}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}})
{{/ifcond}}
{{/foreach}}
```
The `foreach` helper iterates of all method (here only one method is defined in the class). The `ifcond` helper distinguishes between different outputs for `public` and `private` methods in the class.

#### JSON Data: `paramcall`
The following JSON is used for the helper call. The JSON contains one method with
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
      "methods": [
        {
          "visibility": "public",
          "name": "init",
          "parameter": [
            {
              "name": "pJSON",
              "class": "Hash",
              "comment": "the parameter stores JSON definition for the class"
            },
            {
              "name": "pOptions",
              "class": "Hash",
              "comment": "the parameter stores the options for the JSON editor (developed by Jeremy Dorn)"
            },
            {
              "name": "pSchema",
              "class": "Hash",
              "comment": "the parameter contains the JSON Schema for JSON Editor"
            }
          ]
        }
    }
  };
```

#### Compiler Output: `paramcall`
The compiler call `Handlebars4Code.compile.methodtpl(my_json)` for the JSON data `my_json` and the template generates the following code:

```
NewClass.init = function (pJSON,pOptions,pSchmea)
```
The `ifcond` condition creates a different output if the `visibility` attribute is set to `private`. The generated code will be:

```
// private function of class NewClass
function init(pJSON,pOptions,pSchmea);
```


### Helper: `parameterlist`
The helper function `parameterlist` is mainly used to insert a comments for all parameter of a function in the header of a function.

#### Template: `parameterlist`
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
//#################################################################
//# {{visibility}} Method: {{name}}()  Class: {{data.classname}}
//# Parameter:
//#    {{parameterlist parameter "    //#    "}}
//#################################################################
```

#### JSON Data: `parameterlist`
The following JSON is used the helper call:
```
var my_json = {
  var my_json = {
      "data": {
        "classname": "NewClass",
        "superclassname": "MySuperClass",
        "methods": [
          {
            "visibility": "public",
            "name": "init",
            "parameter": [
              {
                "name": "pJSON",
                "class": "Hash",
                "comment": "the parameter stores JSON definition for the class"
              },
              {
                "name": "pOptions",
                "class": "Hash",
                "comment": "the parameter stores the options for the JSON editor (developed by Jeremy Dorn)"
              },
              {
                "name": "pEditorID",
                "class": "String",
                "comment": "the parameter provide DOM ID in which the JSON editor will be injected."
              }
            ]
          }
      }
    };
```

#### Compiler Output: `parameterlist`
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
//#################################################################
//# public Method: init()  Class: NewClass
//# Parameter:
//#    pJSON:Hash
//#      the parameter stores JSON definition for the class
//#    pOptions:Hash
//#      the parameter stores the options for the JSON editor (developed by Jeremy Dorn)
//#    pEditorID:String
//#      the parameter provide DOM ID in which the JSON editor will be injected.
//#
//#################################################################

```

### Helper: `indent`
The helper function `indent` takes two parameters.
* the text (e.g. comment or code)
* the indent which is injected for all newlines in the text parameter.
The `indent` helper shifts the text or code to the right.

#### Template: `indent`
Assume we have the following templates is stored `vDataJSON.tpl["mytpl"]` with:
```javascript
   //#################################################################
   //# Comment:
{{indent comment "    //#     "}}
   //# Line after Comment
   //#################################################################

```

#### JSON Data: `indent`
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
      "methods": [
        {
          "visibility": "private",
          "name": "create",
          "comment":"one line \nsecond line\nthird  line"
        }
    },
    "settings": {

    }
  };
```

#### Compiler Output: `indent`
The compiler call `Handlebars4Code.compile.mytpl(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
    //#################################################################
    //# Comment:
    //#     one line
    //#     second line
    //#     third line
    //# Line after Comment
    //#################################################################

```
