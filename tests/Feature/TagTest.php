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
