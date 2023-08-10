<x-app-layout>
    <x-slot:title>{{ __('Blog') }}</x-slot>

        {{-- TODO: Search --}}
        {{-- TODO: Tags --}}
        {{--    <livewire:blog.index />--}}

        <x-layouts.partials.content-wrap>
            <h1 class="font-bold font-serif text-center text-xl">Latest Posts</h1>

            <section id="posts" class="mx-auto mt-8 flex max-w-7xl flex-col gap-4">
                @foreach ($posts as $post)
                    <article
                            class="flex flex-col rounded bg-white p-4 shadow"
                            role="article"
                    >
                        <section class="flex flex-col items-center gap-2 md:flex-row">
                            @if ($post->hasMedia(\App\Models\Post::HERO_IMAGE))
                                <section
                                        class="h-[100px] w-full overflow-hidden md:w-[100px]"
                                >
                                    <img
                                            src="{{ $post->getFirstMediaUrl(\App\Models\Post::HERO_IMAGE, 'thumb') }}"
                                            alt=""
                                            class="h-full w-full object-cover"
                                    />
                                </section>
                            @endif

                            <section class="flex-1">
                                <h2 class="font-serif font-bold">
                                    <a
                                            href="{{ route('blog.show', $post) }}"
                                            class="hover:underline"
                                    >
                                        {{ $post->title }}
                                    </a>
                                </h2>
                                <section class="text-right">
                                    {{ $post->user->name }}
                                    -
                                    {{ $post->released_at->diffForHumans() }}
                                </section>
                                <section class="flex flex-wrap justify-end gap-2">
                                    @foreach ($post->tags as $tag)
                                        <a
                                                href="{{ $tag->url }}"
                                                class="flex items-center gap-1 rounded px-2 py-1"
                                                style="
                                        color: {{ $tag->text_color }};
                                        background-color: {{ $tag->background_color }};
                                        border: 1px solid
                                            {{ $tag->border_color }};
                                    "
                                        >
                                            <img
                                                    class="h-6 w-6"
                                                    src="{{ asset('icons/' . $tag->logo) }}"
                                                    alt=""
                                            />
                                            {{ $tag->title }}
                                        </a>
                                    @endforeach
                                </section>
                            </section>
                        </section>
                        <section class="prose mt-2 w-full max-w-full font-serif">
                            {!! nl2br(Str::limit(explode('---', $post->description)[0], 200)) !!}
                            <a
                                    href="{{ route('blog.show', $post) }}"
                                    class="font-sans text-xs text-blue-600 no-underline hover:underline"
                            >
                                ({{ __('blog.continue-reading') }})
                            </a>
                        </section>
                    </article>
                @endforeach
            </section>

            <section class="mt-8">
                {{ $posts->links() }}
            </section>
        </x-layouts.partials.content-wrap>
</x-app-layout>
