<?php

namespace App\Http\Livewire\Project;

use App\Models\Project;
use Livewire\Component;

class Index extends Component
{
    public function render()
    {
        $locale = app()->getLocale();
        $projects = Project::query()
            ->select([
                'id',
                'title_' . $locale . ' as title',
                'body_' . $locale . ' as body',
                'git_url',
                'live_url',
            ])
            ->where('display', '=', true)
            ->orderBy('sort')
            ->get();

        return view('livewire.project.index', [
            'projects' => $projects,
        ]);
    }
}
