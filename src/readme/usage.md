%<!-- BEGIN: src/readme/usage.md -->
## Manual
The manual will show how to use `Handlebars4Code` for code as Javascript template engine to create a standardized string output from a given JSON.

### Use Cases - Javascript Template Engines
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
