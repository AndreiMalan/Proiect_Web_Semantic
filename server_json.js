function trimiteCerere(){
    vicepresident=document.getElementById("vicepresident").value
    year=document.getElementById("year").value
    output=document.getElementById("scrapping")
    var i,j;
    for(i=0;i<output.rows.length;i++){
        var webData={};
        for(j=0;j<output.rows[i].cells.length;j++){
            if(j==0){
                webData["name"]=output.rows[i].cells[j].textContent.trim()
            }
            else {
                webData["year"]=output.rows[i].cells[j].textContent.trim()
            }
        }
        if(Object.keys(webData).length!==0){
            dateSerializate = JSON.stringify(webData)
            configurari = {
                url: "http://127.0.0.1/Proiect_WEB_SEMANTIC/server_json.php",
                type: "POST",
                data: dateSerializate,
                contentType: "application/json",
                success: procesareRaspuns
            }
            $.ajax(configurari)
        }
    }
    date = { "name": vicepresident, "year": year }
    dateSerializate = JSON.stringify(date)
    configurari = {
        url: "http://127.0.0.1/Proiect_WEB_SEMANTIC/server_json.php",
        type: "POST",
        data: dateSerializate,
        contentType: "application/json",
        success: procesareRaspuns
    }
    $.ajax(configurari)

}
function procesareRaspuns(){
    let url="http://localhost:4000/vicepresidents";
    let content= [];

    $.getJSON(url, function (data) {
        content.push("<table id=\"after_json\" style='border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>");
        content.push("<tr style='background-color: turquoise; color: black;'><th style='padding: 8px; border: 2px solid black;'>Name</th><th style='padding: 8px; border: 2px solid black;'>Year</th></tr>");
        $.each(data, function (index, election) {
            content.push("<tr style='border: 2px solid black;'><td style='padding: 8px;'>" + election.name + "</td><td style='padding: 8px;'>" + election.year + "</td></tr>");
        });
        content.push("</table>");

        let display = content.join("");
        document.getElementById("json").innerHTML = display;
    });
}
