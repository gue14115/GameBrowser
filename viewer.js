var fs = require("fs");
function content(response){
    //console.log("Request handler 'show' was called.");
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
	//console.log("Request handler "+pathname+" was called.");
	fs.readFile("./content"+pathname, function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else { //Checks which extension the path has (which kind of file should be written into the response)
			var res = pathname.split("/");
			var res2 = res[res.length-1].split(".");
			var res3 = res2[res2.length-1];
			//console.log("Returning a file the extension: "+res3);
			if(res3=="css"){
				response.writeHead(200, {"Content-Type": "text/css"});
				response.write(file);
				response.end();
			}
			if(res3=="js"){
				response.writeHead(200, {"Content-Type": "text/js"});
				response.write(file);
				response.end();
			}
			if(res3!="css"||res3!="js"){
				response.writeHead(200, {"Content-Type": "text/html"});
				response.write(file);
				response.end();
			}
		}
	}
		);
}
exports.content = content;
exports.other = other;