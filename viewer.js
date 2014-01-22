var fs = require("fs");
var handle = {}
handle["Cookies"] = addHeader;
handle["NoCookies"] = addHeaderWithCookies;


//This function gets the file that was requested by the requestHandlers.js function open
function showContentAndCreateCookies(response, pathname, bonus, uuid){
	//console.log("Request handler "+pathname+" was called.");
    if(pathname=="/"){
        pathname = "/index.html";
    }
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
                handle[bonus](response,200,"text/css",uuid);
				response.write(file);
				response.end();
			}
			if(res3=="js"){
                handle[bonus](response,200,"application/javascript",uuid);
				response.write(file);
				response.end();
			}
			if(res3!="css"||res3!="js"){
                handle[bonus](response,200,"text/html",uuid);
				response.write(file);
				response.end();
			}
		}
	});
	console.log("------------------------------------------------");
}

//Header that sets a cookie
function addHeaderWithCookies(response,errorcode, type, uuid){
    response.writeHead(errorcode, {
        'Set-Cookie': 'gbsessioncookie='+uuid,
        "Content-Type": type
    });
}

//Header that sets no cookie
function addHeader(response,errorcode,type){
    response.writeHead(errorcode, {"Content-Type": type});
}

exports.showContentAndCreateCookies = showContentAndCreateCookies;
exports.showContentAndReuseCookies = showContentAndReuseCookies;