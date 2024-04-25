<?php

namespace App\Listeners\Project;

use App\Events\Project\CreatedEvent;
use App\Models\Metatag;
use App\Models\Project;

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
        $project = $event->project;
        $tags = $event->project->tags->pluck('title')->join(',');

        $metatags = [
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'link',
                'properties' => json_encode([
                    'href' => config('app.url'),
                    'rel' => 'home',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'link',
                'properties' => json_encode([
                    'href' => route('project.show', ['locale' => 'en', 'project' => $project]),
                    'rel' => 'canonical',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'keywords',
                    'content' => $tags,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'title_en',
                    'content' => $project->title_en,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'description',
                    'content' => $project->title_en,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:site',
                    'content' => '@Denakino',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:card',
                    'content' => 'summary_large_image',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:creator',
                    'content' => '@Denakino',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:description',
                    'content' => $project->title_en,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:image',
                    'content' => $project->hasMedia(Project::PROJECT_IMAGE) ?
                        $project->getFirstMediaUrl(
                            Project::PROJECT_IMAGE,
                            'twitter'
                        ) . '?body=' . $project->title_en : '',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'twitter:title',
                    'content' => $project->title_en,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:description',
                    'content' => $project->title_en,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:image',
                    'content' => $project->hasMedia(Project::PROJECT_IMAGE) ?
                        $project->getFirstMediaUrl(
                            Project::PROJECT_IMAGE,
                            'twitter'
                        ) . '?body=' . $project->title_en : '',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:locale',
                    'content' => 'en_US',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:site_name',
                    'content' => config('app.name'),
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:title',
                    'content' => $project->title_en,
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:type',
                    'content' => 'website',
                ]),
            ],
            [
                'metatagable_id' => $project->id,
                'metatagable_type' => Project::class,
                'tag' => 'meta',
                'properties' => json_encode([
                    'name' => 'og:url',
                    'content' => route('project.show', ['locale' => 'en', 'project' => $project]),
                ]),
            ],
        ];

        Metatag::insert($metatags);
    }
}
