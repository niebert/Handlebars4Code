vDataJSON.tpl.javascript = `
/*
{{#ifcond data.reposinfo.static "!=" "yes"}}
   Javascript Class: {{data.classname}}()
{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}
   SuperClass: {{data.superclassname}}
{{/ifcond}}
{{/ifcond}}
   Class Filename: {{filename data.classname}}.js
{{/ifcond}}
{{#ifcond data.reposinfo.static "==" "yes"}}
   Javascript Module: {{data.classname}}
{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}
   Extends: {{data.superclassname}}
{{/ifcond}}
{{/ifcond}}
   Filename: {{filename data.classname}}.js
{{/ifcond}}

   Author:      {{data.reposinfo.author}}
   email:       {{data.reposinfo.email}}
   Created:     {{data.reposinfo.created}}
   Modified     {{data.reposinfo.modified}}
   created with https://niebert.github.io/ClassEditorUML

{{#ifcond data.reposinfo.require_classes "!=" "yes"}}
   SCRIPT-Tag:  src="js/{{filename classname}}.js"
{{/ifcond}}
{{#ifcond data.reposinfo.require_classes "==" "yes"}}
{{#ifcond data.superclassname "!=" ""}}
{{#ifcond data.superclassname "!=" " "}}
const {{data.superclassname}} = require('{{filename data.superclassname}}');
{{/ifcond}}
{{/ifcond}}
{{#requireclass data settings}}
{{/requireclass}}

{{#requirelibs data.reposinfo.requirelist}}
const {{variable}} = require('{{module}}');
{{/requirelibs}}

{{/ifcond}}
// Configuration Code:
{{{data.reposinfo.configcode}}}
{{#ifcond data.reposinfo.static "==" "yes"}}
{{#foreach data.attributes data}}
{{/foreach}}
{{#foreach data.methods data}}
{{/foreach}}
{{/ifcond}}
{{#ifcond data.reposinfo.static "!=" "yes"}}

{{#ifcond data.superclassname "!=" " "}}
{{#ifcond data.superclassname "!=" ""}}
// Inheritance: '{{data.classname}}' inherits from '{{data.superclassname}}'
{{data.classname}}.prototype = new {{data.superclassname}}();
{{data.classname}}.prototype.constructor={{data.classname}};
{{/ifcond}}
{{/ifcond}}


function {{data.classname}} () {

{{#foreach data.attributes data}}
{{#ifcond comment "!=" ""}}
{{indent comment "    // "}}
{{/ifcond}}
{{#ifcond visibility "==" "public"}}
    this.{{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};   // Class: {{class}}
{{/ifcond}}
{{/foreach}}

}
{{#foreach data.methods data}}


{{#ifcond visibility "==" "public"}}
    {{data.classname}}.prototype.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
            // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}


{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
            // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}
{{/ifcond}}
{{indent code "      "}}
    }
    // ---- Method: {{name}}() Class: {{data.classname}} ------
{{/foreach}}
{{/ifcond}}
{{#ifcond data.reposinfo.static "==" "yes"}}
{{#ifcond data.superclassname "==" " "}}
//---Define Static Class - Export Variable ---
var {{data.classname}} = {};
{{/ifcond}}
{{#ifcond data.superclassname "!=" ""}}
{{#ifcond data.superclassname "!=" " "}}
//---Extend Static Class---------------------
var {{data.classname}} = {{data.superclassname}};
//--------------------------------------
{{/ifcond}}
{{/ifcond}}

{{#foreach data.attributes data}}
{{#ifcond comment "!=" ""}}
{{indent comment "    // "}}
{{/ifcond}}
{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = {{{init}}};
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    var {{name}} = {{{init}}};
{{/ifcond}}
{{/foreach}}

{{#foreach data.methods data}}


{{#ifcond visibility "==" "public"}}
    {{data.classname}}.{{name}} = function ({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
          // console.log("{{filename data.classname}}.js - Call: {{data.classname}}.{{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}
{{/ifcond}}
{{#ifcond visibility "==" "private"}}
    function {{name}}({{#paramcall parameter}}{{/paramcall}}) {
{{#ifcond data.reposinfo.debugheader "==" "yes"}}
          // console.log("{{filename data.classname}}.js - Call: {{name}}({{#paramcall parameter}}{{/paramcall}})");
{{/ifcond}}
{{/ifcond}}

{{indent code indent="      "}}
    };
    // Method: {{name}}() Module: {{data.classname}}
{{/foreach}}


{{/ifcond}}
{{#ifcond data.reposinfo.require_classes "==" "yes"}}

// NodeJS: export '{{data.classname}}' for module {{filename data.classname}}.js
// -------
module.exports = {{data.classname}};
{{/ifcond}}
`;

// NodeJS: uncomment modules.export in last line
// module.export = {{classname}};
