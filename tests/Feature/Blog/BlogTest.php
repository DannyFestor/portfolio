<?php

it('can show the blog page', function () {
    $response = $this->get(route('blog.index'));
    $response->assertStatus(200);
});

it('shows blog posts that are released an in the past', function () {
    $user = \App\Models\User::factory()->create();
    $releasedPostPast = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'is_released' => true,
        'released_at' => now()->subHour(),
    ]);
    $releasedPostFuture = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'is_released' => true,
        'released_at' => now()->addHour(),
    ]);
    $unReleasedPostPast = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'is_released' => false,
        'released_at' => now()->subHour(),
    ]);
    $unReleasedPostFuture = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'is_released' => false,
        'released_at' => now()->addHour(),
    ]);

    $this
        ->get(route('blog.index'))
        ->assertViewIs('blog.index')
        ->assertSeeLivewire(\App\Http\Livewire\Blog\Index::class)
        ->assertSee($releasedPostPast->title)
        ->assertSee(route('blog.show', $releasedPostPast))
        ->assertSee($releasedPostPast->user->name)
        ->assertSee(nl2br(Str::limit($releasedPostPast->description, 200)), escape: false)
        ->assertDontSee($releasedPostFuture->title)
        ->assertDontSee($unReleasedPostPast->title)
        ->assertDontSee($unReleasedPostFuture->title);
});

it('can search blog posts by title', function () {
    $user = \App\Models\User::factory()->create();
    $firstPost = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'title' => 'First Post',
        'is_released' => true,
        'released_at' => now()->subHour(),
    ]);
    $secondPost = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'title' => 'Second Post',
        'is_released' => true,
        'released_at' => now()->subHour(),
    ]);


    $this
        ->get(route('blog.index', ['s' => 'first']))
        ->assertSee($firstPost->title)
        ->assertDontSee($secondPost->title);
});
