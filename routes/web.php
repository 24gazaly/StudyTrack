<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/migrate', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return response('<pre style="background:#222;color:#a6e22e;padding:20px;font-family:monospace;">' . 
            htmlspecialchars(\Illuminate\Support\Facades\Artisan::output()) . 
            "\n[SUCCESS] Migrations completed successfully!</pre>");
    } catch (\Throwable $e) {
        return response('<pre style="background:#222;color:#f92672;padding:20px;font-family:monospace;">[ERROR] ' . 
            htmlspecialchars($e->getMessage()) . "\n" . 
            htmlspecialchars($e->getTraceAsString()) . '</pre>', 500);
    }
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route untuk Task (harus login terlebih dahulu)
Route::resource('tasks', TaskController::class)
    ->middleware(['auth', 'verified']);

// Route untuk Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// Route untuk dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');


    
require __DIR__.'/auth.php';