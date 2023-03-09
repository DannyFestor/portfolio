<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }} - {{ $title }}</title>
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Rubik:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @stack('vite')
        @stack('styles')
        @livewireStyles
    </head>
    <body class="min-h-screen font-sans antialiased flex flex-col bg-gradient-to-br from-white to-slate-200">
        <x-layouts.partials.navigation />
        <x-layouts.partials.hamburger />

        {{ $slot }}

        <x-layouts.partials.footer />
        <x-layouts.partials.footer-script />

        @stack('scripts')
        @livewireScripts
    </body>
</html>
