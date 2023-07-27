<?php

namespace Database\Seeders;

use App\Models\Project;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class ProjectSeeder extends Seeder
{
    public function run(Collection $users, Collection $tags): void
    {
        $projects = Project::factory(3)->create();

        $faker = Factory::create('en_US');
        $projects->each(
            fn (Project $project) => $project
                ->addMedia($faker->image)
                ->toMediaCollection(Project::COLLECTION)
        );
        $projects->each(
            fn (Project $project) => $project
                ->tags()
                ->attach($tags
                    ->random(5)
                    ->pluck('id')
                    ->toArray())
        );
    }
}
