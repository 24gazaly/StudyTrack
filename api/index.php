<?php

define('LARAVEL_START', microtime(true));

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

putenv('APP_STORAGE_PATH=/tmp/storage');
putenv('APP_SERVICES_CACHE=/tmp/storage/bootstrap/cache/services.php');
putenv('APP_PACKAGES_CACHE=/tmp/storage/bootstrap/cache/packages.php');
putenv('APP_CONFIG_CACHE=/tmp/storage/bootstrap/cache/config.php');
putenv('APP_ROUTES_CACHE=/tmp/storage/bootstrap/cache/routes.php');
putenv('APP_EVENTS_CACHE=/tmp/storage/bootstrap/cache/events.php');
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');

// Require composer autoloader
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel application
/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__ . '/../bootstrap/app.php';

$app->useStoragePath('/tmp/storage');

$app->handleRequest(\Illuminate\Http\Request::capture());
