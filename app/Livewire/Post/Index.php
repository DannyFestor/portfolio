<?php

namespace App\Livewire\Post;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination {
        // include the WithPagincation functions so that we can expand upon them and call the originals
        WithPagination::previousPage as paginationPreviousPage;
        WithPagination::nextPage as paginationNextPage;
        WithPagination::gotoPage as paginationGotoPage;
        WithPagination::resetPage as paginationResetPage;
    }

    #[Url(as: 's')]
    public string $search = '';

    #[Url(as: 'tag')]
    public string $selectedTag = '';

    public array $tags;

    public function mount(): void
    {
        $this->tags = Tag::withCount('posts')
            ->having('posts_count', '>', 0)
            ->orderBy('title')
            ->get()
            ->toArray();
    }

    public function render()
    {
        return view('livewire.post.index', [
            'posts' => Post::query()
                ->select(['id', 'slug', 'title', 'user_id', 'released_at', 'description'])
                ->with([
                    'user:id,name,email',
                    'tags',
                    'media' => function (MorphMany $query) {
                        $query->where('collection_name', '=', Post::HERO_IMAGE);
                    },
                ])
                ->whereNotNull('released_at')
                ->where('released_at', '<', now())
                ->where('is_released', '=', true)
                ->when($this->search, function (Builder $query, string $value) {
                    $query->where('title', 'like', "%$value%");
                })
                ->when($this->selectedTag !== '', function (Builder $query) {
                    $query->whereHas('tags', function (Builder $query)  {
                        $query->where('tags.title', 'like', "%{$this->selectedTag}%");
                    });
                })
                ->orderBy('released_at', 'DESC')
                ->paginate(perPage: 15),
        ])->title(__('Blog'));
    }

    public function onSubmit() {}

    public function previousPage()
    {
        $this->paginationPreviousPage();
        $this->dispatch('scroll-to-top');
    }

    public function nextPage()
    {
        $this->paginationNextPage();
        $this->dispatch('scroll-to-top');
    }

    public function gotoPage($page)
    {
        $this->paginationGotoPage($page);
        $this->dispatch('scroll-to-top');
    }

    public function resetPage()
    {
        $this->paginationResetPage();
        $this->dispatch('scroll-to-top');
    }
}
