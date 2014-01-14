var fs = require("fs");
function content(response){
    console.log("Request handler 'show' was called.");
	fs.readFile("./content/index.html", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file);
			response.end();
		}
	});
}

//This function gets the file that was requested by the requestHandlers.js function open
function other(response, pathname){
	console.log("Request handler "+pathname+" was called.");
	fs.readFile("./content"+pathname, function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file);
			response.end();
		}
	}
		);
}
exports.content = content;
exports.other = other;