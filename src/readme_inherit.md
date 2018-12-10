

## Extension of Library `Handlebars`
The library `Handlebars4Code` extends the library `Handlebars` with additional feature and an extended API, so  `Handlebars4Code` inherits all attributes and methods from `Handlebars` 
The extension for `Handlebars4Code`  from `Handlebars` can defined with the following code:
```javascript
Handlebars4Code.prototype = new Handlebars();
// Constructor for instances of 'Handlebars4Code' must be updated.
// Otherwise constructor of 'Handlebars' is called
Handlebars4Code.prototype.constructor=Handlebars4Code;
```
For further details see http://phrogz.net/js/classes/OOPinJS2.html and explanation for inheritance with JavaScript.
