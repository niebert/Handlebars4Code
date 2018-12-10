#!/bin/sh
urlpath="https://raw.githubusercontent.com/niebert"
source="$urlpath/Handlebars4Code/master"

githubuser="niebert"
reponame="handlebars4code"
exportvar="Handlebars4Code"


read -p "Enter your GitHub username for this repository?  " githubuser
read -p "Enter your GitHub Repository name?  " reponame
read -p "Enter your Export Variable/Classname for this repository?  " exportvar

echo "Repository Name:            $reponame"
echo "Export Variable/Class Name: $exportvar"
echo "GitHub Username:            $githubuser"


# wait 2 seconds to
sleeptime=2

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
mkdir -p src/css

# codegenerator files (RepoBase "HandleBars4Code")
wget $source/build.js  -O ./build.js
wget $source/src/codegen.js  -O ./src/codegen.js

sleep $sleeptime

# Libs for ./src
wget $urlpath/json-editor/master/dist/jsoneditor.min.js -O ./src/libs/jsoneditor.min.js
wget $urlpath/json-editor/master/dist/jsoneditor.js -O ./src/libs/jsoneditor.js
wget $urlpath/LinkParam/master/dist/linkparam.js -O ./src/libs/linkparam.js
wget $urlpath/LinkParam/master/dist/linkparam.min.js -O ./src/libs/linkparam.min.js
# wget https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js -O ./src/libs/filesaver.js
# wget https://raw.githubusercontent.com/eligrey/Blob.js/master/Blob.js -O ./src/libs/blob.js


sleep $sleeptime

wget https://cdn.rawgit.com/eligrey/Blob.js/0cef2746414269b16834878a8abc52eb9d53e6bd/Blob.js -O ./src/libs/blob.js
wget https://cdn.rawgit.com/eligrey/canvas-toBlob.js/f1a01896135ab378aa5c0118eadd81da55e698d8/canvas-toBlob.js  -O ./src/libs/canvas2blob.js
wget https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js -O ./src/libs/filesaver.js
wget $source/dist/handlebars4code.js -O ./src/libs/handlebars4code.js
wget $source/dist/handlebars4code.min.js -O ./src/libs/handlebars4code.min.js

#### CODE GENERATION src/libs src/html
file="./files4build.js"
if [ -f "$file" ]
then
	echo "CODEGEN: Check file '$file' - found."
else
	echo "CODEGEN: Check file '$file' - not found - try to download."
  wget "$source/src/libs4build.js  -O ./src/libs4build.js"
	sleep $sleeptime
fi

### HTML Code Generation
for filename in "body.html" "bodyheader.html" "bodytail.html" "datajson.html" "header.html" "headerlibs.html" "headerscript.html" "tail.html" "tailscript.html"
do
  echo "HTML: checking file exists or download '$filename'"
  file="./src/html/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check file '$file' - found."
  else
  	echo "   Check file '$file' - not found - try to download."
    wget $source/src/html/$filename  -O $file
		sleep $sleeptime
  fi
done

### README Code Generation
for filename in "acknowledgement.md" "body.md" "doctoc.md" "folderdocs.md" "folderrepo.md" "handlebars4code.md" "headerintro.md" "tail.md" "usage.md"
do
  echo "README: checking file exists or download '$filename'"
  file="./src/readme/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check file '$file' - found."
  else
  	echo "   Check file '$file' - not found - try to download."
    wget $source/src/readme/$filename  -O $file
		sleep $sleeptime
  fi
done


### CSS Code Generation
for filename in "main.css"
do
  echo "CSS: checking file exists or download '$filename'"
  file="./src/css/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check file '$file' - found."
  else
  	echo "   Check file '$file' - not found - try to download."
    wget $source/src/css/$filename  -O $file
		sleep $sleeptime
  fi
done
echo "Repository Name:            $reponame"
echo "Export Variable/Class Name: $exportvar"
echo "GitHub Username:            $githubuser"
