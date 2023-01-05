<?php

namespace App\Http\Livewire\Blog;

use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Livewire\Component;
use Livewire\WithPagination;

class Index extends Component
{
    use WithPagination;

    public string $search = '';

    protected $queryString = [
        'search' => ['as' => 's', 'except' => ''],
    ];

    public function render()
    {
        return view('livewire.blog.index', [
            'posts' => Post::query()
                ->select(['id', 'slug', 'title', 'user_id', 'released_at', 'description'])
                ->with('user')
                ->whereNotNull('released_at')
                ->where('released_at', '<', now())
                ->where('is_released', '=', TRUE)
                ->when($this->search, function (Builder $query, string $value) {
                    $query->where('title', 'like', "%$value%");
                })
                ->orderBy('released_at', 'DESC')
                ->paginate(perPage: 15),
        ]);
    }
}
