<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @stack('styles')
    </head>
    <body class="min-h-screen font-sans antialiased flex flex-col bg-gradient-to-r from-white to-slate-200">
        <x-layouts.partials.navigation />
        <x-layouts.partials.hamburger />

        <main class="relative flex-1 p-4 ml-12 sm:ml-52">
            {{ $slot }}

            super duper gut
        </main>

        <footer class="flex flex-col items-center relative p-4 ml-12 sm:ml-52">
            <section>
                &copy; Brücke - 2020-{{ now()->year }}
            </section>
            <section>
                Made with
                <a href="https://laravel.com" class="underline">Laravel</a>,
                <a href="https://laravel-livewire.com" class="underline">Livewire</a>
                and
                <a href="https://alpinejs.dev" class="underline">Alpine.js</a>
            </section>
        </footer>


        <script>
            document.addEventListener('alpine:init', () => {
                Alpine.store('darkMode', {
                    on: false,

                    toggle() {
                        this.on = ! this.on
                    }
                });

                Alpine.store('navigation', {
                    open: false,

                    show() {
                        this.open = true;
                    },

                    close() {
                        this.open = false;
                    },

                    toggle() {
                        this.open = ! this.open
                    },
                });

                window.addEventListener('resize', (e) => {
                    if (window.innerWidth < 640 || !Alpine.store('navigation').open) {
                        return;
                    }
                    Alpine.store('navigation').close();
                });
            });
        </script>
        @stack('scripts')
    </body>
</html>
