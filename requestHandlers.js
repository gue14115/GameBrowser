var querystring = require("querystring")

//Other pages
function open(response, request,pathname, show){
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
            if(decodedBody.action == 'login'){
                console.log("Email:"+decodedBody.email);
                console.log("Password:"+decodedBody.password);
            }
        });
    }
    if(request.method == 'GET'){
        console.log("GET");
        console.log("Request handler 'help' was called.");
        var cookies = parseCookies(request);
        if(typeof cookies["gbsessioncookie"] == "string"){
            var uuid = createUUID();
            console.log("Cookie was reused");
            show(response, pathname,"Cookies", uuid);
        }
        else{
            var uuid = createUUID();
            console.log("Cookie was created");
            show(response, "/login.html","NoCookies",uuid);
        }
    }
};


function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
};

//Creates UUID
function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};
exports.open = open;