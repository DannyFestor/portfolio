<?php

namespace App\Http\Controllers;

use App\Helpers\Markdown;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController
{
    public function index(): View
    {
        $tags = Tag::withCount('posts')
            ->having('posts_count', '>', 0)
            ->orderBy('title')
            ->get();

        $posts = Post::query()
            ->select(['id', 'slug', 'title', 'user_id', 'released_at', 'synopsis', 'description'])
            ->with([
                'user',
                'tags',
                'media' => function (MorphMany $query) {
                    $query->where('collection_name', '=', Post::HERO_IMAGE);
                },
            ])
            ->whereNotNull('released_at')
            ->where('released_at', '<', now())
            ->where('is_released', '=', true)
//            ->when($this->search, function (Builder $query, string $value) {
//                $query->where('title', 'like', "%$value%");
//            })
//            ->when($this->selectedTags, function (Builder $query, array $value) {
//                foreach ($value as $tag) {
//                    $query->whereHas('tags', function (Builder $query) use ($tag) {
//                        $query->where('tags.title', 'like', "%$tag%");
//                    });
//                }
//            })
            ->orderBy('released_at', 'DESC')
            ->paginate(perPage: 15);

        return view('blog.index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post): View
    {
        /** @var User|null $user */
        $user = \Auth::user();

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

        $post->load(['tags', 'metatags']);
        $post->getFirstMedia(Post::HERO_IMAGE);

        $metatags = $this->buildMetags($post);

        $post->description = Markdown::make($post->description);

        return view('blog.show', [
            'post' => $post,
            'metatags' => implode("\n\t\t", $metatags),
        ]);
    }

    /**
     * @return array<string>
     */
    private function buildMetags(Post $post): array
    {
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

        return $metatags;
    }

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
