<?php

namespace App\Listeners\Post;

use App\Events\Post\CreatedEvent;
use App\Models\Metatag;
use App\Models\Post;

class CreatedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CreatedEvent $event): void
    {
        $post = $event->post;
        $tags = $event->post->tags->pluck('title')->join(',');

        $metatags = [
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'link',
                'properties' => json_encode([
                    'href' => config('app.url'),
                    'rel' => 'home',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'link',
                'properties' => json_encode([
                    'href' => route('blog.show', $post),
                    'rel' => 'canonical',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'link',
                'properties' => json_encode([
                    'href' => route('blog.feed'),
                    'title' => $post->title,
                    'rel' => 'alternate',
                    'type' => 'application/rss+xml',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'link',
                'properties' => json_encode([
                    'href' => route('blog.feed'),
                    'title' => $post->title,
                    'rel' => 'alternate',
                    'type' => 'application/atom+xml',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'keywords',
                    'content' => $tags,
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'description',
                    'content' => implode(' - ', [$post->title, $post->subtitle]),
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:site',
                    'content' => '@Denakino',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:card',
                    'content' => 'summary_large_image',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:creator',
                    'content' => '@Denakino',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:description',
                    'content' => implode(' - ', [$post->title, $post->subtitle]),
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:image',
                    'content' => $post->hasMedia(Post::HERO_IMAGE) ?
                        $post->getFirstMediaUrl(
                            Post::HERO_IMAGE,
                            'twitter'
                        ) . '?body=' . $post->title : '',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:title',
                    'content' => $post->title,
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:description',
                    'content' => $post->title,
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:image',
                    'content' => $post->hasMedia(Post::HERO_IMAGE) ?
                        $post->getFirstMediaUrl(
                            Post::HERO_IMAGE,
                            'twitter'
                        ) . '?body=' . $post->title : '',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:locale',
                    'content' => 'en_US',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:site_name',
                    'content' => config('app.name'),
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:title',
                    'content' => $post->title,
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:type',
                    'content' => 'article',
                ]),
            ],
            [
                'metatagable_id' => $post->id,
                'metatagable_type' => Post::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:url',
                    'content' => route('blog.show', $post),
                ]),
            ],
        ];

        Metatag::insert($metatags);
    }
}
