<?php

namespace App\Http\Controllers;

use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        // Menghitung total task
        $totalTasks = Task::where('user_id', auth()->id())->count();

        // Menghitung task yang sudah selesai
        $completedTasks = Task::where('user_id', auth()->id())
            ->where('status', 'Completed')
            ->count();

        // Menghitung task yang masih pending
        $pendingTasks = Task::where('user_id', auth()->id())
            ->where('status', 'Pending')
            ->count();

        // Mengambil task dengan deadline terdekat
        $upcomingTask = Task::where('user_id', auth()->id())
            ->orderBy('deadline', 'asc')
            ->first();

        // Menghitung progress dalam persen
        $progress = 0;

        if ($totalTasks > 0) {
            $progress = round(($completedTasks / $totalTasks) * 100);
        }

        // Mengirim semua data ke dashboard.blade.php
        return view('dashboard', compact(
            'totalTasks',
            'completedTasks',
            'pendingTasks',
            'upcomingTask',
            'progress'
        ));
    }
}