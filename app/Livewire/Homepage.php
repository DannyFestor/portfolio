<?php

namespace App\Livewire;

use App\Helpers\MetaTags;
use App\Models\Post;
use Illuminate\Database\Query\Builder;
use Livewire\Component;

class Homepage extends Component
{
    public function render(): \Illuminate\Contracts\View\View
    {
        $metatags = MetaTags::makeMetatags(
            path: '',
            title: __('metatags.title'),
            titleShort: __('metatags.title.short'),
            keywords: __('metatags.keywords'),
            description: __('metatags.description'),
            type: 'website',
        );

        $newestPosts = Post::query()
            ->where('released_at', '<=', now())
            ->where('is_released', '=', true)
            ->orderBy('released_at', 'desc')
            ->limit(3)
            ->get();

        $highlightedPosts = Post::query()
            ->where('released_at', '<=', now())
            ->where('is_released', '=', true)
            ->where('is_highlighted', '=', true)
            ->whereNotIn('id', $newestPosts->pluck('id')->toArray())
            ->orderBy('released_at', 'desc')
            ->limit(3)
            ->get();


        $randomPosts = Post::query()
            ->where('released_at', '<=', now())
            ->where('is_released', '=', true)
            ->whereNotIn('id', [
                ...$newestPosts->pluck('id')->toArray(),
                ...$highlightedPosts->pluck('id')->toArray()
            ])
            ->inRandomOrder()
            ->limit(3)
            ->get();

        $videos = collect([]); // TODO

        return view(
            'livewire.homepage',
            [
                'metatags' => $metatags,
                'newestPosts' => $newestPosts,
                'highlightedPosts' => $highlightedPosts,
                'randomPosts' => $randomPosts,
                'videos' => $videos,
            ]
        )->title(__('homepage.title'));
    }
}
