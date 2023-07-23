<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            TagSeeder::class,
        ]);

        $users = User::all();
        $tags = Tag::all();
        $this->callWith([
            PostSeeder::class,
            ProjectSeeder::class,
        ], [
            'users' => $users,
            'tags' => $tags,
        ]);
    }
}
