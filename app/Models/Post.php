<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Post extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'is_released',
        'released_at',
    ];

    protected $casts = [
        'is_released' => 'boolean',
        'released_at' => 'datetime',
    ];

    const HERO_IMAGE = 'hero-image';

    public static function booted()
    {
        self::created(function (Post $post) {
            // Relationships do not exist at this point I guess?
            // Dispatch Event?
            $tags = '';

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
                        'content' => $post->description,
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
                        'content' => $post->description,
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
        });
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection(self::HERO_IMAGE)
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpeg'])
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
                $this
                    ->addMediaConversion('twitter')
                    ->width(300)
                    ->height(300);
            });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, PostTag::class);
    }

    public function metatags(): MorphMany
    {
        return $this->morphMany(Metatag::class, 'metatagable');
    }
}
