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

    const HERO_IMAGE = 'hero-image';

    const POST_IMAGES = 'post-images';

    protected $fillable = [
        'user_id',
        'title',
        'subtitle',
        'slug',
        'description',
        'is_released',
        'released_at',
    ];

    protected $casts = [
        'is_released' => 'boolean',
        'released_at' => 'datetime',
    ];

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
                    ->width(500)
                    ->height(500);
            });

        $this
            ->addMediaCollection(self::POST_IMAGES)
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/jpeg'])
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
                $this
                    ->addMediaConversion('twitter')
                    ->width(500)
                    ->height(500);
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
