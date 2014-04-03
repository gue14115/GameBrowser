/**
 * Created by Anil on 05.02.14.
 */
var sqlite3 = require('sqlite3').verbose();

exports.database = function (dbName) {
    var db = new sqlite3.Database(dbName);

    this.getTradeable = function(callb){
        db.all("SELECT gg.gr_name gg, dg.gr_name dg FROM g_games INNER JOIN u_users ON u_users.u_id=g_games.g_u_id INNER JOIN d_desiredgames ON d_desiredgames.d_u_id = u_users.u_id INNER JOIN gr_gamerange gg ON g_games.g_gr_id = gg.gr_id INNER JOIN gr_gamerange dg ON d_desiredgames.d_gr_id = dg.gr_id", {}, function (err, row) {
            if (row.length > 0){
                console.log(row);
                if (row.length > 0)
                    callb(1, row);
            }
            else
                callb(0);
        });
    }
    this.username = function(session,callb){
        db.all("SELECT s_u_id FROM s_sessions WHERE s_id=$session", {$session: session}, function (err, row) {
            if (row.length > 0){
            console.log(row[0]);
                db.all("SELECT u_email FROM u_users WHERE u_id=$u_id", {$u_id: row[0]["s_u_id"]}, function (err, row) {
                    if (row.length > 0)
                        callb(1, row[0]);
                    else
                        callb(0);
                });
            }
            else
                callb(0);
        });
    }
    this.checkSession = function(session, callb){
        db.all("SELECT s_u_id FROM s_sessions WHERE s_id=$session", {$session: session}, function (err, row) {
            if (row.length > 0)
                callb(1, row[0]);
            else
                callb(0);
        });
    }

    this.checkLogin = function (email, password, callb) {
        db.all("SELECT u_id FROM u_users WHERE u_email=$email AND u_password=$password", {$email: email, $password: password}, function (err, row) {
            if (row.length > 0)
                callb(1, row[0]);
            else
                callb(0);
        });
    }

    this.addSession = function (uuid, email) {
        db.run("INSERT INTO s_sessions VALUES($s_id, $s_u_id)", {
            $s_id: uuid,
            $s_u_id: email
        })
    }

    this.clearSession = function (session) {
        db.run("DELETE FROM s_sessions WHERE s_id = $session", {
            $session: session
        });
    }

};