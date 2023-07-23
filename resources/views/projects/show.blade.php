<x-app-layout>
    <x-slot:title>{{ __('Projects')  }}</x-slot:title>

    <x-layouts.partials.content-wrap>
        <h1 class="font-bold text-center text-3xl font-serif mb-8">{{ $project['title'] }}</h1>
        @if(isset($project['img_url']))
            <div class="w-full max-w-2xl h-[400px] max-h-[400px] overflow-y-hidden mx-auto">
                <img src="{{ $project['img_url'] }}" alt="" class="w-full h-full object-cover">
            </div>
        @endif
        <article class="text-justify mx-auto max-w-xl mt-8">{{ $project['body'] }}</article>
        @if(isset($project['git_url']))
            <a href="{{ $project['git_url'] }}"
               class="flex items-center gap-2 rounded hover:bg-black hover:bg-opacity-20 p-2 max-w-xl mx-auto mt-4">
                <img src="{{ asset('icons/github.svg') }}" class="w-8 h-8">
                Github
            </a>
        @endif
        @if(isset($project['live_url']))
            <a href="{{ $project['live_url'] }}"
               class="flex items-center gap-2 rounded hover:bg-black hover:bg-opacity-20 p-2 max-w-xl mx-auto mt-4">
                <img src="{{ asset('icons/live.svg') }}" class="w-8 h-8">
                Live Demo
            </a>
        @endif
    </x-layouts.partials.content-wrap>
</x-app-layout>
