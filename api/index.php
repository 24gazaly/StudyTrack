<?php

define('LARAVEL_START', microtime(true));

// Ensure errors are tracked
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

/*
|--------------------------------------------------------------------------
| Vercel Serverless Storage Preparation
|--------------------------------------------------------------------------
| Vercel environment has a read-only filesystem except for /tmp.
| We redirect all runtime storage, cache, views, and logs to /tmp.
|
*/
$storageDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/bootstrap/cache',
    '/tmp/storage/logs',
];

foreach ($storageDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

$envVars = [
    'APP_STORAGE_PATH' => '/tmp/storage',
    'APP_SERVICES_CACHE' => '/tmp/storage/bootstrap/cache/services.php',
    'APP_PACKAGES_CACHE' => '/tmp/storage/bootstrap/cache/packages.php',
    'APP_CONFIG_CACHE' => '/tmp/storage/bootstrap/cache/config.php',
    'APP_ROUTES_CACHE' => '/tmp/storage/bootstrap/cache/routes.php',
    'APP_EVENTS_CACHE' => '/tmp/storage/bootstrap/cache/events.php',
    'VIEW_COMPILED_PATH' => '/tmp/storage/framework/views',
];

foreach ($envVars as $key => $val) {
    putenv("{$key}={$val}");
    $_ENV[$key] = $val;
    $_SERVER[$key] = $val;
}

// Default LOG_CHANNEL to stderr so Laravel errors appear in Vercel Function logs
if (!getenv('LOG_CHANNEL') && empty($_ENV['LOG_CHANNEL'])) {
    putenv('LOG_CHANNEL=stderr');
    $_ENV['LOG_CHANNEL'] = 'stderr';
    $_SERVER['LOG_CHANNEL'] = 'stderr';
}

// Require composer autoloader
require __DIR__ . '/../vendor/autoload.php';

try {
    // Bootstrap Laravel application
    /** @var \Illuminate\Foundation\Application $app */
    $app = require_once __DIR__ . '/../bootstrap/app.php';

    $app->useStoragePath('/tmp/storage');

    $app->handleRequest(\Illuminate\Http\Request::capture());
} catch (\Throwable $e) {
    // Write detailed error to stderr so it shows up in Vercel Function logs
    $logMessage = sprintf(
        "[Vercel Laravel Error] %s: %s in %s:%d\nStack trace:\n%s\n",
        get_class($e),
        $e->getMessage(),
        $e->getFile(),
        $e->getLine(),
        $e->getTraceAsString()
    );
    file_put_contents('php://stderr', $logMessage);

    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: text/html; charset=UTF-8');
    }

    $isDebug = getenv('APP_DEBUG') === 'true' || ($_ENV['APP_DEBUG'] ?? '') === 'true';

    if ($isDebug) {
        echo '<h1>500 Internal Server Error</h1>';
        echo '<p><strong>' . htmlspecialchars(get_class($e) . ': ' . $e->getMessage()) . '</strong></p>';
        echo '<p>in <code>' . htmlspecialchars($e->getFile()) . ':' . $e->getLine() . '</code></p>';
        echo '<pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
    } else {
        echo '<h1>500 Internal Server Error</h1>';
        echo '<p>An unexpected error occurred. Please check your Vercel Function Logs for details.</p>';
    }
}
