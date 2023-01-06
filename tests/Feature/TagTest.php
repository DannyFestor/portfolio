<?php

test('A tag can be registered', function () {
    \App\Models\Tag::create([
        'title' => 'test',
        'text_color' => '#000000',
        'background_color' => '#000000',
        'border_color' => '#000000',
        'image' => asset('icons/laravel.svg'),
    ]);

    $this->assertDatabaseHas('tags', [
        'title' => 'test',
        'text_color' => '#000000',
        'background_color' => '#000000',
        'border_color' => '#000000',
    ]);
});

test('A post can have many tags', function () {
    $post = \App\Models\Post::factory()->create();
    $tag1 = \App\Models\Tag::create(['title' => 'tag1']);
    $tag2 = \App\Models\Tag::create(['title' => 'tag2']);

    $post->tags()->attach([$tag1->id, $tag2->id]);

    $this->assertDatabaseHas('post_tag', ['post_id' => $post->id, 'tag_id' => $tag1->id]);
    $this->assertDatabaseHas('post_tag', ['post_id' => $post->id, 'tag_id' => $tag2->id]);
});

test('A tag can belong to many posts', function () {
    $post1 = \App\Models\Post::factory()->create();
    $post2 = \App\Models\Post::factory()->create();
    $tag = \App\Models\Tag::create(['title' => 'tag1']);

    $tag->posts()->attach([$post1->id, $post2->id]);

    $this->assertDatabaseHas('post_tag', ['post_id' => $post1->id, 'tag_id' => $tag->id]);
    $this->assertDatabaseHas('post_tag', ['post_id' => $post1->id, 'tag_id' => $tag->id]);
});
