<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        \App\Models\User::factory()->create([
            'first_name' => 'Danny',
            'last_name' => 'Festor',
            'email' => 'danny@festor.info',
        ]);
        \App\Models\User::factory(10)->create();
    }
}
