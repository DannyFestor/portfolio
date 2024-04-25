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
            'metatags' => $this->getMetatags(),
        ]);
    }

    private function getMetatags(): string
    {
        /** @var string $path */
        $path = config('app.url');
        $imagePath = $path . public_path('img/danny-640.jpeg');

        $title = __('metatags.title');
        $titleShort = __('metatags.title.short');
        $keywords = __('metatags.keywords');
        $twitterHandle = __('metatags.twitter.username');
        $locale = __('metatags.locale');
        $localeUrl = __('metatags.locale.url');

        return <<<HTML
<link rel="home" href="{$path}">
<link rel="canonical" href="{$path}/{$localeUrl}/projects">
<meta name="title" content="{$title}">
<meta name="keywords" content="{$keywords}">
<meta name="description" content="{$title}">
<meta name="twitter:site" content="{$twitterHandle}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="{$twitterHandle}">
<meta name="twitter:description" content="{$title}">
<meta name="twitter:image" content="{$imagePath}">
<meta name="twitter:title" content="{$titleShort}">
<meta name="og:description" content="{$title}">
<meta name="og:image" content="{$imagePath}">
<meta name="og:locale" content="{$locale}">
<meta name="og:site_name" content="festor.info">
<meta name="og:title" content="{$titleShort}">
<meta name="og:type" content="website">
<meta name="og:url" content="{$path}/{$localeUrl}/projects">
HTML;
    }

}
