<?php

namespace App\Events\Post;

use App\Models\Post;
use Illuminate\Foundation\Events\Dispatchable;

class CreateEvent
{
    use Dispatchable;

    public function __construct(public readonly Post $post)
    {
    }
}
