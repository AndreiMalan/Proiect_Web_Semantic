<?php
$url = "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

$html = file_get_contents($url);
$doc = new DOMDocument();
@$doc->loadHTML($html);
$xpath = new DOMXPath($doc);

$table = $xpath->query('//table')[0];
$rows = $xpath->query('.//tr', $table);


$data = array();
$count = 0;
$lines = array(29, 31, 41);
foreach ($lines as $line) {
    for ($j = $rows->length - 1; $j >= 0; $j--) {
        if ($j == $line) {
            $row = $rows->item($j);
            $cols = $xpath->query('./td', $row);
            $name = preg_replace('/\(.*?\)/', '', trim($cols->item(6)->nodeValue));
            $name = str_replace(' ', '', $name); 
            $electionDate = trim($cols->item(5)->nodeValue);
            $data[] = array("name" => $name, "electionDate" => $electionDate);
            $count++;
            break;
        }
    }
}


$output = "<table id='scrapping' style='border: 2px solid black;'>";
$output .= "<tr style='background-color: turquoise;'>";
$output .= "</tr>";
foreach ($data as $vicepresident) {
    $output .= "<tr>";
    foreach ($vicepresident as $key => $value) {
        $output .= "<td style='padding: 5px; ";
        if ($key == "name") {
            $output .= "border-right: 1px solid black; ";
        }
        $output .= "'>{$value}</td>";
    }
    $output .= "</tr>";
}
$output .= "</table>";

echo $output;





$url = "https://www.imdb.com/title/tt1375666/";

$options = array(
    CURLOPT_RETURNTRANSFER => true,    
);

$curl = curl_init($url);
curl_setopt_array($curl, $options);

$response = curl_exec($curl);

curl_close($curl);

$start = strpos($response, '<script type="application/ld+json">') + strlen('<script type="application/ld+json">');
$end = strpos($response, '</script>', $start);
$json = substr($response, $start, $end - $start);
$data = json_decode($json, true);


echo "<br>";
$output_jsonld = "<table style='border-collapse: collapse;'>";
$output_jsonld .= "<tr style='background-color: turquoise; color: black;'>";
$output_jsonld .= "<td style='border: 1px solid black; padding: 5px;'>Titlu</td>";
$output_jsonld .= "<td style='border: 1px solid black; padding: 5px;'>An</td>";
$output_jsonld .= "<td style='border: 1px solid black; padding: 5px;'>Rating</td>";
$output_jsonld .= "</tr>";
$output_jsonld .= "<tr style='background-color: black; color: turquoise;'>";
$output_jsonld .= "<td style='border: 1px solid black; padding: 5px;'>" . $data['name'] . "</td>";
$output_jsonld .= "<td style='border: 1px solid black; padding: 5px;'>" . $data['datePublished'] . "</td>";
$output_jsonld .= "<td style='border: 1px solid black; padding: 5px;'>" . $data['aggregateRating']['ratingValue'] . " / " . $data['aggregateRating']['bestRating'] . "</td>";
$output_jsonld .= "</tr>";
$output_jsonld .= "</table>";

echo $output_jsonld;


?>
