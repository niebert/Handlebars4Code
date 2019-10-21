
var Handlebars4Code = require('../src/main.js');
var vTemplate = `
My first name is {{{first}}} and my last name is {{{last}}}.
My age is {{{age}}}.
`;

var vJSON = {
  "first": "Peter",
  "last": "Miller",
  "age": 25
};

var test_output = `
My first name is Peter and my last name is Miller.
My age is 25.
`;
console.log("CALL: create Compiler with Handlebars4Code");
var code_compiler = Handlebars4Code.compile(vTemplate);
console.log("CALL: code_compiler() generated");
var output = code_compiler(vJSON);
console.log("Output Handelbars4Code: "+output);
if (output == test_output) {
  console.log("OK: Test passed");
} else {
  console.error("ERROR: Test failed: \nOutput: '"+output+"'\nTest output: '" + test_output + "'");
};

//setTimeout(show_DOM,2000);
