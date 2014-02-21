var http = require("http");
var url = require("url");
var serverUrl = "127.0.0.1";
var port = 8888;
var uuid;

//Called when the server starts
function start(route, open, show, postHandle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        console.log("Request for " + pathname + " received.");
        //Route to requested page
        var cookies = parseCookies(request);
        if (typeof cookies["gbsessioncookie"] == "string") {
            uuid = cookies["gbsessioncookie"];
            route(open, pathname, response, request, show, postHandle, "Cookies", uuid);
        }
        else {
            uuid = createUUID();
            route(open, "/login.html", response, request, show, postHandle, "NoCookies", uuid);
        }
    }

    http.createServer(onRequest).listen(port, serverUrl);
    console.log("Server has started.");
}

//Parsing cookies
function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
}

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

    uuid = s.join("");
    return uuid;
}
exports.start = start;