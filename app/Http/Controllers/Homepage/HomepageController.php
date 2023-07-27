<?php

namespace App\Http\Controllers\Homepage;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class HomepageController extends Controller
{
    public function __invoke(): View
    {
        return view('homepage.index');
    }
}
