<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => [\App\Http\Middleware\SetAppLocaleMiddleware::class, \App\Http\Middleware\LogActivityMiddleware::class]], function () {
    Route::get('/{locale?}', \App\Livewire\Homepage::class)->name('home')->whereIn('locale', \App\Enums\Locales::toArray());

    Route::get('/blog', \App\Livewire\Post\Index::class)->name('blog.index');
    Route::get('/blog/feed.xml', [\App\Http\Controllers\PostController::class, 'rssFeed'])->name('blog.feed');
    Route::get('/blog/{post:slug}', \App\Livewire\Post\Show::class)->name('blog.show');

    Route::get('/{locale}/projects', \App\Livewire\Project\Index::class)->name('project.index')->whereIn('locale', \App\Enums\Locales::toArray());
    Route::get('/{locale}/projects/{project:slug}', \App\Livewire\Project\Show::class)->name('project.show')->whereIn('locale', \App\Enums\Locales::toArray());

    Route::get('/{locale}/contact', \App\Livewire\Contact\Index::class)->name('contact.index')->whereIn('locale', \App\Enums\Locales::toArray());
});

Route::post('/set-locale', \App\Http\Controllers\LocaleController::class)->name('set-locale');
