function greet(){
    $.ajax({
        type: "POST",
        url: serverurl,
        //Allows for cookies to be used
        xhrFields: {
            withCredentials: true
        },
        //To a different domain
        crossDomain: true,
        data: {action:"greet"},
        success: responseGreet,
        error: servererror
    });
}

function responseGreet(data){
    if(data=="error"){
    }
    else{
        document.getElementById("user-greeting").innerHTML="Welcome "+data["s_u_id"]+"! If you are new check out the <a href=\"help.html\">help</a> section!!! Otherwise head to the <a href=\"tradehub.html\">tradehub</a> to trade games or the <a href=\"gamehub.html\">gamehub</a> to add games.";
    }
}