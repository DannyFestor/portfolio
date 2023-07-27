<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Project extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    const PROJECT_IMAGE = 'project-image';

    const PROJECT_IMAGES = 'project-images';

    protected $fillable = [
        'slug',
        'title_en',
        'title_de',
        'title_ja',
        'body_en',
        'body_de',
        'body_ja',
        'display',
        'sort',
        'media',
        'git_url',
        'live_url',
    ];

    protected $casts = [
        'display' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub

        self::creating(function (self $model) {
            $sort = 1;
            $project = self::orderBy('sort', 'desc')->first();
            if ($project) {
                $sort = max($sort, $project->sort + 1);
            }
            $model->sort = $sort;
        });
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::PROJECT_IMAGE)
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);

                $this
                    ->addMediaConversion('preview')
                    ->width(300)
                    ->height(300);

                $this
                    ->addMediaConversion('twitter')
                    ->width(500)
                    ->height(500);
            });

        $this->addMediaCollection(self::PROJECT_IMAGES)
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('preview')
                    ->width(300)
                    ->height(300);
            });
    }

    /**
     * @return BelongsToMany<Tag>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, ProjectTag::class);
    }
}
