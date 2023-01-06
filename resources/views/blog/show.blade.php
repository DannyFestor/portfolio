<x-app-layout>
    <x-slot:title>{{ __('Blog')  }}</x-slot:title>
    <x-layouts.partials.content-wrap>
        <article class="bg-white p-4 sm:p-8 rounded max-w-4xl mx-auto shadow">
            <h1 class="text-4xl font-bold font-serif">
                {{ $post->title }}
            </h1>

            <section class="flex justify-end">
                {{ $post->user->name }}
                @if($post->released_at)
                -
                {{ $post->released_at->diffForHumans() }}
                @endif
            </section>

            <x-markdown class="prose font-serif min-w-full">
                {!! $post->description !!}
            </x-markdown>
        </article>
    </x-layouts.partials.content-wrap>
</x-app-layout>
