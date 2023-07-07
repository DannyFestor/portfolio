<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip',
        'origin',
        'address',
        'referrer',
        'method',
        'language',
        'is_livewire',
        'content_type',
        'accept',
    ];
}
