<?php

namespace App\Providers;

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
                $options['post'] = request()->route('post')->slug;
            }
            if ($routeName === 'project.show') {
                $options['project'] = request()->route('project')->slug;
            }

            $view->with('routeName', $routeName);

            $view->with('routeOptions', $options);
        });
    }
}
