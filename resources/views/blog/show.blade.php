<x-app-layout>
    <x-slot:title>{{ __('Blog')  }}</x-slot:title>

    <x-layouts.partials.content-wrap>
        <article class="bg-white p-4 sm:p-8 rounded max-w-4xl mx-auto shadow">
            <h1 class="text-2xl font-bold font-serif">
                {{ $post->title }}
            </h1>

            <section id="content" class="prose font-serif">
                {!! $post->description !!}
            </section>
        </article>
    </x-layouts.partials.content-wrap>
</x-app-layout>
