var querystring = require("querystring")

function start(response, postData, content, pathname, other) {
	console.log("Request handler 'start' was called.");
	content(response);
}

function open(response, postData, content, pathname, other){
	console.log("Request handler 'help' was called.");
	other(response, pathname);
}
exports.start = start;
exports.open = open;