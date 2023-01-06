<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'title',
        'text_color',
        'background_color',
        'border_color',
        'logo',
    ];
}
