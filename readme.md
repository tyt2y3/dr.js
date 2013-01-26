# dr.js
A tiny but powerful documentation builder for Javascript projects. dr.js is built on top of node.js and is a pure javascript documentation solution for javascript, cool!

## Features
- searchbox that searchs through methods and properties
- generated document is a single file html, which is neat
- anchors and internal links
- link back to exact line of source code on github
- colorful tags plus syntax highlighted code snippets
- printer friendly version
- example: [Raphael](http://raphaeljs.com/reference.html) documentation is built with dr.js
- example2: [source](https://github.com/tyt2y3/dr.js/blob/master/sample) and [documentation](http://tyt2y3.github.com/dr.js/sample/docs.html)

## Usage
- first install [node.js](http://nodejs.org/) and npm
- in the `dr.js/` directory, run `npm install`
> if you work on a NTFS partition, you may receive `Error: EPERM, symlink '../nopt/bin/nopt.js'`
> in this case you should copy `dr.js/node_modules/markdown/node_modules/nopt/bin/nopt.js` to `dr.js/node_modules/markdown/node_modules/.bin/nopt.js` manually
- run `node dr config.json`

## json config
example
```
{
    "title": "Chipmunk",
    "output": "docs.html",
    "scripts": [],
    "files": [{
        "path": "chipmunk.js",
        "link": "https://github.com/tyt2y3/dr.js/blob/master/sample/chipmunk.js"
    }],
    "external_css": false,
    "external_js": false
}
```
- `title` is the text that will appear in `<head><title>` and `<body><h1>`
- `output` is the output html
- `scripts` are javasript files that will be included into the html via a `<script src="">` tag.
  this allows you post-process the html in runtime. since Raphael is a javascript library, `raphael.js`
  itself is being included into the documentation to make life examples, which is remarkable to javascript
  projects.
- `files` are the script files to be processed
	- `path` is the url of the file
	- `link` is the link to a pretty printed version of the script file
	  every method and property remembers its line number in the source, clicking the ➭ button will bring
	  you to `link#L12` where L12 is the line number.
- `external_css`; optional, if set to true, the css files will be linked via a
  `<link rel="stylesheet">` tag. default is false, which the css files are embedded into html,
  so that `docs.html` is really a standalone, good-to-go html documentation.
- `external_js`; similar to `external_css`, whether to embed the files specified in `scripts`

## Change log
- Jan26 2013
	- forked from [DmitryBaranovskiy/dr.js](https://github.com/DmitryBaranovskiy/dr.js)
	- support working in a different directory
	- by default embed the css and js files
	- besides `method` and `property`, added tag `class`
	- readme and usage examples
