<?php

namespace App\Livewire\Project;

use App\Helpers\MetaTags;
use App\Models\Project;
use Livewire\Component;

class Index extends Component
{
    public function render(): \Illuminate\Contracts\View\View
    {
        $projects = Project::query()
            ->select([
                'id',
                'slug',
                'title_en as title',
                \DB::raw('SUBSTR(body_en, 1, 100) as body'),
                'git_url',
                'live_url',
            ])
            ->with('tags')
            ->where('display', '=', true)
            ->orderBy('sort')
            ->get();

        $metatags = MetaTags::makeMetatags(
            path: 'blog',
            title: __('metatags.title'),
            titleShort: __('metatags.title.short'),
            keywords: __('metatags.keywords'),
            description: __('metatags.title'),
            type: 'website',
        );

        return view('livewire.project.index', [
            'projects' => $projects,
            'metatags' => $metatags,
        ])->title(__('Project Portfolio'));
    }
}
