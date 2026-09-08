<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $e, \Illuminate\Http\Request $request) {
            return response(
                "<h1>Exception Caught</h1>" .
                "<p style='color:#d9534f;font-size:18px;'><strong>" . htmlspecialchars(get_class($e) . ': ' . $e->getMessage()) . "</strong></p>" .
                "<p><strong>Location:</strong> " . htmlspecialchars($e->getFile()) . ":" . $e->getLine() . "</p>" .
                "<pre style='background:#eee;padding:15px;overflow-x:auto;'>" . htmlspecialchars($e->getTraceAsString()) . "</pre>",
                500
            );
        });
    })->create();
