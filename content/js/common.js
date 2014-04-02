/**
 * Created by macbook on 23.01.14.
 */
var serverurl="http://localhost:8888/";
var id;

function login(){
    $.ajax({
        type: "POST",
        url: serverurl,
        //Allows for cookies to be used
        xhrFields: {
            withCredentials: true
        },
        //To a different domain
        crossDomain: true,
        data: {action:"login", email:$('#email').val(), password:$('#password').val()},
        success: responseLogin,
        error: servererror
    });
}

function logout(){
    $.ajax({
        type: "POST",
        url: serverurl,
        //Allows for cookies to be used
        xhrFields: {
            withCredentials: true
        },
        //To a different domain
        crossDomain: true,
        data: {action:"logout"},
        success: responseLogout,
        error: servererror
    });
}

function responseLogin(data){
    if(data=="error"){
        $('#emailContainer').attr('class', 'form-group has-error');
        $('#passwordContainer').attr('class', 'form-group has-error');
        $('#validation').show();
    }
    else{
        id = data["u_id"];
        $('#email').val("Logged in as: "+id);
    }
}

function responseLogout(){
    console.log("Hello");
    window.location.replace('/login.html');
}

function servererror(){
}