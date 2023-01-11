<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/', \App\Http\Controllers\Homepage\HomepageController::class)->name('home.ger');
Route::post('/set-locale', \App\Http\Controllers\LocaleController::class)->name('set-locale');
Route::get('/en', \App\Http\Controllers\Homepage\HomepageController::class)->name('home.en');

Route::get('/blog', [\App\Http\Controllers\PostController::class, 'index'])->name('blog.index');
Route::get('/blog/feed', [\App\Http\Controllers\PostController::class, 'rssFeed'])->name('blog.feed');
Route::get('/blog/{post:slug}', [\App\Http\Controllers\PostController::class, 'show'])->name('blog.show');

//Route::get('/dashboard', function () {
//    return view('dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');
//
//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

require __DIR__.'/auth.php';
