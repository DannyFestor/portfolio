<?php

namespace App\Livewire\Blog;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    #[Url(as: 's')]
    public string $search = '';

    /**
     * @var Collection<int, Tag>
     */
    public Collection $tags;

    /**
     * @var array<string>
     */
    public array $selectedTags = [];

    public function mount(): void
    {
        $this->tags = Tag::withCount('posts')
            ->having('posts_count', '>', 0)
            ->orderBy('title')
            ->get();
    }

    public function render(): View
    {
        return view('livewire.blog.index', [
            'posts' => Post::query()
                ->select(['id', 'slug', 'title', 'user_id', 'released_at', 'description'])
                ->with([
                    'user',
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
                ->when($this->selectedTags, function (Builder $query, array $value) {
                    foreach ($value as $tag) {
                        $query->whereHas('tags', function (Builder $query) use ($tag) {
                            $query->where('tags.title', 'like', "%$tag%");
                        });
                    }
                })
                ->orderBy('released_at', 'DESC')
                ->paginate(perPage: 15),
        ]);
    }
}
