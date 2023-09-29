<x-layouts.partials.content-wrap>
    <article
        class="mx-auto max-w-7xl rounded bg-gradient-to-br from-slate-50 via-white to-slate-50 shadow"
    >
        @if ($post->hasMedia(\App\Models\Post::HERO_IMAGE))
            <section
                id="hero-image"
                class="max-h-[300px] w-full overflow-hidden rounded-t"
            >
                {{ $post->getFirstMedia(\App\Models\Post::HERO_IMAGE) }}
                {{-- <img --}}
                {{-- src="{{ $post->getFirstMediaUrl(\App\Models\Post::HERO_IMAGE) }}" --}}
                {{-- alt="" --}}
                {{-- class="h-full w-full" --}}
                {{-- /> --}}
            </section>
        @endif

        <div
            class="bg-gradient-to-br from-indigo-800 to-rose-800 bg-clip-text p-4 text-center font-serif font-bold text-transparent sm:p-8"
        >
            <h1 class="text-4xl">
                {{ $post->title }}
            </h1>
            @if ($post->subtitle)
                <h2 class="text-2xl">
                    {{ $post->subtitle }}
                </h2>
            @endif
        </div>

        <section class="flex justify-end p-4 sm:p-8">
            {{ $post->user->name }}
            @if ($post->released_at)
                -
                {{ $post->released_at->diffForHumans() }}
            @endif
        </section>

        @if ($post->tags->isNotEmpty())
            <section class="mb-4 flex flex-wrap gap-2 p-4 sm:p-8">
                @foreach ($post->tags as $tag)
                    <a
                        href="{{ $tag->url }}"
                        class="flex items-center gap-1 rounded px-2 py-1"
                        style="
                                color: {{ $tag->text_color }};
                                background-color: {{ $tag->background_color }};
                                border: 1px solid {{ $tag->border_color }};
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
        @endif

        <div
            class="prose:text-base prose min-w-full p-4 font-serif prose-pre:bg-white prose-pre:text-base sm:p-8"
            id="post"
        >
            {!! $post->description !!}
        </div>
    </article>

</x-layouts.partials.content-wrap>

@push('metatags')
    {!! $metatags !!}
@endpush

@push('vite')
    @vite(['resources/js/post-image.js'])
@endpush

@pushonce('vite')
    @vite(['resources/js/shiki.js'])
@endpushonce

