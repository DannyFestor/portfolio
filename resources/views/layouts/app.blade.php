<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>

    @stack('metatags')

    <title>{{ $title }} - {{ config('app.name') }}</title>
    <link
        rel="shortcut icon"
        href="{{ asset('favicon.ico') }}"
        type="image/x-icon"
    />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link
        href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Rubik:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
        rel="stylesheet"
    />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('vite')
    @stack('styles')
    @filamentStyles
</head>
<body
    class="flex min-h-screen flex-col bg-gradient-to-br from-white to-slate-200 font-sans antialiased"
>
<livewire:navigation/>

{{ $slot }}

<x-layouts.partials.footer/>

@stack('scripts')
@filamentScripts
<script>
    document.addEventListener('livewire:navigated', () => window.scrollTo(0, 0));
</script>
</body>
</html>
