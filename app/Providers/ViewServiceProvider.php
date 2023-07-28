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

        Facades\View::composer('components.layouts.partials.navigation.language-select', function (View $view) {
            $view->with('routeName', request()->route()->getName());
        });
    }
}
