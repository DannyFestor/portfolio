<?php

namespace App\Http\Controllers\Homepage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    public function __invoke()
    {
        if (request()->segment(1) === 'en') {
            app()->setLocale('en');
        }

        return view('homepage.index');
    }
}
