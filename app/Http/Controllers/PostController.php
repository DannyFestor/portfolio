<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use League\CommonMark\CommonMarkConverter;

class PostController
{
    public function index()
    {
        return view('blog.index');
    }

    public function show(Post $post)
    {
        $user = \Auth::user();

        if ((!$user || !$user->is_admin) && (!$post->is_released || ($post->released_at && $post->released_at->gt(now())))) {
            abort(404);
        }

        $post->load('tags');

        return view('blog.show', ['post' => $post]);
    }
}
