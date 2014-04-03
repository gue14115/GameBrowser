function getTradeHubGames(){
    $.ajax({
        type: "POST",
        url: serverurl,
        //Allows for cookies to be used
        xhrFields: {
            withCredentials: true
        },
        //To a different domain
        crossDomain: true,
        data: {action:"getTradeHubGames"},
        success: responseGetTradeHubGames,
        error: servererror
    });
}

function responseGetTradeHubGames(data){
    if(data=="error"){
    }
    else{
        var table = document.getElementById("user-table");
        for(var x=0;x<data.length;x++){
            console.log(data[x]);
            var tr = document.createElement('tr');

            var td=document.createElement('td');
            td.className = "row text-center";
            td.innerHTML= data[x]["gg"];

            var td2=document.createElement('td');
            td2.className = "row text-center";
            var button = document.createElement('button');
            button.className = "btn btn-sm";
            button.innerHTML = "SWAP";

            var td3=document.createElement('td');
            td3.className = "row text-center";
            td3.innerHTML= data[x]["dg"];

            td2.appendChild(button);
            tr.innerHTML=td.outerHTML+td2.outerHTML+td3.outerHTML;
            console.log(table);
            table.innerHTML+=tr.outerHTML;
            //table.appendChild(tr);
        }
    }
}