<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(Collection $users)
    {
        $users->each(fn (User $user) => Post::factory(10)->for($user)->create());
    }
}
