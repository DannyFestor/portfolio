<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PostTag extends Pivot
{
    public $incrementing = false;

    public $timestamps = false;

    protected $table = 'post_tag';

    /**
     * @return BelongsTo<Post, PostTag>
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * @return BelongsTo<Tag, PostTag>
     */
    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}
