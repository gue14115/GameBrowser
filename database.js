/**
 * Created by Anil on 05.02.14.
 */
var sqlite3 = require('sqlite3').verbose();

exports.database = function(dbName) {
    var db = new sqlite3.Database(dbName);

    this.checkLogin = function(email,password,callb){
        db.all("SELECT u_id FROM u_users WHERE u_email=$email AND u_password=$password",{$email: email, $password: password},function(err,row){
            if(row.length>0)
                callb(1,row[0]);
            else
                callb(0);
        });
    }

    this.addSession = function(uuid,email){
        db.run("INSERT INTO s_sessions VALUES($s_id, $s_u_id)",{
            $s_id: email,
            $s_u_id: uuid
        })
    }

    this.clearSession = function(session){
        db.run("DELETE FROM s_sessions WHERE s_u_id = $session",{
            $session: session
        });
    }
};