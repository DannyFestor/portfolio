<?php

namespace App\Http\Controllers;

use App\Models\Project;

class ProjectController extends Controller
{
    public function __invoke()
    {
        return view('projects.index');
    }
}
