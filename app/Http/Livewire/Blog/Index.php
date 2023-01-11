<?php

namespace App\Http\Livewire\Blog;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public string $search = '';
    public Collection $tags;
    public array $selectedTags = [];

    protected $queryString = [
        'search' => ['as' => 's', 'except' => ''],
        'selectedTags' => ['as' => 't', 'except' => []],
    ];

    public function mount()
    {
        $this->tags = Tag::withCount('posts')
            ->having('posts_count', '>', 0)
            ->orderBy('title')
            ->get();
    }

    public function render()
    {
        return view('livewire.blog.index', [
            'posts' => Post::query()
                ->select(['id', 'slug', 'title', 'user_id', 'released_at', 'description'])
                ->with([
                    'user',
                    'tags',
                    'media' => function (MorphMany $query) {
                        $query->where('collection_name', '=', Post::HERO_IMAGE);
                    }
                ])
                ->whereNotNull('released_at')
                ->where('released_at', '<', now())
                ->where('is_released', '=', TRUE)
                ->when($this->search, function (Builder $query, string $value) {
                    $query->where('title', 'like', "%$value%");
                })
                ->when($this->selectedTags, function (Builder $query, array $value) {
                    foreach($value as $tag) {
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
