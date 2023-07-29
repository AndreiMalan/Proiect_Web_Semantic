<?php

use EasyRdf\Sparql\Client;

require 'vendor/autoload.php';

$rdf_query = $_POST["data"];
$client = new EasyRdf\Sparql\Client("http://localhost:8080/rdf4j-server/repositories/grafexamen/statements");
$client->update($rdf_query);

$client_nou = new EasyRdf\Sparql\Client("http://localhost:8080/rdf4j-server/repositories/grafexamen");
$select = "PREFIX : <http://malanuifalean.ro#> PREFIX rdfs: <https://www.w3.org/2000/01/rdf-schema#>
SELECT ?vp ?an
WHERE {
    ?x rdfs:label ?vp .
    ?x :alesIn ?an .
}";
$rezultate = $client_nou->query($select);
$rdfData = "<table style='border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;'>";
$rdfData .= "<tr style='background-color: turquoise; color: black;'><th style='padding: 8px; border: 2px solid black;'>Name</th><th style='padding: 8px; border: 2px solid black;'>Year</th></tr>";

foreach ($rezultate as $rezultat) {
    $vp = $rezultat->vp;
    $an = $rezultat->an;
    $rdfData .= "<tr style='border: 2px solid black;'><td style='padding: 8px;'>$vp</td><td style='padding: 8px;'>$an</td></tr>";
}
$rdfData .= "</table>";

print($rdfData);


$rdfData2 = array();

$context = array(
    "rdfs" => "https://www.w3.org/2000/01/rdf-schema#",
    "malanuifalean" => "http://malanuifalean.ro#"
);

$rdfData2 = array(
    "@context" => $context,
    "@graph" => array()
);

foreach ($rezultate as $rezultat) {
    $vp = $rezultat->vp->getValue();
    $an = $rezultat->an->getValue();

    $jsonLD = array(

        "malanuifalean:vp" => $vp,
        "malanuifalean:an" => $an
    );

    $rdfData2["@graph"][] = $jsonLD;
}

echo json_encode($rdfData2);
?>


