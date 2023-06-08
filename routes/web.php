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

Route::get('/', \App\Http\Controllers\Homepage\HomepageController::class)->name('home');
Route::post('/set-locale', \App\Http\Controllers\LocaleController::class)->name('set-locale');

Route::get('/blog', [\App\Http\Controllers\PostController::class, 'index'])->name('blog.index');
Route::get('/blog/feed.xml', [\App\Http\Controllers\PostController::class, 'rssFeed'])->name('blog.feed');
Route::get('/blog/{post:slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('blog.show');

Route::get('contact', \App\Http\Controllers\Contact\IndexController::class)->name('contact.index');
Route::post('contact', \App\Http\Controllers\Contact\StoreController::class)->name('contact.store');

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
