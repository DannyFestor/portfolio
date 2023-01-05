<?php

it('can edit a post', function () {
    $user = \App\Models\User::factory()->create(['is_admin' => TRUE]);
    $post = \App\Models\Post::factory()->create(['user_id' => $user->id, 'is_released' => true, 'released_at' => now()->subHour()]);
    $secondPost = \App\Models\Post::factory()->create(['user_id' => $user->id, 'is_released' => true, 'released_at' => now()->subHour()]);

    $response = $this
        ->actingAs($user)
        ->get(route('admin.post.edit', $post));
    $response
        ->assertStatus(200)
        ->assertViewIs('admin.post.edit')
        ->assertViewHas(['post'])
        ->assertSeeLivewire('admin.post.edit');

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->assertSet('title', $post->title)
        ->assertSet('released_at', $post->released_at)
        ->assertSet('slug', $post->slug)
        ->assertSet('description', $post->description)
        ->assertSet('is_released', $post->is_released);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('title', '')
        ->set('slug', '')
        ->set('description', '')
        ->call('onSubmit')
        ->assertHasErrors([
            'title' => 'required',
            'slug' => 'required',
            'description' => 'required',
        ]);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('title', str_repeat('a', 9))
        ->call('onSubmit')
        ->assertHasErrors([
            'title' => 'min',
        ]);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('title', str_repeat('a', 256))
        ->call('onSubmit')
        ->assertHasErrors([
            'title' => 'max',
        ]);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('slug', str_repeat('a', 9))
        ->call('onSubmit')
        ->assertHasErrors([
            'slug' => 'min',
        ]);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('slug', str_repeat('a', 101))
        ->call('onSubmit')
        ->assertHasErrors([
            'slug' => 'max',
        ]);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('slug', $secondPost->slug)
        ->call('onSubmit')
        ->assertHasErrors([
            'slug' => 'unique'
        ]);

    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('released_at', 'invalid date')
        ->call('onSubmit')
        ->assertHasErrors([
            'released_at' => 'date'
        ]);

    $newTitle = 'first post';
    $newSlug = 'first-post';
    $newDescription = 'First Post!!';
    $newDate = now()->format('Y-m-d H:i');
    Livewire::test(\App\Http\Livewire\Admin\Post\Edit::class, ['post' => $post])
        ->set('title', $newTitle)
        ->set('slug', $newSlug)
        ->set('description', $newDescription)
        ->set('released_at', $newDate)
        ->call('onSubmit');

    $this->assertDatabaseHas('posts', [
        'id' => $post->id,
        'title' => $newTitle,
        'slug' => $newSlug,
        'description' => $newDescription,
        'released_at' => $newDate,
    ]);
    // TODO: TEST LIVEWIRE
    /**
     *         Livewire::test(CreatePost::class, ['initialTitle' => 'foo'])
                    ->assertSet('title', 'foo');
     *
     *         Livewire::test(CreatePost::class)
                ->set('title', '')
                ->call('create')
                ->assertHasErrors(['title' => 'required']);
     */
});
