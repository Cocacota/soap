<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpenDotaController;
use App\Http\Controllers\SoapClientController;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DonationController;

Route::get('/donate', [DonationController::class, 'showForm'])->name('donate.form');
Route::post('/donate', [DonationController::class, 'createDonationPreference'])->name('donate');
Route::get('/donation/success', [DonationController::class, 'success'])->name('mercadopago.success');
Route::get('/donation/failure', [DonationController::class, 'failure'])->name('mercadopago.failure');


Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/player/{player_id}', [OpenDotaController::class, 'getPlayerData'])->name('players.show');
Route::get('/player/{player_id}/matches', [OpenDotaController::class, 'getPlayerMatches'])->name('players.matchs');
Route::get('/proPlayer', [OpenDotaController::class, 'getProPlayers'])->name('players.proPlayer');
Route::get('/heroes', [OpenDotaController::class, 'getHeroes'])->name('heroes.heroes');
Route::get('/heroes/{id}', [OpenDotaController::class, 'showhero'])->name('heroes.show');


Route::get('/matchs/{id}/match-history', [SoapClientController::class, 'getMatchHistory']);
Route::get('/matchs/{id}/history', [SoapClientController::class, 'showHistory'])->name('matchs.historyMatch');
Route::get('/matchs/{hero}/match-hero', [SoapClientController::class, 'getMatchHero']);
Route::get('/matchs/{hero}/hero', [SoapClientController::class, 'showHero'])->name('matchs.heroMatchs');


Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');

});

require __DIR__.'/auth.php';




