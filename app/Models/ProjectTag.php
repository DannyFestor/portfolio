<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectTag extends Pivot
{
    public $incrementing = false;

    public $timestamps = false;

    protected $table = 'project_tag';

    protected $fillable = [
        'project_id',
        'tag_id',
    ];

    /**
     * @return BelongsTo<Project, ProjectTag>
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * @return BelongsTo<Tag, ProjectTag>
     */
    public function tag(): BelongsTo
    {
        return $this->belongsTo(Tag::class);
    }
}
