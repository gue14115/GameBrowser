function route(handle, pathname, response, request, content, content2, other, other2) { 
	console.log("About to route a request for " + pathname); 
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, request, content, content2, pathname, other, other2); 
	} else {
		handle["dynamic"](response, request, content, content2, pathname, other, other2); 
	}
}
exports.route = route;