vDataJSON["tpl"]["docu4github"] = `
{{#ifcond data.reposinfo.static "!=" "yes"}}
## Javascript Class: \`{{data.classname}}\`

{{{data.comment}}}
* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: {{data.reposinfo.created}}
* last modifications at {{data.reposinfo.modified}}
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: \`js/{{filename data.classname}}.js\`
* UML-File: \`jscc/{{filename data.classname}}_uml.json\`
{{#ifcond data.superclassname "!=" " "}}
* Superclass: \`{{data.superclassname}}\` - code generation in \`ClassEditorUML\` can insert the require-commands automatically. For the settings expand the \`Repository Info\` in ClassEditorUML. You can set \`Require Classes NPM:\` to \`Yes\` and \`ClassEditorUML\` will include require command for super class. ClassEditorUML assumes, that the super class is a locally available.
\`\`\`javascript
const {{data.superclassname}} = require('./{{filename data.superclassname}}');
\`\`\`
The require command assumes the file \`{{filename data.classname}}.js\` in the same directory as \`{{filename data.superclassname}}.js\`.
{{/ifcond}}
{{#ifcond data.reposinfo.static "==" "yes"}}
## Javascript Module: \`{{data.classname}}\`

{{{data.comment}}}
* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: {{data.reposinfo.created}}
* last modifications at {{data.reposinfo.modified}}
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: \`js/{{filename data.classname}}.js\`
{{#ifcond data.superclassname "!=" " "}}
* Superclass: \`{{data.superclassname}}\` - code generation in \`ClassEditorUML\` can insert the require-commands automatically. For the settings expand the \`Repository Info\` in ClassEditorUML. You can set \`Require Classes NPM:\` to \`Yes\` and \`ClassEditorUML\` will include require command for super class. ClassEditorUML assumes, that the super class is a locally available.
\`\`\`javascript
const {{data.superclassname}} = require('./{{filename data.superclassname}}');
\`\`\`
The require command assumes the file \`{{filename data.classname}}.js\` in the same directory as \`{{filename data.superclassname}}.js\`.
{{/ifcond}}

### Create Instance of Class
Instances of the class \`{{data.classname}}\` can be generated with:
\`\`\`javascript
    var v{{data.classname}} = new {{data.classname}}();
\`\`\`

### Definition Methods - 2 Approaches
* If you want to assign definitions of methods for single instances individually, defined the method the following way. This approach allows to overwrite the method definition of single instances dynamically.
\`\`\`javascript
    this.my_method = function (pPar1,pPar2)
\`\`\`
* A prototype definition of methods for \`{{data.classname}}\` will be set the definition as prototye for all instances of the class. Alteration of the prototye definition with change the method definition of all instances of  \`{{data.classname}}\`. Use the following prototype definition for methods name for '{{data.classname}}'.
\`\`\`javascript
    {{data.classname}}.prototype.my_method = function (pPar1,pPar2)
\`\`\`
The prototype definition for methods consumes less memory for instances. The class uses the prototype definition for methods.

{{/ifcond}}
{{#ifcond data.reposinfo.static "!=" "yes"}}
## Javascript Class: \`{{data.classname}}\`

{{data.comment}}
* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: {{data.reposinfo.created}}
* last modifications at {{data.reposinfo.modified}}
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: \`js/{{filename data.classname}}.js\`
{{#ifcond data.superclassname "!=" ""}}
* Superclass: \`{{data.superclassname}}\` - code generation in \`ClassEditorUML\` can insert the require-commands automatically. For the settings expand the \`Repository Info\` in ClassEditorUML. You can set \`Require Classes NPM:\` to \`Yes\` and \`ClassEditorUML\` will include require command for super class. ClassEditorUML assumes, that the super class is a locally available.
\`\`\`javascript
const {{data.superclassname}} = require('./{{filename data.superclassname}}');
\`\`\`
The require command assumes the file \`{{filename data.classname}}.js\` in the same directory as \`{{filename data.superclassname}}.js\`.
{{/ifcond}}

{{data.comment}}
* created with [ClassEditorUML](https://niebert.github.io/ClassEditorUML) - Date: {{data.reposinfo.created}}
* last modifications at {{data.reposinfo.modified}}
* URL Class Editor for UML: https://niebert.github.io/ClassEditorUML
* File: \`js/{{filename data.classname}}.js\`
{{#ifcond data.superclassname "!=" ""}}
* Extends class: \`{{data.superclassname}}\` - code generation in \`ClassEditorUML\` can insert the require-commands automatically. For the settings expand the \`Repository Info\` in ClassEditorUML. You can set \`Require Classes NPM:\` to \`Yes\` and \`ClassEditorUML\` will include require command for super class. ClassEditorUML assumes, that the super class is a locally available.
{{/ifcond}}

### Use Module \`{{data.classname}}\`
You can use the module either by importing the library  \`{{filename data.classname}}.js\` with a script-tag in your HTML file:
\`\`\`html
  <script src="js/{{filename data.classname}}.js"></script>
\`\`\`
assuming that you stored the library in the subdirectory \`/js\`. Ohterwise adapt the path to your local folder structure.
The other option is to require the module locally e.g. by
\`\`\`javascript
    const {{data.classname}} = require('./libs/{{filename data.classname}}');
\`\`\`
or required from a repository remotely (e.g. NPM) by:
\`\`\`javascript
    const {{data.classname}} = require('{{filename data.classname}}');
\`\`\`
{{/ifcond}}

### Diagram
{{#ifcond data.superclassname "!=" ""}}
The class  \`{{data.classname}}\` inherits all attributes and methods from superclass: \`{{data.superclassname}}\` please require NPM module for super class if it is not available locally by:
\`\`\`javascript
const {{data.superclassname}} = require('{{filename data.superclassname}}');
\`\`\`
{{/ifcond}}

|  {{data.classname}}               |
| ---------------------------- |
| {{{attribs_uml data.attributes}}} |
| {{{methods_uml data.methods}}}    |


### Attributes: \`{{data.classname}}\`
For class \`{{data.classname}}\` the following attributes are defined:
{{#each data.attributes}}

#### Attribute \`{{name}} : {{class}}\`
{{{comment}}}
* Visibility: \`{{visibility}}\`
* Class: \`{{class}}\`
{{#ifcond visibility "==" "public"}}
* Default Init: \`{{{init}}}\` set by \`my_instance.{{name}} = {{{init}}};\`
* Access of attribute in the code of methods by \`this.{{name}} = {{{init}}};\`
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
* Default Init: \`{{{init}}}\` set inside class by \`{{name}} = {{{init}}};\`
* Access of attribute in the code of methods by \`{{name}} = {{{init}}};\`
{{/ifcond}}
{{/each}}

### Methods: \`{{data.classname}}\`
For class \`{{data.classname}}\` the following methods are defined:
{{#each data.methods}}

#### Method \`{{name}}({{#paramcall parameter}}{{/paramcall}})\`
{{{comment}}}
* Visibility: \`{{visibility}}\`
{{#ifcond return "!=" ""}}
* Returns: \`{{return}}\`
{{#ifcond visibility "==" "public"}}
* Call: \`var v{{return}}Ret = v{{../classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}});\` where \`v{{../classname}} = new {{../classname}}()\` is an instance of the class \`= {{../classname}}\`.
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
* Call: \`var v{{return}}Ret = {{name}}({{#paramcall parameter}}{{/paramcall}});\`
{{/ifcond}}
{{/ifcond}}
{{#ifcond return "==" ""}}
{{#ifcond visibility "==" "public"}}
* Call: \`v{{../classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}});\` where \`v{{../classname}} = new {{../classname}}()\` is an instance of the class \`{{../classname}}\`.
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
* Call: \`{{name}}({{#paramcall parameter}}{{/paramcall}});\`
{{/ifcond}}
{{/ifcond}}
* Parameter List:
{{#each parameter}}
   * \`{{name}}:{{class}}\` {{{removereturn comment}}}
{{/each}}
{{/each}}
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
