<?php

namespace App\Http\Controllers;

use App\Helpers\Markdown;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Cache;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController
{


    public function rssFeed(Request $request): Response
    {
        $posts = Post::query()
            ->with('user')
            ->where('is_released', true)
            ->whereNotNull('released_at')
            ->where('released_at', '<=', now())
            ->when($request->get('tag'), function (Builder $query, $tag) {
                if (is_array($tag)) {
                    $tag = $tag[0];
                }
                $tag = strtolower($tag);

                $query->whereHas('tags', function (Builder $query) use ($tag) {
                    $query->whereRaw('LOWER(tags.title) like ?', ["%$tag%"]);
                });
            })
            ->orderBy('released_at', 'DESC')
            ->paginate(30);

        $posts->each(
            fn (Post $post) => $post->description = Markdown::make(
                \Str::limit($post->description, 300),
            )
        );

        return response()->view('blog.feed', ['posts' => $posts])->header('Content-Type', 'application/xml');
    }
}
