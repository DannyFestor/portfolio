<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use League\CommonMark\CommonMarkConverter;
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use League\CommonMark\Extension\TableOfContents\TableOfContentsExtension;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Util\HtmlFilter;

class PostController
{
    public function index()
    {
        return view('blog.index');
    }

    public function show(Post $post)
    {
        $user = \Auth::user();

        if ((!$user || !$user->is_admin) && (!$post->is_released || ($post->released_at && $post->released_at->gt(
                        now()
                    )))) {
            abort(404);
        }

        $post->load(['tags']);
        $post->getFirstMedia(Post::HERO_IMAGE);

        $config = [
            'html_input' => 'allow',
//            'html_input' => 'escape',
            'table_of_contents' => [
                'html_class' => 'table-of-contents',
                'position' => 'top',
                'style' => 'bullet',
                'min_heading_level' => 1,
                'max_heading_level' => 6,
                'normalize' => 'relative',
                'placeholder' => null,
            ],
            'heading_permalink' => [
                'html_class' => 'heading-permalink',
                'id_prefix' => 'content',
                'fragment_prefix' => 'content',
                'insert' => 'before',
                'min_heading_level' => 1,
                'max_heading_level' => 6,
                'title' => 'Permalink',
                'symbol' => '#',
                'aria_hidden' => true,
            ],
        ];
//
//// Configure the Environment with all the CommonMark parsers/renderers
        $environment = new Environment($config);
        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new \League\CommonMark\Extension\Table\TableExtension());
        $environment->addExtension(new \League\CommonMark\Extension\Strikethrough\StrikethroughExtension());
        $environment->addExtension(new \League\CommonMark\Extension\Footnote\FootnoteExtension());
        $environment->addExtension(new \League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension());
        $environment->addExtension(new \League\CommonMark\Extension\TableOfContents\TableOfContentsExtension());

// Instantiate the converter engine and start converting some Markdown!
        $converter = new MarkdownConverter($environment);
//        dd($post->description);

        $post->description = $converter->convert($post->description)->getContent();
//        dd($post->description);

        return view('blog.show', ['post' => $post]);
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
            fn(Post $post) => $post->description = app(\Spatie\LaravelMarkdown\MarkdownRenderer::class)->toHtml(
                \Str::limit($post->description),
                300
            )
        );

        return response()->view('blog.feed', ['posts' => $posts])->header('Content-Type', 'application/xml');
    }
}
