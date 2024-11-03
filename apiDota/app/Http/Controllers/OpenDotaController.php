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
            return response()->json($response->json());
        } else {
            // Si falla, devolver un error
            return response()->json(['error' => 'No se pudo obtener la información del jugador'], 500);
        }
    }
    public function getPlayerHeroes($player_id)
{
    $url = "https://api.opendota.com/api/players/{$player_id}/heroes";
    $response = Http::get($url);

    if ($response->successful()) {
        return response()->json($response->json());
    } else {
        return response()->json(['error' => 'No se pudo obtener los héroes del jugador'], 500);
    }
}
public function getPlayerWinLose($player_id)
{
    $url = "https://api.opendota.com/api/players/{$player_id}/wl";
    $response = Http::get($url);

    if ($response->successful()) {
        return response()->json($response->json());
    } else {
        return response()->json(['error' => 'No se pudo obtener los héroes del jugador'], 500);
    }
}
public function getPlayerMatches($player_id)
{
    $url = "https://api.opendota.com/api/players/{$player_id}/matches";
    $response = Http::get($url);

    if ($response->successful()) {
        return response()->json($response->json());
    } else {
        return response()->json(['error' => 'No se pudo obtener el historial de partidas'], 500);
    }
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
    return Inertia::render('heroes/index', [
        'heroes' => $heroes,
    ]);
}

public function getHeroesMatches($heroe_id)
{
    $url = "https://api.opendota.com/api/heroes/{$heroe_id}/matches";
    $response = Http::get($url);

    if ($response->successful()) {
        return response()->json($response->json());
    } else {
        return response()->json(['error' => 'No se pudo obtener el historial de partidas'], 500);
    }
}

}
