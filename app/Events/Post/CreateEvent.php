<?php

namespace App\Events\Post;

use App\Models\Metatag;
use App\Models\Post;
use Illuminate\Foundation\Events\Dispatchable;

class CreateEvent
{
    use Dispatchable;

    public function __construct(Post $post)
    {
    }
}
