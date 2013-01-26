/*\
 * A) Intro
 * A tiny but powerful documentation builder for Javascript projects. dr.js is built on top of node.js and is a pure javascript documentation solution for javascript, cool!
 *
 * In fact, this page is the result of running dr.js!
\*/

/*\
 * B) Features
# <ul>
# <li>searchbox to filter methods and properties</li>
# <li>generated document is a single file html, which is neat</li>
# <li>anchors and internal links</li>
# <li>link back to exact line of source code on github</li>
# <li>colorful tags plus syntax highlighted code snippets</li>
# <li>printer friendly version</li>
# <li>example: <a href="http://raphaeljs.com/reference.html">Raphael</a> documentation is built with dr.js</li>
# <li>example2: <a href="https://github.com/tyt2y3/dr.js/blob/master/sample">source</a> and <a href="http://tyt2y3.github.com/dr.js/sample/docs.html">documentation</a></li>
# </ul>
\*/

/*\
 * C) Usage
# <ul>
# <li>first install <a href="http://nodejs.org/">node.js</a> and npm
# <li>in the `dr.js/` directory, run `npm install`
#	<ul>
#	<li> if you work on a NTFS partition, you may receive `Error: EPERM, symlink '../nopt/bin/nopt.js'`</li>
#	<li> in this case you should copy `dr.js/node_modules/markdown/node_modules/nopt/bin/nopt.js` to `dr.js/node_modules/markdown/node_modules/.bin/nopt.js` manually</li>
#	</ul>
# </li>
# <li>then run</li>
# </ul>
 | node dr config.json
\*/

/*\
 * D) json config
 * example
| {
|     "title": "Chipmunk",
|     "output": "docs.html",
|     "scripts": [],
|     "files": [{
|         "path": "chipmunk.js",
|         "link": "https://github.com/tyt2y3/dr.js/blob/master/sample/chipmunk.js"
|     }],
|     "external_css": false,
|     "external_js": false
| }
* `title` is the text that will appear in `<head><title>` and `<body><h1>`
* 
* `output` is the output html
* 
* `scripts` are javasript files that will be included into the html via a `<script>` tag.
* 
* this allows you to manipulate the html dynamically. since Raphael is a javascript library, `raphael.js` itself is being included into the documentation to make life examples, which is remarkable to javascript projects.
* 
* `files` are the script files to be processed
* 
*    `path` is the url of the file
*    `link` is the link to a pretty printed version of the script file. every method and property remembers its line number in the source, clicking the ➭ button will bring you to `link#L12` where L12 is the line number.
* 
* `external_css`; optional, if set to true, the css files will be linked via a `<link rel="stylesheet">` tag. default is false, which the css files are embedded into html, so that `docs.html` is really a standalone, good-to-go html documentation.
* 
* `external_js`; similar to `external_css`, whether to embed the files specified in `scripts`
* 
\*/

/*\
 * E) Format
 * dr.js uses the `dr` format, which starts a section with `/*\` and end with `\*/`.
 * 
 * Each line in a section starts with a symbol, the symbols can be
* 
* `*` normal text, with markdown
* 
* `**` ignor this line
* 
* `[` usage is `[ tag ]`, where tag can be
* 
*    `class`, `method` and `property`
* 
* `>` sub heading
* 
* `-` parameter, with `(type)` to indicate type, types can be
* 
*    (object) (number) (string) (function) (boolean) (array)
* 
* `=` return value
* 
* `|` code block
* 
* `o` ordered list
* 
* `#` inline HTML
* 
* something like,
| /*\
|  * IdentifierName
|  [ tag ]
|  ** ignor
|  * normal text @link
|  > sub heading
|  - parameter (type) description
|  = (type) return value description
|  | var x=2, y=[1,2,3]; //code block
|  o list item
|  # HTML <a href="">link</a>
| \*/
* 
* Words starting with `@` will be turned into internal links.
* 
* The start of each section is given a `<div class="extra" id="IdentifierName-extra"></div>` element for manipulation by javascript.
\*/

/*\
 * F) Change log
# <ul>
# <li>Jan26 2013
#   <ul>
#   <li>forked from <a href="https://github.com/DmitryBaranovskiy/dr.js">DmitryBaranovskiy/dr.js</a></li>
#   <li>support working in a different directory</li>
#   <li>by default embed the css and js files</li>
#   <li>besides `method` and `property`, added tag `class`</li>
#   <li>readme and usage examples</li>
#   </ul>
# </li>
# </ul>
\*/
