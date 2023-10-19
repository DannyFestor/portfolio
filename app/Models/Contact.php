<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Contact extends Pivot
{
    protected $fillable = [
        'name',
        'email',
        'subject',
        'body',
        'seen_at',
    ];
}
