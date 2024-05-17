<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => [\App\Http\Middleware\LogActivityMiddleware::class]], function () {
    Route::get('/', \App\Livewire\Homepage::class)->name('home');

    Route::get('/blog', \App\Livewire\Post\Index::class)->name('blog.index');
    Route::get('/blog/feed.xml', [\App\Http\Controllers\PostController::class, 'rssFeed'])->name('blog.feed');
    Route::get('/blog/{post:slug}', \App\Livewire\Post\Show::class)->name('blog.show');

    Route::get('/projects', \App\Livewire\Project\Index::class)->name('project.index');
    Route::get('/projects/{project:slug}', \App\Livewire\Project\Show::class)->name('project.show');

    Route::get('/contact', \App\Livewire\Contact\Index::class)->name('contact.index');
});
