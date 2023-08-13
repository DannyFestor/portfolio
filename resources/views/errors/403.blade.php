<x-app-layout>
    <x-slot:title>
        {{ __('homepage.title') }} - Not allowed...
        </x-slot>

        <x-layouts.partials.content-wrap
            class="flex flex-col items-center justify-center"
        >
            Sorry friend, you are not allowed to do this...🥲
        </x-layouts.partials.content-wrap>
    @push('scripts')
        @livewireScripts
    @endpush
    @push('styles')
        @livewireStyles
    @endpush
</x-app-layout>
