<?php

namespace App\Livewire\Post;

use App\Models\Post;
use App\Models\User;
use Livewire\Component;

class Show extends Component
{
    public Post $post;

    public function mount(Post $post): void
    {
        /** @var User|null $user */
        $user = \Auth::user();

        if (
            (!$user || !$user->is_admin) &&
            (
                !$post->is_released ||
                (
                    $post->released_at &&
                    $post->released_at->gt(now())
                )
            )
        ) {
            abort(404);
        }

        $post->load(['tags', 'metatags']);
        $post->getFirstMedia(Post::HERO_IMAGE);

        $this->post = $post;
    }

    public function render(): \Illuminate\Contracts\View\View
    {
        $metatags = $this->buildMetaTags();

        return view(
            'livewire.post.show',
            ['metatags' => implode("\n\t", $metatags)]
        )
            ->title($this->post->title);
    }

    /**
     * @return array<string>
     */
    private function buildMetaTags(): array
    {
        $metatags = [];
        foreach ($this->post->metatags as $metatag) {
            $properties = [];
            foreach ($metatag->properties as $label => $value) {
                if (empty($value)) {
                    continue;
                }

                $properties[] = "$label=\"$value\"";
            }

            $tag = '<';
            $tag .= $metatag->tag;
            $tag .= ' ';
            $tag .= implode(' ', $properties);
            $tag .= '>';
            if ($metatag->tag === 'script') {
                $tag .= '</script>';
            }
            $metatags[] = $tag;
        }

        return $metatags;
    }
}
