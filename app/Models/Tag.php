<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = [
        'title',
        'url',
        'text_color',
        'background_color',
        'border_color',
        'logo',
    ];

    /**
     * @return BelongsToMany<Post>
     */
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, PostTag::class);
    }

    /**
     * @return BelongsToMany<Project>
     */
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, ProjectTag::class);
    }
}
