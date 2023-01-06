<?php

namespace App\Http\Livewire\Admin\Post;

use App\Models\Post;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Livewire\Component;

class Edit extends Component
{
    public Post $post;

    public string $title = '';
    public string $released_at = '';
    public string $slug = '';
    public string $description = '';
    public bool $is_released = false;

    public function getRules(): array
    {
        return [
            'title' => ['required', 'min:10', 'max:255',],
            'slug' => ['required', Rule::unique('posts', 'slug')->ignore($this->post->id), 'min:10', 'max:100'],
            'description' => ['required'],
            'released_at' => ['nullable', 'date'],
            'is_released' => ['required', 'boolean'],
        ];
    }

    public function mount()
    {
        $this->title = $this->post->title;
        $this->released_at = $this->post->released_at ? Carbon::parse($this->post->released_at)->format('Y-m-d H:i') : '';
        $this->slug = $this->post->slug;
        $this->description = $this->post->description;
        $this->is_released = $this->post->is_released;
    }

    public function render()
    {
        return view('livewire.admin.post.edit');
    }

    public function updatedTitle(string $value)
    {
        try {
            $date = Carbon::parse($this->released_at)->format('Ymd');
        } catch (InvalidFormatException $e) {
            $date = '';
        }
        $this->setSlug($value, $date);
    }

    public function updatedReleasedAt(string $value)
    {
        try {
            $date = Carbon::parse($value)->format('Ymd');
        } catch (InvalidFormatException $e) {
            $date = '';
        }
        $this->setSlug($this->title, $date);
    }

    private function setSlug(string $title, string $date)
    {
        $this->slug = \Str::limit($date . (strlen($date) ? '-' : '') . \Str::slug($title), 100, '');
    }

    public function onSubmit()
    {
        $validated = $this->validate();

        Post::query()
            ->where('id', '=', $this->post->id)
            ->update($validated);

        return redirect()->route('blog.show', $this->slug)->with('success', 'Post updated!');
    }

    public function onCancel()
    {
        return redirect()->route('blog.show', $this->post);
    }
}
