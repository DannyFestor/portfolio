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
                'url' => 'https://alpinejs.dev/',
                'logo' => 'alpinejs.svg',
                'text_color' => '#8BC0D0',
                'background_color' => '',
                'border_color' => '#8BC0D0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Bun',
                'url' => 'https://bun.sh/',
                'logo' => 'bun.svg',
                'text_color' => '#000000',
                'background_color' => '',
                'border_color' => '#000000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'C',
                'url' => 'https://www.open-std.org/jtc1/sc22/wg14/',
                'logo' => 'c.svg',
                'text_color' => '#A8B9CC',
                'background_color' => '',
                'border_color' => '#A8B9CC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'C++',
                'url' => 'https://isocpp.org',
                'logo' => 'cplusplus.svg',
                'text_color' => '#00599C',
                'background_color' => '',
                'border_color' => '#00599C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Css3',
                'url' => 'https://www.w3.org/TR/CSS/#css',
                'logo' => 'css3.svg',
                'text_color' => '#1572B6',
                'background_color' => '',
                'border_color' => '#1572B6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Dart',
                'url' => 'https://dart.dev/',
                'logo' => 'dart.svg',
                'text_color' => '#01579B',
                'background_color' => '',
                'border_color' => '#01579B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Deno',
                'url' => 'https://deno.land/',
                'logo' => 'deno.svg',
                'text_color' => '#000000',
                'background_color' => '',
                'border_color' => '#000000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Electron',
                'url' => 'https://www.electronjs.org/',
                'logo' => 'electron.svg',
                'text_color' => '#47848F',
                'background_color' => '',
                'border_color' => '#47848F',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Flutter',
                'url' => 'https://flutter.dev/',
                'logo' => 'flutter.svg',
                'text_color' => '#02569B',
                'background_color' => '',
                'border_color' => '#02569B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Go',
                'url' => 'https://go.dev/',
                'logo' => 'go.svg',
                'text_color' => '#00ADD8',
                'background_color' => '',
                'border_color' => '#00ADD8',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Html5',
                'url' => 'https://html5.org/',
                'logo' => 'html5.svg',
                'text_color' => '#E34F26',
                'background_color' => '',
                'border_color' => '#E34F26',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Inertia',
                'url' => 'https://inertiajs.com/',
                'logo' => 'inertia.svg',
                'text_color' => '#9553E9',
                'background_color' => '',
                'border_color' => '#9553E9',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Javascript',
                'url' => 'https://www.ecma-international.org/publications-and-standards/standards/ecma-262/',
                'logo' => 'javascript.svg',
                'text_color' => '#000000',
                'background_color' => '#F7DF1E',
                'border_color' => '#F7DF1E',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Laravel',
                'url' => 'https://laravel.com/',
                'logo' => 'laravel.svg',
                'text_color' => '#FF2D20',
                'background_color' => '',
                'border_color' => '#FF2D20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Livewire',
                'url' => 'https://livewire.laravel.com/',
                'logo' => 'livewire.svg',
                'text_color' => '#4E56A6',
                'background_color' => '',
                'border_color' => '#4E56A6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Nodejs',
                'url' => 'https://nodejs.org/',
                'logo' => 'nodedotjs.svg',
                'text_color' => '#339933',
                'background_color' => '',
                'border_color' => '#339933',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'OCaml',
                'url' => 'https://ocaml.org/',
                'logo' => 'ocaml.svg',
                'text_color' => '#EC6813',
                'background_color' => '',
                'border_color' => '#EC6813',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Php',
                'url' => 'https://www.php.net/',
                'logo' => 'php.svg',
                'text_color' => '#777BB4',
                'background_color' => '',
                'border_color' => '#777BB4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'React',
                'url' => 'https://react.dev/',
                'logo' => 'react.svg',
                'text_color' => '#61DAFB',
                'background_color' => '',
                'border_color' => '#61DAFB',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Rust',
                'url' => 'https://www.rust-lang.org/',
                'logo' => 'rust.svg',
                'text_color' => '#000000',
                'background_color' => '',
                'border_color' => '#000000',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Solidjs',
                'url' => 'https://www.solidjs.com/',
                'logo' => 'solid.svg',
                'text_color' => '#2C4F7C',
                'background_color' => '',
                'border_color' => '#2C4F7C',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Svelte',
                'url' => 'https://svelte.dev/',
                'logo' => 'svelte.svg',
                'text_color' => '#FF3E00',
                'background_color' => '',
                'border_color' => '#FF3E00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tailwindcss',
                'url' => 'https://tailwindcss.com/',
                'logo' => 'tailwindcss.svg',
                'text_color' => '#06B6D4',
                'background_color' => '',
                'border_color' => '#06B6D4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Typescript',
                'url' => 'https://www.typescriptlang.org/',
                'logo' => 'typescript.svg',
                'text_color' => '#3178C6',
                'background_color' => '',
                'border_color' => '#3178C6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Vuejs',
                'url' => 'https://vuejs.org/',
                'logo' => 'vuejs.svg',
                'text_color' => '#4FC08D',
                'background_color' => '',
                'border_color' => '#4FC08D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Zig',
                'url' => 'https://ziglang.org/',
                'logo' => 'zig.svg',
                'text_color' => '#F7A41D',
                'background_color' => '',
                'border_color' => '#F7A41D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Tag::insert($tags);
    }
}
