var http = require("http"); var url = require("url");

//Called when the server starts
function start(route, handle, content, content2, other, other2) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;

		//console.log("Request for " + pathname + " received.");
		//Route to requested page
		route(handle, pathname, response, request, content, content2, other, other2);
	}
  	http.createServer(onRequest).listen(8888);
  	console.log("Server has started.");
}
exports.start = start;