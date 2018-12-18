#!/bin/sh
echo "-----------------------------------"
echo "--- CALL: $0"
echo "-----------------------------------"
# Source URL to download from the files:
urlpath="https://raw.githubusercontent.com/niebert"
# Append Path of Repository to source path

# --------------------------------
# Linux OS Settings
# SED: Stream EDit Call differ on GNU Linux and on MacOSX (BSD) Linux

#---GNU Linux Settings------------
#OpSys="GNU Linux"
#sed_call = "sed -i "
# --------------------------------

#---MacOSX BSD Linux Settings-----
OpSys="MacOSX - BSD Linux"
sed_call = "sed -i '' "
# --------------------------------


source="$urlpath/Handlebars4Code/master"

githubuser="niebert"
reponame="audioslides4web"
exportvar="AudioSlides4Web"


#defvalue=$githubuser
#read -p "Enter your GitHub username for this repository?  " -i "$defvalue" githubuser
#defvalue=$reponame
#read -p "Enter your GitHub Repository name?  " -i "$defvalue" reponame
#defvalue=$exportvar
#read -p "Enter your Export Variable/Classname for this repository?  " -i "$defvalue" exportvar

# echo the current Operating System
echo "------------------------------------------------------"
echo "INFOMATION: Local Repository and Operating System"
echo "Operating System: $OpSys"
echo "Repository Name:            $reponame"
echo "Export Variable/Class Name: $exportvar"
echo "GitHub Username:            $githubuser"
echo "------------------------------------------------------"


# wait 2 seconds to
sleeptime=2

mkdir -p dist
mkdir -p docs
mkdir -p docs/css
mkdir -p docs/js
mkdir -p docs/db
mkdir -p docs/tpl
mkdir -p docs/fonts
mkdir -p docs/schema
mkdir -p src
mkdir -p src/libs
mkdir -p src/html
mkdir -p src/readme
mkdir -p src/css

# codegenerator files (RepoBase "HandleBars4Code")
wget $source/build.js  -O ./build.js
wget $source/src/codegen.js  -O ./src/codegen.js

sleep $sleeptime

# Libs for ./src
wget $urlpath/json-editor-dorn/master/dist/jsoneditor.min.js -O ./src/libs/jsoneditor.min.js
wget $urlpath/json-editor-dorn/master/dist/jsoneditor.js -O ./src/libs/jsoneditor.js
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
wget $source/src/libs/json.js -O ./src/libs/handlebars4code.js

#### NPM Files
file="package.json"
if [ -f "./$file" ]
then
	echo "NPM: Check file '$file' - found."
else
	echo "NPM: Check file '$file' - not found - try to download."
  wget "$source/$file"  -O "$file"
  echo "------------------------------------------------------"
  echo "STREAM EDITOR SED: Search/Replace in 'package.json'"
  echo "Operating System: $OpSys"
  echo "Repository Name:            $reponame"
  echo "Export Variable/Class Name: $exportvar"
  echo "GitHub Username:            $githubuser"
  echo "------------------------------------------------------"
  regexdef="'s/handelbars4code/$reponame/g'"
  echo "(1) $sed_call $regexdef ./$file "
  $sed_call $regexdef ./$file
  regexdef="'s/Handelbars4Code/$exportvar/g'"
  echo "(2) $sed_call $regexdef ./$file "
  $sed_call $regexdef ./$file
  regexdef="'s/niebert/$githubuser/g'"
  echo "(3) $sed_call $regexdef ./$file "
  $sed_call $regexdef ./$file
  echo "SED-Call: Search/Replace in 'package.json' DONE"
  echo "------------------------------------------------------"
  sleep $sleeptime

fi

#### CODE GENERATION src/libs src/html
file="files4build.js"
if [ -f "./$file" ]
then
	echo "CODEGEN: Check file '$file' - found."
else
	echo "CODEGEN: Check file '$file' - not found - try to download."
  wget "$source/src/$file  -O ./src/$file"
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
for filename in "acknowledgement.md" "body.md" "browserify.md" "build_process.md" "doctoc.md" "folderdocs.md" "folderrepo.md" "handlebars4code.md" "headerintro.md" "jsonschema.md" "tail.md" "usage.md"
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

### FONT-AWESOME for docs/fonts
for filename in "fontawesome-webfont." "fontawesome-webfont.eot" "fontawesome-webfont.svg" "fontawesome-webfont.ttf" "fontawesome-webfont.woff" "fontawesome-webfont.woff2" "FontAwesome.otf"
do
  echo "FONT: checking file exists or download '$filename'"
  file="./docs/fonts/$filename"
  if [ -f "$file" ]
  then
  	echo "   Check file '$file' - found."
  else
  	echo "   Check file '$file' - not found - try to download."
    wget $source/src/css/$filename  -O $file
		sleep $sleeptime
  fi
done
echo "---------------------------------------------------"
echo "              DOWNLOAD FINISHED"
echo "---------------------------------------------------"
echo "Operating System:           $OpSys "
echo "    in case you run the script on other Linux OS"
echo "    please edit $0 and alter SED-call."
echo "Repository Name:            $reponame"
echo "Export Variable/Class Name: $exportvar"
echo "GitHub Username:            $githubuser"
echo "---------------------------------------------------"
