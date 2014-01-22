var querystring = require("querystring")
var users = {};

function start(response, postData, showIndexContentAndCreateCookies, showIndexContentAndReuseCookies) {
	console.log("Request handler 'start' was called.");
	//content(response); DEPRECATED
	var cookies = parseCookies(postData);
	if(typeof cookies["gbsessioncookie"] == "string"){
		console.log("Cookie was reused");
		showIndexContentAndCreateCookies(response);
	}
	else{
		var uuid = createUUID();
		console.log("Cookie was created");
		showIndexContentAndReuseCookies(response, uuid);
	}
}

function open(response, postData,pathname, showContentAndCreateCookies, showContentAndReuseCookies){
	console.log("Request handler 'help' was called.");
	var cookies = parseCookies(postData);
	if(typeof cookies["gbsessioncookie"] == "string"){
		console.log("Cookie was reused");
		showContentAndCreateCookies(response, pathname);
	}
	else{
		var uuid = createUUID();
		console.log("Cookie was created");
		showContentAndReuseCookies(response, pathname, uuid);
	}
}


function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
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

    var uuid = s.join("");
    return uuid;
}
exports.start = start;
exports.open = open;