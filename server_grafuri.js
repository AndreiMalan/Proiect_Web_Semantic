function inserareRDF() {
  var rdf_table = [];
  var rows = document.querySelectorAll("#after_json tr");
  for (let i = 1; i < rows.length; i++) {
    var rdf_row = [];
    var cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      rdf_row.push(cells[j].textContent);
    }
    rdf_table.push(rdf_row);
  }

  console.log("test");
  var rdfData =
    "PREFIX : <http://malanuifalean.ro#> PREFIX rdfs: <https://www.w3.org/2000/01/rdf-schema#>";

  for (var a = 0; a < rdf_table.length; a++) {
    var graph_row = rdf_table[a];
    var subiect = ":" + graph_row[0];
    var predicat = ":alesIn";
    var obiect = graph_row[1];

    var query =
      "ASK { GRAPH :grafexamen { " +subiect + " " + predicat + " " +  obiect + " } }";
    console.log("datele exista deja");

    $.ajax({
      type: "POST",
      url: "http://127.0.0.1/Proiect_WEB_SEMANTIC/queryRDF.php",
      async: false,
      data: { query: query },
      success: function (data) {
        if (!data.boolean) {
          rdfData +=
            "INSERT DATA { GRAPH :grafexamen { " + subiect + " " +  predicat +  " " +  obiect + "; rdfs:label '" +  graph_row[0] +  "'" + " } };";
        }
      },
    });
  }

  var backend = "http://127.0.0.1/Proiect_WEB_SEMANTIC/insertRDF.php";
  $.post(backend, { data: rdfData }, function (afis) {
    document.getElementById("rdf").innerHTML = afis;
  });

  $.post(backend, { data: rdfData2 }, function (afis) {
    var jsonLD = JSON.parse(rdfData2);
    for (var i = 0; i < jsonLD.length; i++) {
      var vp = jsonLD[i][":vp"];
      var an = jsonLD[i][":an"];
      var html = vp + an;
    }
    document.getElementById("rdf2").innerHTML = html;
  });
}
