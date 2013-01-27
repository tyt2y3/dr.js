/*
 * Dr.js 0.0.6 - Simple JavaScript Documentation
 *
 * Copyright (c) 2011-2012 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
var fs = require("fs"),
    path = require("path"),
    docit = require("./doc.js"),
    format = require("./formatter.js"),
    _ref = require("child_process"),
    spawn = _ref.spawn,
    exec = _ref.exec;

function getPath(filepath) {
    return "docs/" + path.basename(filepath, path.extname(filepath));
}

var files = process.argv.slice(2),
	basepath = path.dirname(process.argv[1]),
    srcs = [],
    chunks = {},
    title = "",
    output = "",
    scripts = [],
    fileName,
    toc = [];

if (!files.length) {
    console.log("\nUsage: node dr <conf.json>");
}

if (files.length == 1 && path.extname(files[0]) == ".json") {
    var json = JSON.parse(fs.readFileSync(files[0], "utf-8"));
    title = json.title;
    files = [];
    for (var i = 0, ii = json.files && json.files.length; i < ii; i++) {
        files.push(json.files[i].path);
        srcs.push(json.files[i].link);
    }
    for (var i = 0, ii = json.directory && json.directory.length; i < ii; i++) {
		var ls = fs.readdirSync(json.directory[i].path);
		for (var j=0, jj = ls && ls.length; j < jj; j++) {
			if( json.directory[i].extension)
				var isext = json.directory[i].extension.length==0;
			else
				var isext = true;
				//if extension is undefined or is an empty array, assume all extensions
			if( !isext)
			for(var k=0, kk = json.directory[i].extension.length; k < kk; k++) {
				if( json.directory[i].extension[k] === path.extname(ls[j])) {
					isext = true;
					break;
				}
			}
			if( isext)
			{
				files.push( path.join(json.directory[i].path, ls[j]) );
				srcs .push( path.join(json.directory[i].link, ls[j]) );
			}
		}
    }
    output = json.output || "";
    scripts = json.scripts || [];
}

console.log("\nTrust me, I am a Dr.js\n");
for (i = 0, ii = files.length; i < ii; i++) {
    var filename = files[i];
    fileName = fileName || filename;
    console.log("Processing " + filename);
    var code = fs.readFileSync(filename, "utf-8"),
        res = docit(code, filename, srcs[i]);
    if (res.sections && res.source) {
        toc = toc.concat(res.toc);
        for (var key in res.chunks) if (res.chunks.hasOwnProperty(key)) {
            chunks[key] = res.chunks[key];
        }
        title = title || res.title;
        console.log("Found \033[32m" + res.sections + "\033[0m sections.");
        console.log("Processing \033[32m" + res.loc + "\033[0m lines of code...");
        srcs[i] || (function (filename) {
            fs.writeFile(getPath(filename) + "-src.html", res.source, function () {
                console.log("Saved to \033[32m" + getPath(filename) + "-src.html\033[0m\n");
            });
        })(filename);
    } else {
        console.log("\033[31mNo comments in Dr.js format found\033[0m");
    }
}
var TOC = "",
    RES = "";
toc.sort(function (a, b) {
    if (a.name == b.name) {
        return 0;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 1;
});
for (i = 0, ii = toc.length; i < ii; i++) if (!i || toc[i].name != toc[i - 1].name) {
    TOC += format('<li class="dr-lvl{indent}"><a href="#{name}" class="{clas}"><span>{name}{brackets}</span></a></li>', toc[i]);
    RES += chunks[toc[i].name] || "";
}

var css;
if( json.external_css)
	css = '<link rel="stylesheet" href="dr.css" media="screen">\n<link rel="stylesheet" href="dr-print.css" media="print">';
else
	css = '<style type="text/css" media="screen">\n'+fs.readFileSync(path.join(basepath,"dr.css"), "utf-8")+'\n</style>\n'+
	      '<style type="text/css" media="print">\n'+fs.readFileSync(path.join(basepath,"dr-print.css"), "utf-8")+'\n</style>';
var html = '<!DOCTYPE html>\n<!-- Generated with Dr.js -->\n<html lang="en"><head><meta charset="utf-8"><title>' + title + ' Reference</title>\n' + css + '\n</head>\n<body id="dr-js"><div id="dr"><ol class="dr-toc" id="dr-toc">' + TOC + '</ol><div class="dr-doc"><h1>' + title + ' Reference</h1>' + RES + "</div></div>\n";
for (i = 0, ii = scripts.length; i < ii; i++) {
	if( json.external_js)
		html += '<script src="' + scripts[i] + '"></script>\n';
	else
		html += '<script>\n' + fs.readFileSync(scripts[i], "utf-8") + '\n</script>\n';
}
html += "<script>" + fs.readFileSync(path.join(basepath,"toc.js"), "utf-8") + "</script>\n</body></html>";
fs.writeFile(output || (getPath(fileName) + ".html"), html, function () {
    console.log("Saved to \033[32m" + (output || getPath(fileName) + ".html") + "\033[0m\n");
});
