<x-app-layout>
    <x-slot:title>
        {{ __('homepage.title') }} - Internal Server Error...
        </x-slot>

        <x-layouts.partials.content-wrap
            class="flex flex-col items-center justify-center"
        >
            Sorry friend, this really shouldn't have happened...🥲
        </x-layouts.partials.content-wrap>
    @push('scripts')
        @livewireScripts
    @endpush
    @push('styles')
        @livewireStyles
    @endpush
</x-app-layout>
