<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>

    @stack('metatags')

    <title>{{ $title ?? '' }} - {{ config('app.name') }}</title>
    <link rel="shortcut icon" href="{{ asset('images/favicon.ico') }}" type="image/x-icon"/>
    <link rel="icon" type="image/jpeg" sizes="16x16" href="{{ asset('images/favicon-16x16.jpg') }}" />
    <link rel="icon" type="image/jpeg" sizes="32x32" href="{{ asset('images/favicon-32x32.jpg') }}" />
    <link rel="icon" type="image/jpeg" sizes="48x48" href="{{ asset('images/favicon-48x48.jpg') }}" />
    <link rel="icon" type="image/jpeg" sizes="96x96" href="{{ asset('images/favicon-96x96.jpg') }}" />
    <link rel="icon" type="image/jpeg" sizes="600x600" href="{{ asset('images/favicon-600x600.jpg') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('vite')
    @stack('styles')
</head>
<body
    class="flex min-h-screen flex-col bg-gradient-to-br from-white to-slate-200 font-sans antialiased"
>
<livewire:navigation/>

{{ $slot }}

<x-layouts.partials.footer/>

@stack('scripts')
<script>
    document.addEventListener('livewire:navigated', () => window.scrollTo(0, 0));
</script>
</body>
</html>
