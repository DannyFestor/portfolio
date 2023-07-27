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
        $enFaker = \Faker\Factory::create('en_US');
        $titleEn = $enFaker->words(asText: true);
        $bodyEn = $this->faker->realText();

        $deFaker = \Faker\Factory::create('de_DE');
        $titleDe = $deFaker->words(asText: true);
        $bodyDe = $deFaker->realText();

        $jpFaker = \Faker\Factory::create('ja_JP');
        $titleJp = $jpFaker->words(asText: true);
        $bodyJp = $jpFaker->realText();

        return [
            'slug' => \Str::slug($this->faker->words(asText: true)),
            'title_en' => $titleEn,
            'title_de' => $titleDe,
            'title_ja' => $titleJp,
            'body_en' => $bodyEn,
            'body_de' => $bodyDe,
            'body_ja' => $bodyJp,
            'display' => $this->faker->boolean(),
            'sort' => $this->faker->randomNumber(),
            'git_url' => $this->faker->url(),
            'live_url' => $this->faker->url(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
