<?php

namespace App\Livewire\Project;

use App\Models\Project;
use Livewire\Component;

class Index extends Component
{
    public string $locale;

    public function mount(string $locale): void
    {
        $this->locale = $locale;
    }

    public function render(): \Illuminate\Contracts\View\View
    {
        $projects = Project::query()
            ->select([
                'id',
                'slug',
                'title_' . $this->locale . ' as title',
                \DB::raw('SUBSTR(body_' . $this->locale . ', 1, 100) as body'),
                'git_url',
                'live_url',
            ])
            ->with('tags')
            ->where('display', '=', true)
            ->orderBy('sort')
            ->get();

        return view('livewire.project.index', [
            'locale' => $this->locale,
            'projects' => $projects,
        ]);
    }
}
