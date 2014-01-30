var http = require("http"); var url = require("url");
var serverUrl = "127.0.0.1";
var port = 8888;

//Called when the server starts
function start(route, open, show) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;

		console.log("Request for " + pathname + " received.");
		//Route to requested page
		route(open, pathname, response, request, show);
	};
  	http.createServer(onRequest).listen(port,serverUrl);
  	console.log("Server has started.");
};
exports.start = start;