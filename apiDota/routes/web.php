<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenDotaController;
use App\Http\Controllers\SoapClientController;



Route::get('/player/{player_id}', [OpenDotaController::class, 'getPlayerData']);
Route::get('/player/{player_id}/wl', [OpenDotaController::class, 'getPlayerWinLose']);
Route::get('/player/{player_id}/heroes', [OpenDotaController::class, 'getPlayerHeroes']);
Route::get('/player/{player_id}/matches', [OpenDotaController::class, 'getPlayerMatches']);
Route::get('/heroes', [OpenDotaController::class, 'getHeroes'])->name('heroes.index');
Route::get('/heroes/{id}', [OpenDotaController::class, 'showhero'])->name('heroes.show');


Route::get('/matchs/{id}/match-history', [SoapClientController::class, 'getMatchHistory']);
Route::get('/matchs/{id}/history', [SoapClientController::class, 'showHistory'])->name('matchs.historyMatch');
Route::get('/matchs/{hero}/match-hero', [SoapClientController::class, 'getMatchHero']);
Route::get('/matchs/{hero}/hero', [SoapClientController::class, 'showHero'])->name('matchs.heroMatchs');




Route::get('/', function () {
    return view('welcome')->name('dashboard');
});
