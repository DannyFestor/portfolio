<x-app-layout>
    <x-slot:title>
        {{ __('homepage.title') }} - Expired...
        </x-slot>

        <x-layouts.partials.content-wrap
            class="flex flex-col items-center justify-center"
        >
            Sorry friend, something went wrong...🥲
        </x-layouts.partials.content-wrap>
    @push('scripts')
        @livewireScripts
    @endpush
    @push('styles')
        @livewireStyles
    @endpush
</x-app-layout>
