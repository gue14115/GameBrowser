/**
 * Created by anil on 16/02/14.
 */
var data = require("./database");
var db = new data.database("GameBrowserDatabase");

function login(decodedBody,response, request){
    if(decodedBody.action == 'login'){
        console.log("Email:"+decodedBody.email);
        console.log("Password:"+decodedBody.password);
        db.checkLogin(decodedBody.email,decodedBody.password,function callback(success,data){
            console.log(JSON.stringify(data));
            if(success==true){
                console.log("Logged in");
                var cookies = parseCookies(request);
                console.log("with sessionid:"+cookies["gbsessioncookie"]);
                db.addSession(cookies["gbsessioncookie"],decodedBody.email);
                response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'localhost:8888'});
                response.end(JSON.stringify(data));
                myVar=setTimeout(function(){
                    console.log("Clearing session: "+ cookies["gbsessioncookie"]);
                    //db.clearSession(cookies["gbsessioncookie"]);
                },30000);
            }
            else{
                console.log("Not logged in");
                response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': 'localhost:8888'});
                response.end("error");
            }
        })
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

exports.login = login;