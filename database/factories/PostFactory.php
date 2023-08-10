<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $title = fake()->realText(random_int(30, 100));
        $date = fake()->dateTimeBetween('-3 years');
        $slug = \Str::limit($date->format('Ymd') . '-' . \Str::slug($title), 75, '');

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'subtitle' => fake()->realText(random_int(30, 100)),
            'slug' => $slug,
            'synopsis' => fake()->paragraph,
            'description' => fake()->paragraphs(asText: true),
            'is_released' => fake()->boolean,
            'released_at' => $date,
        ];
    }
}
