<x-app-layout>
    <x-slot:title>{{ $post->title }}</x-slot>
    <x-layouts.partials.content-wrap>
        <article class="mx-auto max-w-7xl rounded bg-white shadow">
            @if ($post->hasMedia(\App\Models\Post::HERO_IMAGE))
                <section
                    id="hero-image"
                    class="max-h-[300px] w-full overflow-hidden rounded-t"
                >
                    <img
                        src="{{ $post->getFirstMediaUrl(\App\Models\Post::HERO_IMAGE) }}"
                        alt=""
                        class="h-full w-full"
                    />
                </section>
            @endif

            <h1 class="p-4 text-center font-serif text-4xl font-bold sm:p-8">
                <span
                    class="bg-gradient-to-br from-indigo-800 to-rose-800 bg-clip-text text-transparent"
                >
                    {{ $post->title }}
                </span>
            </h1>

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

        @pushonce('vite')
            @vite(['resources/js/shiki.js'])
        @endpushonce

        {{-- <script defer src="https://cdn.jsdelivr.net/npm/shiki"></script> --}}

        {{-- <script defer> --}}
        {{-- document.addEventListener('DOMContentLoaded', () => { --}}
        {{-- // console.log('do it'); --}}
        {{-- const elements = document.querySelectorAll("#post pre code"); --}}
        {{-- elements.forEach((element) => { --}}
        {{-- const language = element.className.match(/\s*language-(.*)\s*/) --}}
        {{-- console.log(language, typeof language, language !== null ? language[1] : 0); --}}
        {{-- shiki --}}
        {{-- .getHighlighter({ --}}
        {{-- theme: 'one-dark-pro', --}}
        {{-- }) --}}
        {{-- .then(highlighter => { --}}
        {{-- const code = highlighter.codeToHtml(element.innerText, { lang: language !== null ? language[1] ?? "html" : "html" }); --}}
        {{-- element.innerHTML = code; --}}
        {{-- }); --}}
        {{-- }) --}}
        {{-- }); --}}
        {{-- </script> --}}
    </x-layouts.partials.content-wrap>

    @push('metatags')
        {!! $metatags !!}
    @endpush
</x-app-layout>
