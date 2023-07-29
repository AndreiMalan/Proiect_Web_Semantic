<?php
require_once 'vendor/autoload.php';

$query = $_POST['query'];

$graph = new EasyRdf_Graph();
$result = $graph->sparql($query);

$response = array('boolean' => $result->boolean());

echo json_encode($response);
?>
