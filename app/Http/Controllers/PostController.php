<?php

namespace App\Http\Controllers;

use App\Helpers\Markdown;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PostController
{
    public function index()
    {
        return view('blog.index');
    }

    public function show(Post $post)
    {
        /** @var User|null $user */
        $user = \Auth::user();
        $post->load('metatags');

        $metatags = [];
        foreach ($post->metatags as $metatag) {
            $properties = [];
            foreach ($metatag->properties as $label => $value) {
                if (empty($value)) {
                    continue;
                }

                $properties[] = "$label=\"$value\"";
            }

            $tag = '<';
            $tag .= $metatag->tag;
            $tag .= ' ';
            $tag .= implode(' ', $properties);
            $tag .= '>';
            if ($metatag->tag === 'script') {
                $tag .= '</script>';
            }
            $metatags[] = $tag;
        }

        if (
            (!$user || !$user->is_admin) &&
            (
                !$post->is_released ||
                (
                    $post->released_at &&
                    $post->released_at->gt(now())
                )
            )
        ) {
            abort(404);
        }

        $post->load(['tags']);
        $post->getFirstMedia(Post::HERO_IMAGE);

        $post->description = Markdown::make($post->description);

        return view('blog.show', [
            'post' => $post,
            'metatags' => implode("\n\t\t", $metatags),
        ]);
    }

    public function rssFeed(Request $request)
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
