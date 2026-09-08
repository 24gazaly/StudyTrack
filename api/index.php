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

if (empty(getenv('APP_DEBUG')) && empty($_ENV['APP_DEBUG']) && empty($_SERVER['APP_DEBUG'])) {
    $envVars['APP_DEBUG'] = 'false';
}
$envVars['APP_MAINTENANCE_DRIVER'] = 'file';

// Fallback environment configurations for serverless environment
if (empty(getenv('APP_KEY')) && empty($_ENV['APP_KEY']) && empty($_SERVER['APP_KEY'])) {
    $envVars['APP_KEY'] = 'base64:8Cmd4E2JkjqA/GkDhtgSQMI5pRqsJ7KWUrhEF0PvX7U=';
}

if (empty(getenv('SESSION_DRIVER')) && empty($_ENV['SESSION_DRIVER']) && empty($_SERVER['SESSION_DRIVER'])) {
    $envVars['SESSION_DRIVER'] = 'cookie';
}

if (empty(getenv('CACHE_STORE')) && empty($_ENV['CACHE_STORE']) && empty($_SERVER['CACHE_STORE'])) {
    $envVars['CACHE_STORE'] = 'array';
}

// Default LOG_CHANNEL to stderr so Laravel errors appear in Vercel Function logs
if (empty(getenv('LOG_CHANNEL')) && empty($_ENV['LOG_CHANNEL']) && empty($_SERVER['LOG_CHANNEL'])) {
    $envVars['LOG_CHANNEL'] = 'stderr';
}

// If DB_CONNECTION is sqlite (default) and no DB file configured, avoid read-only filesystem crash
if ((getenv('DB_CONNECTION') ?: ($_ENV['DB_CONNECTION'] ?? 'sqlite')) === 'sqlite') {
    $sqlitePath = '/tmp/storage/database.sqlite';
    if (!file_exists($sqlitePath)) {
        @touch($sqlitePath);
    }
    if (empty(getenv('DB_DATABASE')) && empty($_ENV['DB_DATABASE'])) {
        $envVars['DB_DATABASE'] = $sqlitePath;
    }
}

foreach ($envVars as $key => $val) {
    putenv("{$key}={$val}");
    $_ENV[$key] = $val;
    $_SERVER[$key] = $val;
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

    echo '<h1>500 Internal Server Error</h1>';
    echo '<p style="color:#d9534f; font-size:1.1rem;"><strong>' . htmlspecialchars(get_class($e) . ': ' . $e->getMessage()) . '</strong></p>';
    echo '<p>File: <code>' . htmlspecialchars($e->getFile()) . ':' . $e->getLine() . '</code></p>';
    echo '<pre style="background:#f8f9fa; padding:12px; border:1px solid #ddd; border-radius:4px; overflow-x:auto;">' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
}
