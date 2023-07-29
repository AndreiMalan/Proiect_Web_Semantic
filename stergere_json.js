function stergereJSON() {
    var name = document.getElementById("stergereCamp").value;
    configurari = {
        url: `http://127.0.0.1/Proiect_WEB_SEMANTIC/server_json.php?name=${name}`,
        type: "GET",
        contentType: "application/json",
        success: (response) => {
            let data=JSON.parse(response)
            for (let i=0;i< data.length; i++) {
                date = {"name": name}
                dateSerializate = JSON.stringify(date)
                configurari = {
                    url:`http://127.0.0.1/Proiect_WEB_SEMANTIC/server_json.php?id=${data[i].id}`,
                    type: "DELETE",
                    data: dateSerializate,
                    contentType: "application/json",
                    success: fetchRecords
                }
                $.ajax(configurari)
            }
        }
    }
    $.ajax(configurari)
}
function fetchRecords() {
    let url = "http://localhost:4000/vicepresidents";
    let content = [];
    $.getJSON(url, function (data) {
        content.push("<table id=\"after_delete_json\" style='border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>");
        content.push("<tr style='background-color: turquoise; color: black;'><th style='padding: 8px; border: 2px solid black;'>Name</th><th style='padding: 8px; border: 2px solid black;'>Year</th></tr>");
        $.each(data, function (index, election) {
            content.push("<tr style='border: 2px solid black;'><td style='padding: 8px;'>" + election.name + "</td><td style='padding: 8px;'>" + election.year + "</td></tr>");
        });
        content.push("</table>");
        let display = content.join("");
        document.getElementById("stergere").innerHTML = display;
    });
}
