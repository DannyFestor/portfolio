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
        'platform',
        'platform_version',
        'device',
        'device_kind',
        'browser',
        'browser_version',
        'is_robot',
        'address',
        'referrer',
        'method',
        'language',
        'is_livewire',
        'content_type',
        'accept',
    ];
}
