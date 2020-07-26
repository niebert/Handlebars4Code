<!-- BEGIN: src/readme/installation.md -->

## Installation `___PKG_EXPORTVAR___`
There are two main types to use `Handlebars4Code` for you projects. With a `script`-tag in your HTML file or with a package manager like [NPM](https://www.npmjs.com/) to use [Handlebars4Code](https://www.npmjs.com/package/___PKG_NAME___) with [NodeJS](https://nodejs.org/en/)

### Installation `___PKG_EXPORTVAR___` with NPM for Scripts
Assume you have NPM installed and your have created e.g. a folder `mypackage/` for your package with `package.json` in the folder `. Go to the folder `mypackage/` and call
```javascript
npm install ___PKG_NAME___ --save
```
Then you will find `___PKG_NAME___` in the folder `mypackage/node_modules/___PKG_NAME___`.
If you want to use `Handlebars4Code` in your scripts use the following require-call:
```javascript
const  ___PKG_EXPORTVAR___ = require('___PKG_NAME___');
```
Now it is possible to use `___PKG_EXPORTVAR___` in your scripts.


### Installation `___PKG_EXPORTVAR___` for Browser for Scripts-Tags
If you want to use the library `___PKG_NAME___.js` in a browser, please copy the file `dist/___PKG_NAME___.js` into your library folder (e.g. `/js`) and
import the library with `script`-tag with:
```html
<script src="js/___PKG_NAME___.js"></script>
```
Now it is possible to use `___PKG_EXPORTVAR___` in your other imported scripts.

<!-- END:   src/readme/installation.md -->
