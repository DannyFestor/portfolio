<?php

namespace App\Http\Controllers;

class ProjectController extends Controller
{
    public function __invoke()
    {
        return view('projects.index');
    }
}
