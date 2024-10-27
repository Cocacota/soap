<?php
$options = [
    'location' => 'http://localhost/soap/soap-server.php',
    'uri' => 'http://localhost/soap/soap-server.php',
];

$client = new SoapClient(null, $options);

try {
    // Solicitar historial de partidas del jugador con ID 12345
    $playerID = 1;
    $result = $client->getMatchHistory($playerID);

    // Mostrar resultados
    echo "Historial de partidas del jugador $playerID:\n";
    foreach ($result as $match) {
        echo "Match ID: " . $match['match_id'] . " | Héroe: " . $match['hero'] . " | Resultado: " . $match['result'] . "\n";
    }
} catch (SoapFault $e) {
    echo "Error: " . $e->getMessage();
}
