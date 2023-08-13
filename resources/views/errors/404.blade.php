<x-app-layout>
    <x-slot:title>
        {{ __('homepage.title') }} - Not found...
        </x-slot>

        <x-layouts.partials.content-wrap
            class="flex flex-col items-center justify-center"
        >
            Sorry friend, we did not find what you are looking for...🥲
        </x-layouts.partials.content-wrap>

    @push('scripts')
        @livewireScripts
    @endpush
    @push('styles')
        @livewireStyles
    @endpush
</x-app-layout>
