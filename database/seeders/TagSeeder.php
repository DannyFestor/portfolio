<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run()
    {
        $tags = [
            [
                'title' => 'Alpinejs',
                'logo' => "alpinejs.svg",
                'text_color' => '#8BC0D0',
                'background_color' => '',
                'border_color' => '#8BC0D0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Css3',
                'logo' => "css3.svg",
                'text_color' => '#1572B6',
                'background_color' => '',
                'border_color' => '#1572B6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Dart',
                'logo' => "dart.svg",
                'text_color' => '#01579B',
                'background_color' => '',
                'border_color' => '#01579B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Electron',
                'logo' => "electron.svg",
                'text_color' => '#47848F',
                'background_color' => '',
                'border_color' => '#47848F',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Flutter',
                'logo' => "flutter.svg",
                'text_color' => '#02569B',
                'background_color' => '',
                'border_color' => '#02569B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Go',
                'logo' => "go.svg",
                'text_color' => '#00ADD8',
                'background_color' => '',
                'border_color' => '#00ADD8',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Html5',
                'logo' => "html5.svg",
                'text_color' => '#E34F26',
                'background_color' => '',
                'border_color' => '#E34F26',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Inertia',
                'logo' => "inertia.svg",
                'text_color' => '#9553E9',
                'background_color' => '',
                'border_color' => '#9553E9',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Javascript',
                'logo' => "javascript.svg",
                'text_color' => '#000000',
                'background_color' => '#F7DF1E',
                'border_color' => '#F7DF1E',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Laravel',
                'logo' => "laravel.svg",
                'text_color' => '#FF2D20',
                'background_color' => '',
                'border_color' => '#FF2D20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Livewire',
                'logo' => "livewire.svg",
                'text_color' => '#4E56A6',
                'background_color' => '',
                'border_color' => '#4E56A6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Php',
                'logo' => "php.svg",
                'text_color' => '#777BB4',
                'background_color' => '',
                'border_color' => '#777BB4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'React',
                'logo' => "react.svg",
                'text_color' => '#61DAFB',
                'background_color' => '',
                'border_color' => '#61DAFB',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Rust',
                'logo' => "rust.svg",
                'text_color' => '#000000',
                'background_color' => '',
                'border_color' => '#000000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Svelte',
                'logo' => "svelte.svg",
                'text_color' => '#FF3E00',
                'background_color' => '',
                'border_color' => '#FF3E00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tailwindcss',
                'logo' => "tailwindcss.svg",
                'text_color' => '#06B6D4',
                'background_color' => '',
                'border_color' => '#06B6D4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Typescript',
                'logo' => "typescript.svg",
                'text_color' => '#3178C6',
                'background_color' => '',
                'border_color' => '#3178C6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Vuejs',
                'logo' => "vuejs.svg",
                'text_color' => '#4FC08D',
                'background_color' => '',
                'border_color' => '#4FC08D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Tag::insert($tags);
    }
}