/**
 * Created by anil on 16/02/14.
 */
var data = require("./database");
var db = new data.database("GameBrowserDatabase");

function login(decodedBody, response, request, uuid) {
    console.log("Email:" + decodedBody.email);
    console.log("Password:" + decodedBody.password);
    db.checkLogin(decodedBody.email, decodedBody.password, function callback(success, data) {
        console.log(JSON.stringify(data));
        if (success == true) {
            console.log("Logged in with sessionid: " + uuid);
            db.addSession(uuid, decodedBody.email);
            response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'localhost:8888'});
            response.end(JSON.stringify(data));
        }
        else {
            console.log("Not logged in");
            response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': 'localhost:8888'});
            response.end("error");
        }
    })
}

exports.login = login;