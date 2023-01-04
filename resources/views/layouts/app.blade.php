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
    <body class="font-sans antialiased">
        @include('layouts.navigation')
        <div class="min-h-screen">
            <main class="min-h-screen">
                {{ $slot }}

                super duper gut
            </main>
        </div>

        <button x-data @click="$store.navigation.toggle()" class="relative z-50">toggle</button>

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
            })
        </script>
        @stack('scripts')
    </body>
</html>
