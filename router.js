function route(handle, pathname, response, request, content, other) { 
	//console.log("About to route a request for " + pathname); 
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request, content, pathname, other); 
	} else {
		handle["dynamic"](response, request, content, pathname, other); 
	}
}

exports.route = route;