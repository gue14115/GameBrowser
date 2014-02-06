/**
 * Created by Anil on 05.02.14.
 */
var sqlite3 = require('sqlite3').verbose();

exports.database = function(dbName) {
    var db = new sqlite3.Database(dbName);

    this.checkLogin = function(email,password,callb){
        db.all("SELECT u_id FROM u_users WHERE u_email=$email AND u_password=$password",{$email: email, $password: password},function(err,row){
            callb(row);
        });
    }
};