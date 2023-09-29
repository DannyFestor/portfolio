<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => [\App\Http\Middleware\SetAppLocaleMiddleware::class, \App\Http\Middleware\LogActivityMiddleware::class]], function () {
    Route::get('/{locale?}', \App\Livewire\Homepage::class)->name('home')->whereIn('locale', \App\Enums\Locales::toArray());

    Route::get('/blog', \App\Livewire\Post\Index::class)->name('blog.index');
    Route::get('/blog/feed.xml', [\App\Http\Controllers\PostController::class, 'rssFeed'])->name('blog.feed');
    Route::get('/blog/{post:slug}', \App\Livewire\Post\Show::class)->name('blog.show');

    Route::get('/{locale}/projects', [\App\Http\Controllers\ProjectController::class, 'index'])->name('project.index')->whereIn('locale', \App\Enums\Locales::toArray());
    Route::get('/{locale}/projects/{project:slug}', [\App\Http\Controllers\ProjectController::class, 'show'])->name('project.show')->whereIn('locale', \App\Enums\Locales::toArray());

    Route::get('/{locale}/contact', \App\Http\Controllers\Contact\IndexController::class)->name('contact.index')->whereIn('locale', \App\Enums\Locales::toArray());
    Route::post('/{locale}/contact', \App\Http\Controllers\Contact\StoreController::class)->name('contact.store')->whereIn('locale', \App\Enums\Locales::toArray());
});

Route::post('/set-locale', \App\Http\Controllers\LocaleController::class)->name('set-locale');
