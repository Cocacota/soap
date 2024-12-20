<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OpenDotaController extends Controller
{
    // Método para obtener datos de un jugador
    public function getPlayerData($player_id)
    {
        // URL base de la API de OpenDota
        $url = "https://api.opendota.com/api/players/{$player_id}";

        // Hacer la solicitud a la API de OpenDota
        $response = Http::get($url);

        // Comprobar si la solicitud fue exitosa
        if ($response->successful()) {
            // Devolver los datos en formato JSON
            $json= response()->json($response->json());
        } else {
            // Si falla, devolver un error
            $json= response()->json(['error' => 'No se pudo obtener la información del jugador'], 500);
        }
        return Inertia::render('players/show', [
            'player' => $json,
        ]);
    }
    public function getPlayerHeroes($player_id)
{
    $url = "https://api.opendota.com/api/players/{$player_id}/heroes";
    $response = Http::get($url);

    if ($response->successful()) {
        $json= response()->json($response->json());
    } else {
        $json =response()->json(['error' => 'No se pudo obtener los héroes del jugador'], 500);
    }
    return Inertia::render('heroes/index', [
        'players' => $json,
    ]);
}

public function getPlayerMatches($player_id)
{
    $url = "https://api.opendota.com/api/players/{$player_id}/matches";
    $response = Http::get($url);

    if ($response->successful()) {
        $json= response()->json($response->json());

    } else {
        $json =response()->json(['error' => 'No se pudo obtener el historial de partidas'], 500);
    }
    return Inertia::render('players/matchs', [
        'matchs' => $json,
    ]);
}
public function getHeroes()
{
    $url = "https://api.opendota.com/api/heroStats";
    $response = Http::get($url);

    if ($response->successful()) {
        // Asignamos directamente los datos JSON de la respuesta
        $heroes = $response->json();
    } else {
        $heroes = []; // Devolvemos un arreglo vacío en caso de error
    }

    // Enviamos el arreglo de heroes a la vista de Inertia
    return Inertia::render('heroes/heroes', [
        'heroes' => $heroes,
    ]);
}

public function getHeroesMatches($heroe_id)
{
    $url = "https://api.opendota.com/api/heroes/{$heroe_id}/matches";
    $response = Http::get($url);

    if ($response->successful()) {
        $json= response()->json($response->json());
        $json=array_slice($json,0,50);
    } else {
        $json =response()->json(['error' => 'No se pudo obtener el historial de partidas'], 500);
    }
    return Inertia::render('heroes/heroes', [
        'players' => $json,
    ]);
}


public function getProPlayers()
{
    $url = "https://api.opendota.com/api/proPlayers";
    $response = Http::get($url);
    
    if ($response->successful()) {
        $json =response()->json($response->json());
    } else {
        $json =response()->json(['error' => 'No se pudo obtener el historial de partidas'], 500);
    }
    return Inertia::render('players/proPlayer', [
        'players' => $json,
    ]);
}

}
