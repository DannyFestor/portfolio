<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
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

        $post->load(['tags']);
        $post->getFirstMedia(Post::HERO_IMAGE);

        return view('blog.show', ['post' => $post]);
    }

    public function rssFeed(Request $request)
    {
        $posts = Post::query()
            ->with('user')
            ->where('is_released', TRUE)
            ->whereNotNull('released_at')
            ->where('released_at', '<=', now())
            ->when($request->get('tag'), function (Builder $query, $tag) {
                if(is_array($tag)) {
                    $tag = $tag[0];
                }
                $tag = strtolower($tag);

                $query->whereHas('tags', function (Builder $query) use ($tag) {
                    $query->whereRaw('LOWER(tags.title) like ?', ["%$tag%"]);
                });
            })
            ->orderBy('released_at', 'DESC')
            ->paginate(30);

        $posts->each(fn (Post $post) => $post->description = app(\Spatie\LaravelMarkdown\MarkdownRenderer::class)->toHtml(\Str::limit($post->description), 300));

        return response()->view('blog.feed', ['posts' => $posts])->header('Content-Type', 'application/xml');
    }
}
