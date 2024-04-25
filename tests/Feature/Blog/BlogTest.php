<?php

it('can show the blog page', function () {
    $response = $this->get('/blog')
        ->assertSeeLivewire(\App\Livewire\Post\Index::class)
        ->assertStatus(200);
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
        ->get('/blog')
        ->assertSee($releasedPostPast->title)
        ->assertSee('/blog/' . $releasedPostPast->slug)
        ->assertSee($releasedPostPast->user->name)
        ->assertDontSee($releasedPostFuture->title)
        ->assertDontSee($unReleasedPostPast->title)
        ->assertDontSee($unReleasedPostFuture->title);

    Livewire::test(\App\Livewire\Post\Index::class)
        ->assertSee($releasedPostPast->title)
        ->assertSee('/blog/' . $releasedPostPast->slug)
        ->assertSee($releasedPostPast->user->name)
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

    Livewire::withQueryParams(['s' => 'first'])
        ->test(\App\Livewire\Post\Index::class)
        ->assertSee($firstPost->title)
        ->assertDontSee($secondPost->title);

    $this->get('/blog?s=first')
        ->assertSee($firstPost->title)
        ->assertDontSee($secondPost->title);
});

it('can filter blog posts by tag', function () {
    $user = \App\Models\User::factory()->create();
    $firstPost = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'title' => 'First Post',
        'is_released' => true,
        'released_at' => now()->subHour(),
    ]);
    $firstTag = \App\Models\Tag::create(['title' => 'first']);
    $firstPost->tags()->attach($firstTag->id);

    $secondPost = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'title' => 'Second Post',
        'is_released' => true,
        'released_at' => now()->subHour(),
    ]);
    $secondTag = \App\Models\Tag::create(['title' => 'second']);
    $secondPost->tags()->attach($secondTag->id);

    $this
        ->get('/blog?tag=' . $firstTag->title)
        ->assertSee($firstPost->title)
        ->assertDontSee($secondPost->title);

    $this
        ->get('/blog?tag=' . $secondTag->title)
        ->assertDontSee($firstPost->title)
        ->assertSee($secondPost->title);
});

it('can show blog posts by slug', function () {
    $user = \App\Models\User::factory()->create();
    $post = \App\Models\Post::factory()->create([
        'user_id' => $user->id,
        'is_released' => true,
        'released_at' => now()->subHour(),
    ]);

    $this->get('/blog/' . $post->slug)
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertSee($post->title)
        ->assertSee($post->markdown, false)
        ->assertSee($post->released_at->diffForHumans())
        ->assertSee($post->user->name);
});

it('generates an rss feed', function () {
    $user = \App\Models\User::factory()->create();
    $posts = \App\Models\Post::factory(31)->for($user)->create(['is_released' => true]);
    $tag = \App\Models\Tag::create(['title' => 'test']);

    $latestPost = \App\Models\Post::latest('released_at')->first();
    $firstPost = \App\Models\Post::orderBy('released_at')->first();
    $randomPost = $posts->filter(
        fn(\App\Models\Post $post) => !in_array($post->id, [$latestPost->id, $firstPost->id])
    )
        ->random();
    $randomPost->tags()->attach($tag->id);

    // Pagination First Page
    $this->get('/blog/feed.xml')
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertHeader('Content-Type', 'application/xml')
        ->assertViewIs('blog.feed')
        ->assertSee($latestPost->title)
        ->assertDontSee($firstPost->title);

    // Pagination Second Page
    $this->get('/blog/feed.xml?page=2')
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertHeader('Content-Type', 'application/xml')
        ->assertViewIs('blog.feed')
        ->assertSee($firstPost->title)
        ->assertDontSee($latestPost->title);

    // Show post with specified tag
    $this->get('/blog/feed.xml?tag=test')
        ->assertStatus(\Illuminate\Http\Response::HTTP_OK)
        ->assertHeader('Content-Type', 'application/xml')
        ->assertViewIs('blog.feed')
        ->assertSee($randomPost->title)
        ->assertDontSee($firstPost->title)
        ->assertDontSee($latestPost->title);
});
