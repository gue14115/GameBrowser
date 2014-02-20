var querystring = require("querystring");
var dataconnection = require("./database");
var db = new dataconnection.database("GameBrowserDatabase");

function route(open, pathname, response, request, show, postHandle) {
	console.log("About to route a request for " + pathname);
    if(request.method == 'POST'){
        console.log("POST");
        var postData = '';
        //When data is being received
        request.on('data', function(chunk) {
            //Add the chunk of the data to the postData
            postData += chunk;
            console.log("The postData is: "+postData);
        });
        //When the request data has been sent completely
        request.on('end', function() {
            var decodedBody = querystring.parse(postData);
            //Checks what action has occured
            postHandle[decodedBody.action](decodedBody,response, request);
        });
    }
    if(request.method == 'GET'){
        console.log("GET");
        open(response, request, pathname, show);
    }
}
exports.route = route;