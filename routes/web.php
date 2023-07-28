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

//Route::get('/', fn () => phpinfo())->name('home');
//Route::get('/', \App\Http\Controllers\Homepage\HomepageController::class)->name('home');
Route::group(['middleware' => [\App\Http\Middleware\SetAppLocaleMiddleware::class, \App\Http\Middleware\LogActivityMiddleware::class]], function () {
    Route::get('/{locale?}', \App\Http\Controllers\Homepage\HomepageController::class)->name('home')->whereIn('locale', \App\Enums\Locales::toArray());

    Route::get('/blog', [\App\Http\Controllers\PostController::class, 'index'])->name('blog.index');
    Route::get('/blog/feed.xml', [\App\Http\Controllers\PostController::class, 'rssFeed'])->name('blog.feed');
    Route::get('/blog/{post:slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('blog.show');

    Route::get('/{locale}/projects', [\App\Http\Controllers\ProjectController::class, 'index'])->name('project.index')->whereIn('locale', \App\Enums\Locales::toArray());
    Route::get('/{locale}/projects/{project:slug}', [\App\Http\Controllers\ProjectController::class, 'show'])->name('project.show')->whereIn('locale', \App\Enums\Locales::toArray());

    Route::get('/{locale}/contact', \App\Http\Controllers\Contact\IndexController::class)->name('contact.index')->whereIn('locale', \App\Enums\Locales::toArray());
    Route::post('/{locale}/contact', \App\Http\Controllers\Contact\StoreController::class)->name('contact.store')->whereIn('locale', \App\Enums\Locales::toArray());
});

Route::post('/set-locale', \App\Http\Controllers\LocaleController::class)->name('set-locale');

//Route::get('/dashboard', function () {
//    return view('dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');
//
//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

require __DIR__ . '/auth.php';
