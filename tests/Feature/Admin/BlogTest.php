<?php

it('can edit a post', function () {
    $user = \App\Models\User::factory()->create(['is_admin' => TRUE]);
    $post = \App\Models\Post::factory()->create(['user_id' => $user->id, 'is_released' => true, 'released_at' => now()->subHour()]);
    $response = $this
        ->actingAs($user)
        ->get(route('admin.post.edit', $post));
    $response
        ->assertStatus(200)
        ->assertViewIs('admin.post.edit')
        ->assertViewHas(['post'])
        ->assertSeeLivewire('admin.post.edit');

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
