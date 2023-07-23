<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = [
        'title',
        'text_color',
        'background_color',
        'border_color',
        'logo',
    ];

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class, PostTag::class);
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, ProjectTag::class);
    }
}
