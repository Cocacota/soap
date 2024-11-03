<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */public function boot()
{
    Inertia::share([
        'app' => function () {
            return [
                'name' => config('app.name'),
            ];
        },
    ]);
}
    
}
