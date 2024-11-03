<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

/**
 * Class Kernel.
 */
class Kernel extends HttpKernel{
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\HandleInertiaRequests::class,
        // Otros middlewares
    ],
];
}