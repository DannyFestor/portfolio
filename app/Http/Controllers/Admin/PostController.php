<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    public function __invoke(Post $post)
    {
        return view('admin.post.edit', ['post' => $post]);
    }
}
