<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\Project;
use Illuminate\Console\Command;
use InvalidArgumentException;

class MakeSitemap extends Command
{
    protected $signature = 'sitemap:make';

    protected $description = 'Regenerate a sitemap.';

    public function handle(): void
    {
        $file = fopen(public_path('sitemap.xml'), 'w');
        if (!is_resource($file)) {
            throw new InvalidArgumentException(
                sprintf('Argument must be a valid resource type. %s given.', gettype($file))
            );
        }
        $this->writeHeader($file);
        $this->makeStaticPages($file);
        $this->makeBlogPosts($file);
        $this->makeProjects($file);
        $this->writeFooter($file);
        fclose($file);
    }

    /**
     * @param  resource  $file
     */
    private function writeHeader($file): void
    {
        $header = <<<'xml'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
xml;

        fwrite($file, $header . PHP_EOL);
    }

    /**
     * @param  resource  $file
     */
    private function makeStaticPages($file): void
    {
        $routes = [
            [
                'url' => route('home'),
                'changeFreq' => 'yearly',
                'priority' => 1.0,
            ],
            [
                'url' => route('home'),
                'changeFreq' => 'yearly',
                'priority' => 1.0,
            ],
            [
                'url' => route('blog.index'),
                'changeFreq' => 'daily',
                'priority' => 0.8,
            ],
            [
                'url' => route('contact.index'),
                'changeFreq' => 'never',
                'priority' => 0.8,
            ],
            [
                'url' => route('project.index'),
                'changeFreq' => 'monthly',
                'priority' => 0.9,
            ],
        ];

        foreach ($routes as $route) {
            $this->makeUrlBlock($file, $route['url'], $route['changeFreq'], $route['priority']);
        }
    }

    /**
     * @param  resource  $file
     */
    private function makeUrlBlock($file, string $url, string $changeFreq, float $priority): void
    {
        $block = <<<xml
    <url>
        <loc>{$url}</loc>
        <changefreq>{$changeFreq}</changefreq>
        <priority>{$priority}</priority>
    </url>
xml;
        fwrite($file, $block . PHP_EOL);
    }

    /**
     * @param  resource  $file
     */
    private function makeBlogPosts($file): void
    {
        $posts = Post::query()
            ->whereNotNull('released_at')
            ->where('released_at', '<', now())
            ->where('is_released', '=', true)
            ->orderBy('released_at', 'DESC')
            ->get();

        foreach ($posts as $post) {
            if (!$post->released_at) {
                continue;
            }

            if (now()->subDay()->lt($post->released_at)) {
                $changeFreq = 'hourly';
            } elseif (now()->subWeek()->lt($post->released_at)) {
                $changeFreq = 'daily';
            } elseif (now()->subMonth()->lt($post->released_at)) {
                $changeFreq = 'weekly';
            } elseif (now()->subYear()->lt($post->released_at)) {
                $changeFreq = 'monthly';
            } elseif (now()->subYears(3)->lt($post->released_at)) {
                $changeFreq = 'yearly';
            } else {
                $changeFreq = 'never';
            }
            $this->makeUrlBlock($file, route('blog.show', $post), $changeFreq, 0.7);
        }
    }

    /**
     * @param  resource  $file
     */
    private function makeProjects($file): void
    {
        $projects = Project::query()
            ->with('tags')
            ->where('display', '=', true)
            ->orderBy('sort')
            ->get();
    }

    /**
     * @param  resource  $file
     */
    private function writeFooter($file): void
    {
        $footer = <<<'xml'
</urlset>
xml;
        fwrite($file, $footer . PHP_EOL);
    }
}
