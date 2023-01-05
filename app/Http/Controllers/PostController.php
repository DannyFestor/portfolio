<?php

namespace App\Http\Controllers;

use App\Models\Post;
use League\CommonMark\CommonMarkConverter;

class PostController
{
    public function index()
    {
        return view('blog.index');
    }

    public function show(Post $post)
    {
        if (!$post->is_released || $post->released_at->gt(now())) {
            abort(404);
        }

        $converter = new CommonMarkConverter();

        $post->description = $converter->convert($post->description);

        return view('blog.show', ['post' => $post]);
    }
}
