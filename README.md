# Handlebars4Code
`Handlebars4Code` is a library and NPM module that extends Handlebars with Helpers for Code Generation in a specific programming language (e.g. Javascript)
* **[Demo Handlebars4Code](https://niebert.github.io/Handlebars4Code)**

<!-- BEGIN: src/readme/headerinto.md -->
The following table of contents is generated with `node doctoc README.md`.
<!-- END:   src/readme/headerinto.md -->
<hr>
<h2>Table of Contents</h2>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation `Handlebars4Code`](#installation-handlebars4code)
  - [Installation `Handlebars4Code` with NPM for Scripts](#installation-handlebars4code-with-npm-for-scripts)
  - [Installation `Handlebars4Code` for Browser for Scripts-Tags](#installation-handlebars4code-for-browser-for-scripts-tags)
- [Manual](#manual)
  - [Use Cases - Javascript Template Engines](#use-cases---javascript-template-engines)
  - [Basic Use Case](#basic-use-case)
  - [Use Case - Generation of Programming Code](#use-case---generation-of-programming-code)
  - [Quick Start for Library-Users](#quick-start-for-library-users)
- [Installation](#installation)
- [Handlebars4Code - Structure of the Repository](#handlebars4code---structure-of-the-repository)
  - [JSON2Schema](#json2schema)
  - [Code Generation with ClassEditorUML](#code-generation-with-classeditoruml)
- [Examples - Handlebars4Code](#examples---handlebars4code)
  - [Create Handlebars4Code Compiler](#create-handlebars4code-compiler)
  - [Use Underlying Handlebars without Code Helpers](#use-underlying-handlebars-without-code-helpers)
- [Templates for Handlebars4Code](#templates-for-handlebars4code)
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
- [Build Process of `npm run build`](#build-process-of-npm-run-build)
  - [Define Filename for build in `package.json`](#define-filename-for-build-in-packagejson)
  - [Browserify after Build](#browserify-after-build)
- [Build and Compress with Browserify, Watchify, UglifyJS](#build-and-compress-with-browserify-watchify-uglifyjs)
  - [Browserify and Watchify](#browserify-and-watchify)
  - [Global Installation of Browserify, Watchify, UglifyJS and DocToc](#global-installation-of-browserify-watchify-uglifyjs-and-doctoc)
  - [Package Installation of Browserify and Watchify - Alternative](#package-installation-of-browserify-and-watchify---alternative)
  - [Start Watching the Files with Watchify](#start-watching-the-files-with-watchify)
  - [Source JS file and development bundle output](#source-js-file-and-development-bundle-output)
- [Acknowledgement](#acknowledgement)
- [Libraries required for  `Handlebars4Code`](#libraries-required-for--handlebars4code)
- [Libraries for Building and Developement](#libraries-for-building-and-developement)
- [NPM Library Information](#npm-library-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installation `Handlebars4Code`
There are two main types to use `Handlebars4Code` for you projects. With a `script`-tag in your HTML file or with a package manager like [NPM](https://www.npmjs.com/) with [NodeJS]()
### Installation `Handlebars4Code` with NPM for Scripts
Assume you have NPM installed and your have created e.g. a folder `mypackage/` for your package with `package.json` in the folder `. Go to the folder `mypackage/` and call
```javascript
npm install handlebars4code --save
```
Then you will find `handlebars4code` in the folder `mypackage/node_modules/handlebars4code`.
If you want to use `Handlebars4Code` in your scripts use the following require-call:
```javascript
const  Handlebars4Code = require('handlebars4code');
```
Now it is possible to use `Handlebars4Code` in your scripts.
### Installation `Handlebars4Code` for Browser for Scripts-Tags
If you want to use the library `handlebars4code.js` in a browser, please copy the file `dist/handlebars4code.js` into your library folder (e.g. `/js`) and
import the library with `script`-tag with:
```html
<script src="js/handlebars4code.js"></script>
```
Now it is possible to use `Handlebars4Code` in your other imported scripts.
%<!-- BEGIN: src/readme/usage.md -->
## Manual
The manual will show how to use `Handlebars4Code` for code as Javascript template engine to create a standardized string output from a given JSON.

### Use Cases - Javascript Template Engines
The following use-cases guide you from standard `Handlebars` usage toward `Handlebars4Code` usage.

### Basic Use Case
Assume you have a JSON with data in it and you want to create a HTML table with data in the JSON.

```json
{
  "person":{
    "firstname":"Anna",
    "lastname":"Almond"
  }
}
```
The HTML output:
```html
<table>
  <tr>
    <td>First Name:</td>
    <td>{{person.firstname}}</td>
  </tr>
  <tr>
    <td>Last Name:</td>
    <td>{{person.lastname}}</td>
  </tr>
</table>
```
For this basic examples you might want to use just [Handlebars](https://handlebarsjs.com/) directly as Javascript template.

###  Use Case - Generation of Programming Code
For generation of Programming code the standard markers with two brackets `{{firstname}}`  are replaced in general by markers with 3 brackets `{{{firstname}}}` because the replacement by [Handlebars](https://handlebarsjs.com/) with two brackets escapes characters like "&gt;" by `&gt;`. This is for HTML output in general useful, but for generation of code with template engine the code may become syntactically incorrect due to escaping of characters   
```json
{
  "statement":{
    "type":"if",
    "codition":"a < b"
  }
}
```
The Code Template for `Handlebars4Code` would e.g. like this:
```javascript
{{{statement.type}}} ( {{{statement.condition}}} ) {
  // other code
}
```
The replacement of `{{{statement.condition}}}` would provide the correct desired output

`if ( a < b )`

and the replacement of `{{statement.condition}}` would create an syntactical error of the generated code by

`if ( a &gt; b )`.

If you want to use `Handlebars4Code` for code generation use 3 brackets for encoding the variable replacement with JSON content. The same is applicable, if you create HTML-tags with

### Quick Start for Library-Users
You need the 3 things:
* the library [handlebars4code](https://niebert.github.io/Handlebars4Code/js/handlebars4code.js)
* a JSON that stores the data,
```json
{
  "person":{
    "firstname":"Anna",
    "lastname":"Almond"
  }
}
```
* a string template with markers like `{{firstname}}` or `{{person.firstname}}` for the data in the JSON in which the data will be markes will be replace by the content in the JSON

If you want to see how to combine those three basic elements into a HTML file see:
* [Hello World - source code](https://github.com/niebert/Handlebars4Code/blob/master/docs/helloworld.html)
* [Hello World - HTML in Browser](https://niebert.github.io/Handlebars4Code/helloworld.html)

## Installation
If you want to use [handlebars4code](https://niebert.github.io/Handlebars4Code/js/handlebars4code.js) in your HTML project just save the code e.g. in your `js/` folder of your project and the import the library with your script tag.

## Handlebars4Code - Structure of the Repository
If you do not want to generate programming code with the Javascript template engine you might want to use `Handlebars` directly-  

The `Handlebars4Code` examples are stored in the folder `docs`.  If you want to modify the provide examples to your needs
* just copy the `docs/`-folder,
* rename the folder that makes more sense (e.g. `json2wiki/`) and
* adapt the Handlebars templates `docs/tpl` to the desired output.
* The default JSON data is stored in the folder `docs/db/` compatible to a specific JSON schema. The `docs/` does not contain a `schema/` folder because the example does not use a [JSON editor](https://www.jeremydorn.com/json-editor). Create a JSON schema for your JSON e.g. with [JSON2Schema](https://niebert.github.io/JSON2Schema).

If you want to use a JSON-editor for web-based editing of the JSON data, you can use [JSON2Schema](https://niebert.github.io/JSON2Schema) to create a JSON editor with `Handlebars4Code` output generation.

* JSON data `docs/db/umljs.js` is loaded as `javascript` library into `vDataJSON`.
* The Handlebars template `docs/tpl/docu4github.js` creates a GitHub documentation for a Javascript `UML` model stored in a JSON. The template is a string with markers (e.g. `{{data.classname}}`. The markers will be replaced by the JSON content. The template itself is loaded also as `javascript` library into `vDataJSON.tpl`.

### JSON2Schema
For editing a given input JSON you might want to create your own JSON editor and a schema that defines the data structure of your JSON data. You can use the [JSON2Schema tool](https://niebert.github.io/JSON2Schema) to create your own JSON editor. Combine the JSON editor with the template engine `Handlebars4Code`.

### Code Generation with ClassEditorUML
See [ClassEditorUML](https://niebert.github.io/ClassEditorUML) how a JSON editor and a the template engine `Handlebars4Code` can be used create
* Javascript code with the template `tpl/javascript_tpl.js` and a
* GitHub markdown file as documentation of the API with `tpl/docu4github_tpl.js`
Both templates use the same input JSON but create different output (e.g. Javascript code or GitHub markdown documentation)

## Examples - Handlebars4Code

### Create Handlebars4Code Compiler
In general a template is a `string` and the data for the template engine is string. The `create_compiler()` takes a hash of templates `vTplHash`as input and creates a hash of compilers `vCompilerHash` as output:

```javascript
var vCompilerHash =  Handlebars4Code.create_compiler(vTplHash);
```
If you want to create a single compiler for a template use the `get_compiler4template()` that takes a single templates `vTemplate`as input and creates a single compilers `vCompiler` as output:
```javascript
var vTemplate = "My template {{name}} with {{count}} markers is used for the output file {{outfile}} - <a href=\"{{{turl}}}\">see demo URL</a> .";
var vCompiler =  Handlebars4Code.create_compiler4template(vTemplate);
var vJSON = {
  "name": "MyTest",
  "outfile": "my_output.txt",
  "count": 12,
  "url": "https://niebert.github.io/Handlebars4Code/helloworld.html"
}
var vOutput = vCompiler(vJSON);
// vOutput = "My template Bert Bond with 12 markers for JSON data replacement for the output file my_output.txt."
```

### Use Underlying Handlebars without Code Helpers
If you want to use the core `Handlebars` instance you can access this Javascript object via `Handlebars4Code` with:
```javascript
var Handlebars = Handelbars4Code.Handlebars;
var vTemplate = "My template {{name}} with {{count}} markers for JSON data replacement for the output file {{outfile}}  - <a href=\"{{{turl}}}\"> see demo URL</a>."
var vCompiler = Handlebars.compile(vTemplate);
```
Keep in mind that the core `Handlebars` does not have the additional helper functions of `Handlebars4Code` for code generation. The `Handlebars` instance is just provided for developers that want to extend the `Handlebars4Code` with additional helper functions. For registrations of new helper function the core `Handlebars` is necessary.
<!-- END:   src/readme/usage.md -->
<!-- BEGIN: src/readme/handlebars4code.md -->

## Templates for Handlebars4Code
In the `Handlebars4Code` demo the JSON data is stored in `vDataJSON`, which is the main JSON data storage defined in `index.html`. Data (`docs/db/`) and templates (`docs/tpl/`) are loaded into the JSON. All templates reside in `vDataJSON.tpl`, which is provided as parameter to `Handlebars4Code.create_compiler(vDataJSON.tpl)`. The method `create_compiler(vDataJSON.tpl)` creates Handlebars compilers for all templates in `vDataJSON.tpl`.  
* `create_compiler(vTplHash)` expects a hash, for which the template ID is the key for accessing template (e.g. `vDataJSON.tpl["docu4github"])` or `vDataJSON.tpl["javascript"])` (see directory `docs/tpl/`).
* The compilers need to be generated only once. Then the compiler for all templates are ready to process JSON data and generate output according to the template definition.
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
`vDataJSON.out` contain the compilers, that are generated by `Handelbars4Code`. Each compiler in `vDataJSON.out` have are corresponding template in `vDataJSON.tpl`. `vDataJSON.tpl` is  hash of strings for each ID and `vDataJSON.out` is hash of functions with the corresponding ID. The following code generates the compiler with `HandleBars4Code`.

```javascript
Handlebars4Code.create_compiler(vDataJSON.tpl);
vDataJSON.out = Handlebars4Code.get_compiler();
```
Assume you have a template with the ID `mytpl` you will get a compiler function in `vDataJSON.out.mytpl()` that you can populate with JSON data. The call of `vDataJSON.out.mytpl(pMyData)` will replace the JSON data `pMyData` in the template `mytpl`.


## Templates and JSON into vDataJSON
The javascript files in `docs/tpl/` and `docs/db/` are designed in way that allows the population of `vDataJSON` just by including a script tag in the underlying HTML file (see example `docs/index.html`).

### Load JSON Data with Script Tag
The following script tag loads the JSON data into `vDataJSON`.
```html
<script src="db/umljs.js"></script>
```
The data is stored in the following way in the JavaScript file:
```javascript
vDataJSON["umljs"]= {
  "author": "Bert Niehaus",
  "description": "My description for repository."
}
```
It is recommended to use the same ID in `vDataJSON` as the basename of the corresponding JavaScript file `db/umljs.js` without path `db/` and extension `.js`.

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
<!-- END:   src/readme/handlebars4code.md -->
<!-- BEGIN: src/readme/build_process.md -->

## Build Process of `npm run build`
The build process is called by `npm run build` which in turn call `build.js`. If you want to call the build process of `build.js` separately just call `build.js` with `node build.js` from the shell/console.

The templates for building the output are stored in the folder `src/`.

After the build process the `README.md` is generated and if you want to have the table of contents in the file for the concatenation of  files in `src/readme/` listed in `files4build.js` then you must run the DocToc generator for `README.md` by `doctoc README.md` from the shell to update the table of contents in `README.md`.

### Define Filename for build in `package.json`
In `package.json` defines the filename for the automated build for
* `README.md` for readme for the repository (parts in `src/readme`),
* `index.html` for the web demo (parts in `src/html`),
* `main.css` for the style sheet (part in `src/css`) and
* `src/main.js` is generated from the parts in `src/libs`
the sources in `src/`.
To specify these filenames add the following `build` section to the `package.json`:
```javascript
"build": {
  "readme": "README.md",
  "html": "docs/index.html",
  "css": "docs/css/main.css"
}
```
If you want to edit the generated file check the files that are selected for including into the generated files (see `files4build.js`) and set the files to a preliminary build name (e.g. like `index_build.html` instead of `index.html` to compare generated file `index_build.html` with the older version `index.html` for debugging

### Browserify after Build
After building (concat the file parts) and replacement of package variables (e.g. like  `_``__PKG_NAME__``_` for package name) in the generated documents the module is browserified by the command
```javascript
 browserify src/main.js  > dist/handlebars4code.js
```
This command is called and defined in the script section of the `package.json`.
<!-- END:   src/readme/build_process.md -->
## Quick Start for Developers
The followning description might be helpful if you want to browserify the module in the build. The build process is defined with script `build.js`.

## Build and Compress with Browserify, Watchify, UglifyJS
The NodeJS modules can use `require()`-command. Browsers cannot execute the `require()`-command and other node specific programming features.
* `Browserify` loads the file `src/main.js` as input file and resolves e.g. the `require()`-command and creates an output file in `dist/handlebars4code.js`
* `Watchify` observes any changes in the source files in `src/` and starts on the event of changes the build process of the file `src/main.js` as input file and creates an output file in `dist/handlebars4code.js`.
* `UglifyJS` compresses the code in `dist` and takes the file `dist/handlebars4code.js` and generates the compressed library in `dist/handlebars4code.min.js`. The same is applied for `docs/js/handlebars4code.js` and the output is `docs/js/handlebars4code.min.js`. The compression of the source code can be perform without a total build by `npm run compress`.
* The main browserify command creates a standalone library that can be used in the browser and it assign `Handlebars4Code` to the `window` object by
```shell
  browserify src/main.js --standalone window > dist/handlebars4code.js
```

### Browserify and Watchify
Browserify and Watchify are used in this repository to control the WebApp-javascript development with the required Javascript libraries installed with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node) and similar framework world that greatly improve your javascript workflow: Using them, you no longer need to micro-manage your script tags but instead you just declare the libraries each of your client-side modules is using - or you can even create your own reusable modules! Also, installing (or updating) javascript libraries is as easy as running a single command!
* [Additional Information about Browserify and Watchify on GitHub](https://spapas.github.io/2015/05/27/using-browserify-watchify/)
* [Youtube Video about Browserify and Watchify by Kyle Robinson Young 2015/04/16](https://www.youtube.com/watch?v=CTAa8IcQh1U)
In this repository Browserify and Watchify are used for javascript code development with [NPM Node.js](https://docs.npmjs.com/getting-started/installing-node).

### Global Installation of Browserify, Watchify, UglifyJS and DocToc
Requirement: [NPM](https://docs.npmjs.com/getting-started/installing-node) is intalled. Now call for global installation of Browserfy, Watchify, UglifyJS and DocToc by:

`npm install -g browserify watchify uglify-js doctoc jshint lint`

This is recommended because your will not install Browserfy, Watchify and UglifyJS for all your repositories separately.
* ***Browserfy*** converts `node_modules` in a single library, that can be imported in WebApp. Browserify resolves dependencies and included the required libraries into the bundled javascript code.
* ***Watchify*** watches changes in the source code and runs the build process whenever it detects changes in the your source code.
* ***UglifyJS*** compresses the source code of `dist/handlebars4code.js` into ```handlebars4code.min.js``` to reduce download time and WebApp performance during load.
* ***DocToc*** is used to create a helpful table of contents in the README (see [DocToc-Installation]https://github.com/thlorenz/doctoc#installation) for further details on [NPM DocToc](https://www.npmjs.com/package/doctoc) ). Run `doctoc README.md` for updating the table of contents.
* ***jsLint*** is used to check the Javascript code, quality of code can be improved by application of jsLint

### Package Installation of Browserify and Watchify - Alternative
If your prefer that  browserify and watchify is installed with your `npm install` command, save these to modules to your dev-dependecies in your `package.json` by calling

* (Install Browsersify) `npm install browserify -g`
* (Install Watchify) `npm install watchify -g`
* (Install UglifyJS) `npm install uglify-js -g`
* (Install DocToc) `npm install doctoc -g`
* (Install jshint) `npm install jshint -g`
* (Install jshint) `npm install lint -g`

The difference between  `--save` and `--save-dev`, `-g` is, that
* `--save` indicates that the installed library/package is required in the library and the library will be added to `package.json`. If someone else installs you library all packages, that are installed with `--save` are installed recursively as well.
* development dependencies (`--save-dev`) are required  for **building** the code/library only, but not for library itself for being executed. So someone else installs you library, the `--save-dev` developement packages are not installed. If some clones your repository e.g. from GitLab, GitHub,...  with the command  `npm install` also the development packages are installed as well.
* `-g` install packages globally`watchify`, `browserify`, `uglify-js`, ... might be regarded as useful in many other packages, so for developements the installation with `npm install ... --save-dev` is replaced by `-g` option.

because they are required for the development process of the code but they are not added to the generated Javascript-bundle that are used in the WebApp ClassEditorUML. The `--save-dev` commands for `browserify` and `watchify` will install the two modules with all the the dependencies in `node_modules` and add the dev-dependencies to your `package.json`.
```json
"devDependencies": {
  "browserify": "^14.5.0",
  "watchify": "^3.9.0",
  "uglify-js": "^2.6.2",
  "doctoc":"^1.3.0",
  "lint": "^1.1.2"  
}
```
In the current repository `Browserfy` and `Watchify` are expected to be installed globally, because the `package.json` does not contain the dev-dependencies mentioned above.

### Start Watching the Files with Watchify
Watchify will trigger the `npm run build` process if files were change due to alteration of code. To start watching the files, run the npm-watch script by `npm run watch`, which is defined in `package.json`

### Source JS file and development bundle output
The main JS source file for the build process is `src/main.js`. The output library (resp. output file of build process) is stored in distrubtion library for browser based web-development in `dist/handlebars4code.js`. Compressed code is generated with `UglifyJS`. It takes the `dist/handlebars4code.js` as input file and creates the compressed file `dist/handlebars4code.min.js`.
The compression of `dist/handlebars4code.js` into `dist/handlebars4code.min.js` uses `uglify-js` module and can be started by

  `npm run compress`

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [HandleBars](http://handlebarsjs.com/) the code generation in Javascript was developed by Yehuda Katz.
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the [ClassEditorUML](https://niebert.github.io/ClassEditorUML) `UML` for Javascript.
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the `FileSaver.js` that is used to store created `JSCC` files to the local filesystem. `JSCC` uses the same mechanism of browsers, that allows a `Save as...` in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.

## Libraries required for  `Handlebars4Code`
The following libraries are necessary for `handlebars4code.js`:
* Lib: `define-property` Version: `^2.0.2`
* Lib: `for-in` Version: `^1.0.2`
* Lib: `handlebars` Version: `^4.4.1`


## Libraries for Building and Developement
The following libraries are necessary for building the `handlebars4code`. 
These libraries are not included in `handlebars4code.js`, but e.g. are required in `build.js`.
* Lib: `build4code` Version: `^0.3.14`
* Lib: `concat-files` Version: `^0.1.1`

## NPM Library Information
* Exported Module Variable: `Handlebars4Code`
* Package:  `handlebars4code`
* Version:  `1.2.18`   (last build 2020/07/26 10:50:31)
* Homepage: `https://github.com/niebert/Handlebars4Code#readme`
* License:  MIT
* Date:     2020/07/26 10:50:31
* Require Module with:
```javascript
    const vHandlebars4Code = require('handlebars4code');
```
* JSHint: installation can be performed with `npm install jshint -g`
<!-- BEGIN: src/readme/tail.md -->
<!-- END:   src/readme/tail.md -->
