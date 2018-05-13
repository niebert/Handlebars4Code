# Handlebars4Code
Handlebars4Code is a library and NPM module that extends Handlebars with Helpers for Code Generation in a specific programming language (e.g. Javascript)

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
  - [Short Summary of Helpers](#short-summary-of-helpers)
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

### Short Summary of Helpers
* `filename` create lower case filenames from camel-case class names (e.g. `MyClass` into `myclass`).
* `ifcond` creates id-conditions in the Handlebars template to create JSON context dependent compiler output.


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
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with
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

#### Compiler Output: `ifcond`
The compiler call for the JSON data and the template generates the following code

```javascript
//#################################################################
//# Javascript Class: NewClass()
//#       SuperClass: MySuperClass
//#
//# Author of Class:      My Name
//# email:                name@example.com
//#################################################################
```

### Helper: `require_class_list`
The helper function creates a list of liberaries that must be required/imported (e.g. Javascript) so that the defined libary for the new class can used the required resources in other modules. Some classes/instances are already defined by the programming language (e.g. `Math`, `JSON` in Javascript). Those libraries do not need a require command. The code generator should know about
* base classes  (`baseclasslist`) - no need to create require
* local classes  (`localclasslist`) - store in local directory, a path is necessary to these locally defined libraries (see `data.reposinfo.require_path`).
* remote classes  (`remoteclasslist`) - retrieved from a remote server via a package manager.


#### Template: `require_class_list`
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with
```javascript
{{{require_class_list data.superclassname data.attributes data.methods settings.baseclasslist settings.extendedclasslist data.reposinfo.require_path}}}
```

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
The compiler call for the JSON data and the template generates the following code

```javascript


```


### Helper: ``

#### Template: ``
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
```

#### JSON Data: ``
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
    },
    "settings": {

    }
  };
```

#### Compiler Output: ``
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
```
### Helper: ``

#### Template: ``
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
```

#### JSON Data: ``
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
    },
    "settings": {

    }
  };
```

#### Compiler Output: ``
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
```

### Helper: ``

#### Template: ``
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
```

#### JSON Data: ``
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
    },
    "settings": {

    }
  };
```

#### Compiler Output: ``
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
```

### Helper: ``

#### Template: ``
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
```

#### JSON Data: ``
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
    },
    "settings": {

    }
  };
```

#### Compiler Output: ``
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
```

### Helper: ``

#### Template: ``
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
```

#### JSON Data: ``
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
    },
    "settings": {

    }
  };
```

#### Compiler Output: ``
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
```

### Helper: ``

#### Template: ``
Assume we have the following templates stored `vDataJSON.tpl["mytpl"]` with:
```javascript
```

#### JSON Data: ``
The following JSON is used the helper call:
```javascript
var my_json = {
    "data": {
      "classname": "NewClass",
      "superclassname": "MySuperClass",
    },
    "settings": {

    }
  };
```

#### Compiler Output: ``
The compiler call `Handlebars4Code.compile.mytpl2(my_json)` for the JSON data `my_json` and the template generates the following code:


```javascript
```
