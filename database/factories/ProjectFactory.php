<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'title_en' => $this->faker->word(),
            'title_de' => $this->faker->word(),
            'title_ja' => $this->faker->word(),
            'body_en' => $this->faker->word(),
            'body_de' => $this->faker->word(),
            'body_ja' => $this->faker->word(),
            'display' => $this->faker->boolean(),
            'sort' => $this->faker->randomNumber(),
            'media' => $this->faker->word(),
            'git_url' => $this->faker->url(),
            'live_url' => $this->faker->url(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
