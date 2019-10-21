
var Handlebars = require('handelbars');
var Handlebars4Code = require('../src/main.js');
var vTemplate = `
My first name is {{{first}}} and my last name is {{{last}}}.
My age is {{{age}}}
`;

var vJSON = {
  "first": "Peter",
  "last": "Miller",
  "age": 25
};

console.log("CALL: create Compiler with Handlebars4Code");
var code_compiler = Handlebars4Code.compile(vTemplate);
console.log("CALL: code_compiler() generated");
var output = code_compiler(vJSON);
console.log("Output Handelbars4Code: "+output);

doc.getElementById("outext").innerHTML;
// Now create all Dialogs in the DOM
// this in called in general on the "onload" event in the <body> tag
// <body onload="lf4d.create()">

setTimeout(show_DOM,2000);
