function route(handle, pathname, response, request, content, other) { 
	console.log("About to route a request for " + pathname); 
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request, content, pathname, other); 
	} else {
		//handle["/help.html"](response, request, content, pathname, other); 
	    console.log("No request handler found for " + pathname);
	    response.writeHead(404, {"Content-Type": "text/html"});
	    response.write("404 Not found");
	    response.end();
	}
}
exports.route = route;