<?php

namespace App\Providers;

use App\Models\Post;
use App\Models\Project;
use Illuminate\Support\Facades;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\View;

class ViewServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Facades\View::composer('components.layouts.partials.navigation.links', function (View $view) {
            $view->with('locale', session()->get('locale', 'en'));
        });

        Facades\View::composer('livewire.navigation.language-select', function (View $view) {
            $routeName = request()->route()?->getName() ?? 'home';
            $options = [];

            if ($routeName === 'blog.show') {
                /** @var Post|string $post */
                $post = request()->route('post');
                if (gettype($post) === 'object' && $post instanceof Post) {
                    $options['post'] = $post->slug;
                }
            }
            if ($routeName === 'project.show') {
                /** @var Project|string $project */
                $project = request()->route('project');
                if (gettype($project) === 'object' && $project instanceof Project) {
                    $options['project'] = $project->slug;
                }
            }

            $view->with('routeName', $routeName);

            $view->with('routeOptions', $options);
        });
    }
}
