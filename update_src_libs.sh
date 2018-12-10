#!/bin/sh

mkdir -p dist
mkdir -p docs/css
mkdir -p docs/js
mkdir -p docs/db
mkdir -p docs/tpl
mkdir -p docs/fonts
mkdir -p docs/schema
mkdir -p src/libs
mkdir -p src/html
mkdir -p src/readme

# codegenerator files (RepoBase "HandleBars4Code")
wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/build.js  -O ./build.js
wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/src/codegen.js  -O ./src/codegen.js

# Libs for ./src
wget https://raw.githubusercontent.com/niebert/json-editor/master/dist/jsoneditor.min.js -O ./src/libs/jsoneditor.min.js
wget https://raw.githubusercontent.com/niebert/json-editor/master/dist/jsoneditor.js -O ./src/libs/jsoneditor.js
wget https://raw.githubusercontent.com/niebert/LinkParam/master/dist/linkparam.js -O ./src/libs/linkparam.js
wget https://raw.githubusercontent.com/niebert/LinkParam/master/dist/linkparam.min.js -O ./src/libs/linkparam.min.js
# wget https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js -O ./src/libs/filesaver.js
# wget https://raw.githubusercontent.com/eligrey/Blob.js/master/Blob.js -O ./src/libs/blob.js
wget https://cdn.rawgit.com/eligrey/Blob.js/0cef2746414269b16834878a8abc52eb9d53e6bd/Blob.js -O ./src/libs/blob.js
wget https://cdn.rawgit.com/eligrey/canvas-toBlob.js/f1a01896135ab378aa5c0118eadd81da55e698d8/canvas-toBlob.js  -O ./src/libs/canvas2blob.js
wget https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js -O ./src/libs/filesaver.js
wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/dist/handlebars4code.js -O ./src/libs/handlebars4code.js
wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/dist/handlebars4code.min.js -O ./src/libs/handlebars4code.min.js

#### CODE GENERATION src/libs src/html
file="./src/libs4build.js"
if [ -f "$file" ]
then
	echo "$file found."
else
	echo "$file not found - try to download."
  wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/src/libs4build.js  -O ./src/libs4build.js
fi

### HTML Code Generation
for filename in "header.html" "headerscript.html" "headerlibs.html" "bodyheader.html" "body.html" "bodytail.html" "tailscript.html" "tail.html"
do
  echo "Looping ... download $filename"
  file="./src/html/$filename"
  if [ -f "$file" ]
  then
  	echo "$file found."
  else
  	echo "$file not found - try to download."
    wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/src/html/$filename  -O $file
  fi
done

### README Code Generation
for filename in "headerintro.md" "doctoc.md" "install.md" "usage.md" "handlebars4code.md" "body.md" "docsfolders.md" "folders.md" "acknowledgement.md" "tail.md"
do
  echo "Looping ... download $filename"
  file="./src/readme/$filename"
  if [ -f "$file" ]
  then
  	echo "$file found."
  else
  	echo "$file not found - try to download."
    wget https://raw.githubusercontent.com/niebert/Handlebars4Code/master/src/readme/$filename  -O $file
  fi
done
