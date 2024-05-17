<?php

namespace App\Livewire;

use App\Helpers\MetaTags;
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

        return view(
            'livewire.homepage',
            [
                'metatags' => $metatags,
            ]
        )->title(__('homepage.title'));
    }
}
