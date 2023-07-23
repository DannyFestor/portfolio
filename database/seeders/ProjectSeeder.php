<?php

namespace Database\Seeders;

use App\Models\Project;
use Faker\Factory;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = Project::factory(3)->create();

        $faker = Factory::create('en_US');
        $projects->each(fn (Project $project) => $project->addMedia($faker->image)->toMediaCollection(Project::COLLECTION)->disk('public'));
    }
}
