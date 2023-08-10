<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AccessLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'accessible_id',
        'accessible_type',
        'accessed_at',
        'ip',
        'origin',
        'platform',
        'platform_version',
        'device',
        'device_kind',
        'browser',
        'browser_version',
        'is_robot',
        'address',
        'referrer',
        'method',
        'language',
        'is_livewire',
        'content_type',
        'accept',
    ];

    /**
     * @return MorphTo<Model, AccessLog>
     */
    public function accessable(): MorphTo
    {
        return $this->morphTo();
    }
}
