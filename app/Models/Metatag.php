<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Metatag extends Model
{
    protected $fillable = [
        'metatagable_id',
        'metatagable_type',
        'tag',
        'properties',
    ];

    protected $casts = [
        'properties' => 'json',
    ];

    const TAGS = [
        'link' => [
            'href' => ['type' => 'text', 'required' => true],
            'media' => ['type' => 'text', 'required' => false],
            'rel' => [
                'required' => true,
                'type' => 'select',
                'options' => [
                    'alternate',
                    'apple-touch-icon',
                    'apple-touch-startup-image',
                    'author',
                    'canonical',
                    'home',
                    'icon',
                    'manifest',
                    'media',
                    'preconnect',
                    'preload',
                    'search',
                    'shortcut icon',
                    'stylesheet',
                ],
            ],
            'title' => ['type' => 'text', 'required' => false],
            'type' => [
                'required' => false,
                'type' => 'select',
                'options' => [
                    'application/atom+xml',
                    'application/json',
                    'application/opensearchdescription+xml',
                    'application/rss+xml',
                    'image/gif',
                    'image/jpeg',
                    'image/png',
                    'image/webp',
                    'image/x-icon',
                    'text/plain',
                ],
            ],
            'sizes' => [
                'required' => false,
                'type' => 'select',
                'options' => [
                    '16x16',
                    '32x32',
                    '36x36',
                    '48x48',
                    '60x60',
                    '72x72',
                    '96x96',
                    '114x114',
                    '120x120',
                    '144x144',
                    '152x152',
                    '180x180',
                    '192x192',
                ],
            ],
        ],
        'meta' => [
            'charset' => ['type' => 'text', 'required' => false],
            'content' => ['type' => 'text', 'required' => true],
            'name' => [
                'required' => false,
                'type' => 'select',
                'options' => [
                    'ahrefs-site-verification',
                    'apple-mobile-web-app-capable',
                    'apple-mobile-web-app-status-bar-style',
                    'apple-mobile-web-app-title',
                    'application-name',
                    'description',
                    'keywords',
                    'mobile-web-app-capable',
                    'theme-color',
                    'twitter:card',
                    'twitter:creator',
                    'twitter:description',
                    'twitter:image',
                    'twitter:site',
                    'twitter:title',
                    'viewport',
                ],
            ],
            'property' => [
                'type' => 'text',
                'options' => [
                    'og:description',
                    'og:image',
                    'og:locale',
                    'og:site_name',
                    'og:title',
                    'og:type',
                    'og:url',
                ],
            ],
        ],
        'script' => [
            'src' => ['type' => 'text', 'required' => false],
            'defer' => ['type' => 'checkmark'],
        ],
    ];

    public function metatagable(): MorphTo
    {
        return $this->morphTo();
    }
}
