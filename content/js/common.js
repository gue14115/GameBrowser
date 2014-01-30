/**
 * Created by macbook on 23.01.14.
 */
var serverurl="http://127.0.0.1:8888";
var token;
var listeKlassenAngezeigt=false;
var listeSchuelerAngezeigt=false;

function login(){
    $.ajax({
        type: "POST",
        url: serverurl,
        data: {action:"requestToken", username:$('#inputUser').val(), password:$('#inputPassword').val()},
        success: responseErhalten,
        error: serverfehler
    });
}

function responseErhalten(data){
}
function serverfehler(){
}