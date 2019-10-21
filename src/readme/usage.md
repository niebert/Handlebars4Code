<!-- BEGIN: src/readme/usage.md -->

## Quick Start for Library-Users
Just copy the `docs/`-folder and adapt the Handlebars templates `docs/tpl` and the JSON data in the folder `docs/db/` to the schema for your requirements.
* JSON data `docs/db/umljs.js` is loaded as `javascript` library into `vDataJSON`.
* The Handlebars template `docs/tpl/docu4github.js` creates a GitHub documentation for a Javascript `UML` model stored in a JSON. The template is a string with markers (e.g. `{{data.classname}}`. The markers will be replaced by the JSON content. The template itself is loaded also as `javascript` library into `vDataJSON.tpl`.

For editing a given input JSON you might want to create your own JSON editor and a schema that defines the data structure of your JSON data. You can use the [JSON2Schema tool](https://niebert.github.io/JSON2Schema) to create your own JSON editor. Combine the JSON editor with the template engine `Handlebars4Code`.

See [ClassEditorUML](https://niebert.github.io/ClassEditorUML) how a JSON editor and a the template engine `Handlebars4Code` can be used create
* Javascript code with the template `tpl/javascript_tpl.js` and a
* GitHub markdown file as documentation of the API with `tpl/docu4github_tpl.js`
Both templates use the same input JSON but create different output (e.g. Javascript code or GitHub markdown documentation)

In general a template is a `string` and the data for the template engine is string. The `create_compiler()` takes a hash of templates `vTplHash`as input and creates a hash of compilers `vCompilerHash` as output:

```javascript
var vCompilerHash =  Handlebars4Code.create_compiler(vTplHash);
```
If you want to create a single compiler for a template use the `get_compiler4template()` that takes a single templates `vTemplate`as input and creates a single compilers `vCompiler` as output:
```javascript
var vTemplate = "My template {{name}} with {{count}} markers for JSON data replacement for the output file {{outfile}}.";
var vCompiler =  Handlebars4Code.create_compiler4template(vTemplate);
var vJSON = {
  "name": "Bert Bond",
  "outfile": "my_output.txt",
  "count": 12
}
var vOutput = vCompiler(vJSON);
// vOutput = "My template Bert Bond with 12 markers for JSON data replacement for the output file my_output.txt."
```

If you want to use the core `Handlebars` instance you can access this Javascript object via `Handlebars4Code` with:
```javascript
var Handlebars = Handelbars4Code.Handlebars;
var vTemplate = "My template {{name}} with {{count}} markers for JSON data replacement for the output file {{outfile}}."
var vCompiler = Handlebars.compile();
```
Keep in mind that the core `Handlebars` does not have the additional helper functions of `Handlebars4Code` for code generation. The `Handlebars` instance is just provided for developers that want to extend the `Handlebars4Code` with additional helper functions. For registrations of new helper function the core `Handlebars` is necessary.
<!-- END:   src/readme/usage.md -->
