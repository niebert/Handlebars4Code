const jsdom = require('jsdom');
const { JSDOM } = jsdom;

var LoadFile4DOM = require('../src/main.js');
var vOptions = {
  'id4loadfile': 'myloaderid',
  'debug': true
};

var lf4d = new LoadFile4DOM();

const vDOM = new JSDOM(`<!DOCTYPE html>
<html>
  <body>
    <textarea id="mytxtfile" row="5" cols="80"></textarea>
    <div id="myloaderid" style="display:none">
    </div>
  <body>
</html>`);

// the following function shows the DOM content in console.log()
function show_DOM() {
  console.log('DOM Output:\n' + vDOM.serialize(doc));
}

// create a reference for the window.document
var doc = vDOM.window.document;
// show the generated DOM tree as HTML by serialization
show_DOM();
console.log("CALL: init() Class: LoadFile4DOM");
lf4d.init(doc, vOptions);
console.log("CALL: init() finished");
var loader_opts = {
  multiple:false
};
var loader4txt = lf4d.get_loader_options("mytxtfile","text",loader_opts);
console.log("loader4txt="+JSON.stringify(loader4txt,null,4));
// set the
loader4txt.onload = function (data,err) {
  if (err) {
    // do something on error, perr contains error message
    console.error(err);
  } else {
    // do something with the file content in data e.g. store  in a HTML textarea (e.g. <textarea id="mytextarea" ...>
    document.getElementById("mytextarea").value = data;
  }
};
lf4d.create_load_dialog(loader4txt);
// Now create all Dialogs in the DOM
// this in called in general on the "onload" event in the <body> tag
// <body onload="lf4d.create()">
lf4d.create();


setTimeout(show_DOM,2000);
