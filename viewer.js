var fs = require("fs");


function showIndexContentAndCreateCookies(response){
    //console.log("Request handler 'show' was called.");
	fs.readFile("./content/index.html", function(error, file) {
		if (error) {
			addHeader(response,500,"text/plain");
			response.write(error + "\n");
			response.end();
		} else {
			addHeader(response,200,"text/html");
			response.write(file);
			response.end();
		}
	});
	console.log("------------------------------------------------");
}

function showIndexContentAndReuseCookies(response,uuid){
    var se= "\'Set-Cookie\'";
    var s= "\'gbsessioncookie=\'"+uuid;
	console.log("Created uuid is:"+uuid);
	fs.readFile("./content/index.html", function(error, file) {
		if (error) {
			addHeaderWithCookies(response,uuid,500,"text/plain");
			response.write(error + "\n");
			response.end();
		} else {
			addHeaderWithCookies(response,uuid,200,"text/html");
			response.write(file);
			response.end();
		}
	});
	console.log("------------------------------------------------");
}

//This function gets the file that was requested by the requestHandlers.js function open
function showContentAndCreateCookies(response, pathname){
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
				//response.writeHead(200, {"Content-Type": "text/css"});
                addHeader(response,200,"text/css");
				response.write(file);
				response.end();
			}
			if(res3=="js"){
				//response.writeHead(200, {"Content-Type": "text/js"});
                addHeader(response,200,"text/js");
				response.write(file);
				response.end();
			}
			if(res3!="css"||res3!="js"){
				//response.writeHead(200, {"Content-Type": "text/html"});
                addHeader(response,200,"text/html");
				response.write(file);
				response.end();
			}
		}
	});
	console.log("------------------------------------------------");
}

//same as showContentAndCreateCookies but creates a session id (is called several time right now when the html file links to showContentAndCreateCookies files because it does not create the id until it is finished with the linked files which in turn generate uuids)
function showContentAndReuseCookies(response, pathname, uuid){
	//console.log("Request handler "+pathname+" was called.");
	console.log("Created uuid is:"+uuid+" "+pathname);
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
                addHeaderWithCookies(response,uuid,200,"text/css");
				response.write(file);
				response.end();
			}
			if(res3=="js"){
                addHeaderWithCookies(response,uuid,200,"text/js");
				response.write(file);
				response.end();
			}
			if(res3!="css"||res3!="js"){
                addHeaderWithCookies(response,uuid,200,"text/html");
				response.write(file);
				response.end();
			}
		}
	});
	console.log("------------------------------------------------");
}

//Header that sets a cookie
function addHeaderWithCookies(response,uuid,errorcode, type){
    response.writeHead(errorcode, {
        'Set-Cookie': 'gbsessioncookie='+uuid,
        "Content-Type": type
    });
}

//Header that sets no cookie
function addHeader(response,errorcode,type){
    response.writeHead(errorcode, {"Content-Type": type});
}

exports.showIndexContentAndCreateCookies = showIndexContentAndCreateCookies;
exports.showIndexContentAndReuseCookies = showIndexContentAndReuseCookies;
exports.showContentAndCreateCookies = showContentAndCreateCookies;
exports.showContentAndReuseCookies = showContentAndReuseCookies;