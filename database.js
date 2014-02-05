/**
 * Created by Anil on 05.02.14.
 */
var sqlite3 = require('sqlite3').verbose();

exports.database = function(dbName) {
    var db = new sqlite3.Database(dbName);

    this.checkLogin = function(callb){
        db.all("SELECT * FROM u_users where u_id = 1",function(err,row){
            callb(row);
        });
    }
};