/**
 * Created by macbook on 23.01.14.
 */
var serverurl="http://127.0.0.1:8888";
var id;

function login(){
    $.ajax({
        type: "POST",
        url: serverurl,
        data: {action:"login", email:$('#email').val(), password:$('#password').val()},
        success: response,
        error: servererror
    });
}

function response(data){
    if(data=="error"){
        $('#email').val("Username and password combination wrong");
    }
    else{
        id = data["u_id"];
        $('#email').val("Logged in as: "+id);
    }
}
function servererror(){
}