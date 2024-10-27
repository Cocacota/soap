<?php
class Dota2Service {
    private $pdo;

    public function __construct() {
        // Configuración de la conexión a la base de datos
        $host = 'localhost';
        $dbname = 'dota2';
        $username = 'root'; // Cambia por el nombre de usuario de tu base de datos
        $password = ''; // Cambia por la contraseña de tu base de datos
        
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

        // Obtener resultados y devolver como array
        $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);
       
        return $matches;
    }

    //metodo para obtener los partidos jugados con determinado heroe
    public function getMatchsWithHero($heroe){
        $stmt = $this->pdo->prepare("SELECT player_id,match_id, hero, result FROM match_history WHERE hero=heroe");
        $stmt->execute(['heroe' => $heroe]);

        $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $matches;
    }

    //metodo para obtener el porsentaje de vitoria
    public function getVictoriPorsentPlayer($playerID){
        $stmt = $this->pdo->prepare("SELECT  result FROM match_history WHERE user_id = :playerID ");
        $stmt->execute(['playerID' => $playerID]);

        $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $victoris=0;
        foreach($matches as $mache){
            if($mache["result"]=="won"){
                $victoris++;
            }
        }
        $porsentaje=($victoris/ count($matches))*100;
        return $porsentaje;
    }
    //metodo para obtener los jugadores de una partida
    public function getPlayersMatch($matchID){
        $stmt = $this->pdo->prepare("SELECT  player_id,hero FROM match_history WHERE match_id = :matchID ");
        $stmt->execute(['matchID' => $matchID]);

        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $players;
    }
    //metodo para obtener el porsentaje de vitorias de un heroe
    public function  getVictoriPorsentHero($heroe){
        $stmt = $this->pdo->prepare("SELECT  result FROM match_history WHERE hero = :heroe ");
        $stmt->execute(['heroe' => $heroe]);
            //consulta a la base de datos
        $matches = $stmt->fetchAll(PDO::FETCH_ASSOC);

            //se calcula el posentaje
        $victoris=0;
        foreach($matches as $mache){
            if($mache["result"]=="won"){
                $victoris++;
            }
        }
        $porsentaje=($victoris/ count($matches))*100;
        return $porsentaje;
    }

    //metodo para obtener el id del usarios mediante el username
    public function getUserId($name){
        //consulta a la base de datos
        $stmt = $this->pdo->prepare("SELECT  user_id FROM users WHERE username = :name ");
        $stmt->execute(['name' => $name]);

        $players = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $players;
    }
}

// Configuración del servidor SOAP
$options = ['uri' => 'http://localhost/soap/soap-server.php'];
$server = new SoapServer(null, $options);
$server->setClass('Dota2Service');
$server->handle();
