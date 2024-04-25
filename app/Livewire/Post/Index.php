<?php

namespace App\Livewire\Post;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Cache;
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

    /** @var array<int, mixed> */
    public array $tags;

    public function mount(): void
    {
        $this->tags = Cache::remember(
            'tags_list',
            60 * 24 * 24,
            fn () => Tag::query()
                ->select(['id', 'title', 'text_color', 'background_color', 'border_color', 'logo'])
                ->withCount('posts')
                ->having('posts_count', '>', 0)
                ->orderBy('title')
                ->get()
                ->toArray()
        );
    }

    public function render(): \Illuminate\Contracts\View\View
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
                    $query->whereHas('tags', function (Builder $query) {
                        $query->where('tags.title', 'like', "%{$this->selectedTag}%");
                    });
                })
                ->orderBy('released_at', 'DESC')
                ->paginate(perPage: 15),
            'metatags' => $this->getMetatags(),
        ])->title(__('Blog'));
    }

    /** Empty method because this refreshes render; can't call render from view somehow */
    public function onSubmit(): void
    {
    }

    public function previousPage(): void
    {
        $this->paginationPreviousPage();
        $this->dispatch('scroll-to-top');
    }

    public function nextPage(): void
    {
        $this->paginationNextPage();
        $this->dispatch('scroll-to-top');
    }

    public function gotoPage(mixed $page): void
    {
        $this->paginationGotoPage($page);
        $this->dispatch('scroll-to-top');
    }

    public function resetPage(): void
    {
        $this->paginationResetPage();
        $this->dispatch('scroll-to-top');
    }

    private function getMetatags(): string
    {
        /** @var string $path */
        $path = config('app.url');
        $imagePath = $path . '/img/danny-640.jpeg';

        $title = __('metatags.title');
        $titleShort = __('metatags.title.short');
        $keywords = __('metatags.keywords');
        $twitterHandle = __('metatags.twitter.username');
        $locale = __('metatags.locale');
        $localeUrl = __('metatags.locale.url');

        return <<<HTML
<link rel="home" href="{$path}">
<link rel="canonical" href="{$path}/blog">
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
<meta name="og:url" content="{$path}/blog">
HTML;
    }
}
