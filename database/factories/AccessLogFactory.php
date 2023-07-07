<?php

namespace Database\Factories;

use App\Models\AccessLog;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class AccessLogFactory extends Factory
{
    protected $model = AccessLog::class;

    public function definition(): array
    {
        return [
            'ip' => $this->faker->ipv4(),
            'origin' => $this->faker->word(),
            'address' => $this->faker->address(),
            'referrer' => $this->faker->word(),
            'method' => $this->faker->word(),
            'language' => $this->faker->word(),
            'is_livewire' => $this->faker->boolean(),
            'content_type' => $this->faker->word(),
            'accept' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
