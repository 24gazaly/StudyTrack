<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'subject',
        'description',
        'deadline',
        'status',
        'user_id',
    ];
}