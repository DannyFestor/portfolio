<?php

namespace App\Livewire\Blog;

use Illuminate\Http\RedirectResponse;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\Features\SupportRedirects\Redirector;

class Search extends Component
{
    #[Url]
    public string $search = '';

    #[Url]
    public string $tag = '';

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.blog.search');
    }

    public function onSubmit(): RedirectResponse|Redirector
    {
        return redirect()->route('blog.index', ['search' => $this->search, 'tag' => $this->tag]);
    }
}
