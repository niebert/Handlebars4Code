<h1>Handelbars4Code Demo</h1>
<h3>JSON Source was generated with <a href="https://niebert/github.io/ClassEditorUML" target="_blank">ClassEditorUML</a></h3>
<form name="fconvert">
  <b>JSON Input:</b><br>
<textarea id="jsonstring" name="jsonstring" cols="125" rows="10">This is a
</textarea><br>
<b>Output of Handlebars4Code</b>
<select id="sTemplate" onchange="setTemplate(this.value)">
         <option value="javascript" selected="selected">Javascript Code</option>
         <option value="docu4github">Documentation for GitHub</option>
</select>
<input name="bConvert" value=" Create Output " onclick="convert(el('sTemplate').value);return false" type="button">
<br>

<textarea id="output" name="output" cols="125" rows="10"></textarea><br>
</form>
<hr>
<b>Used Template of Handlebars4Code (readonly)</b><br>
<textarea id="tTemplate" name="tTemplate" cols="125" rows="10" readonly></textarea><br>
</form>
