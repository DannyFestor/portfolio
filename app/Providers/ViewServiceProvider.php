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
                /** @var Post $post */
                $post = request()->route('post');
                $options['post'] = $post->slug;
            }
            if ($routeName === 'project.show') {
                /** @var Project $project */
                $project = request()->route('project');
                $options['project'] = $project->slug;
            }

            $view->with('routeName', $routeName);

            $view->with('routeOptions', $options);
        });
    }
}
