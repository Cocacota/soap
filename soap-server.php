<?php
class Dota2Service {
    private $pdo;
    

    public function __construct() {
        // Configuración de la conexión a la base de datos
        $host = 'localhost';
        $dbname = 'dota2';
        $username = 'root';
        $password = ''; 
        
        // Crear la conexión PDO
        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error al conectar a la base de datos: " . $e->getMessage());
        }
    }

    // Método para obtener el historial de partidas de un jugador
    public function getMatchHistory($playerID) {
        // Preparar y ejecutar la consulta SQL
        $stmt = $this->pdo->prepare("
        SELECT m.match_id, m.match_date, h.hero, h.result
        FROM match_history h
        JOIN matches m ON h.match_id = m.match_id
        WHERE h.user_id = :userID");

        $stmt->execute(['userID' => $playerID]);
        $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if (empty($matches)) {
            // Manejo de error si no se encuentran partidas
            throw new SoapFault("Client", "User has no match history");
        }

        // Formatear la respuesta en XML
        $response = new SimpleXMLElement('<matches/>');
        foreach ($matches as $match) {
            $matchElement = $response->addChild('match');
            $matchElement->addChild('matchId', $match['match_id']);
            $matchElement->addChild('date', $match['match_date']);
            $matchElement->addChild('heroe', $match['hero']);
            $matchElement->addChild('result', $match['result']);
        }

        return $response->asXML();
    }

    //metodo para obtener los partidos jugados con determinado heroe
    public function getMatchsWithHero($heroe){
    $stmt = $this->pdo->prepare("
        SELECT m.match_id, m.match_date, h.hero, h.result, h.user_id
        FROM match_history h
        JOIN matches m ON h.match_id = m.match_id
        WHERE h.hero = :heroes");

        $stmt->execute(['heroes' => $heroe]);
        $heros = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($heros)) {
            // Manejo de error si no se encuentran partidas
            throw new SoapFault("Client", "User has no match history");
        }

        // Formatear la respuesta en XML
        $response = new SimpleXMLElement('<heros/>');
        foreach ($heros as $hero) {
            $heroElement = $response->addChild('hero');
            $heroElement->addChild('matchId', $match['match_id']);
            $heroElement->addChild('player_id', $match['player_id']);
            $heroElement->addChild('heroe', $match['hero']);
            $heroElement->addChild('result', $match['result']);
        }

        return $response->asXML();
    }

    //metodo para obtener los jugadores de una partida
    public function getPlayersMatch($matchID){
        $stmt = $this->pdo->prepare("SELECT  player_id,hero FROM match_history WHERE match_id = :matchID ");
        $stmt->execute(['matchID' => $matchID]);

        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if (empty($players)) {
            // Manejo de error si no se encuentran partidas
            throw new SoapFault("Client", "User has no match history");
        }

        // Formatear la respuesta en XML
        $response = new SimpleXMLElement('<players/>');
        foreach ($players as $player) {
            $playerElement = $response->addChild('player');
            $playerElement->addChild('playerId', $player['Player_id']);
            $playerElement->addChild('heroe', $player['hero']);
        }

        return $response->asXML();
    }
   
    //metodo para obtener el id del usarios mediante el username
    public function getUserId($name){
        //consulta a la base de datos
        $stmt = $this->pdo->prepare("SELECT  user_id FROM users WHERE username = :name ");
        $stmt->execute(['name' => $name]);

        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if (empty($players)) {
            // Manejo de error si no se encuentran partidas
            throw new SoapFault("Client", "User has no match history");
        }

        // Formatear la respuesta en XML
        $response = new SimpleXMLElement('<players/>');
        foreach ($players as $player) {
            $playerElement = $response->addChild('player');
            $playerElement->addChild('playerId', $player['user_id']);
        }

        return $response->asXML();
    }
}

// Configuración del servidor SOAP
$options = ['uri' => 'http://localhost/soap/soap-server'];
$server = new SoapServer(null, $options);
$server->setClass('Dota2Service');
$server->handle();
