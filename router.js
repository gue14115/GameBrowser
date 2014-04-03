var querystring = require("querystring");
var dataconnection = require("./database");
var db = new dataconnection.database("GameBrowserDatabase");

function route(open, pathname, response, request, show, postHandle, bonus, uuid) {
    console.log("About to route a request for " + pathname);
    var myVar;
    if (request.method == 'POST') {
        console.log("POST");
        var postData = '';

        //When data is being received
        request.on('data', function (chunk) {
            //Add the chunk of the data to the postData
            postData += chunk;
            console.log("The postData is: " + postData);
        });

        //When the request data has been sent completely
        request.on('end', function () {
            var decodedBody = querystring.parse(postData);
            //Checks what action has occured
            postHandle[decodedBody.action](decodedBody, response, request, uuid);
            //After 24 minutes, clear the session
            /*
            clearTimeout(myVar);
            myVar = setTimeout(function () {
                console.log("Clearing session: " + uuid);
                db.clearSession(cookies["gbsessioncookie"]);
            }, 1000000);//1440000
            */
        });
    }
    if (request.method == 'GET') {
        console.log("GET");
        if(pathname=="/login.html"||pathname=="/help.html"||pathname=="/about.html"||pathname=="/gamehub.html"||pathname=="/tradehub.html"||pathname=="/index.html"){
        db.checkSession(uuid, function callback(success, data) {
            if (success == true) {
                if(pathname!="/login.html")
                    open(response, pathname, show, bonus, uuid);
                else
                    open(response, "/index.html", show, bonus, uuid);
            }
            else {
                open(response, "/login.html", show, bonus, uuid);
            }
        })
        }
        else{
            open(response, pathname, show, bonus, uuid);
        }
    }
}
exports.route = route;