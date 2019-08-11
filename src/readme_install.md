

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
