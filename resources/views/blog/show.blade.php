<x-app-layout>
    <x-slot:title>{{ __('Blog')  }}</x-slot:title>
    <x-layouts.partials.content-wrap>
        <article class="bg-white rounded max-w-7xl mx-auto shadow">
            @if($post->hasMedia(\App\Models\Post::HERO_IMAGE))
                <section id="hero-image" class="w-full max-h-[300px] overflow-hidden rounded-t">
                    <img src="{{ $post->getFirstMediaUrl(\App\Models\Post::HERO_IMAGE) }}"
                         alt=""
                         class="h-full w-full"
                    >
                </section>
            @endif

            <h1 class="text-4xl font-bold font-serif p-4 sm:p-8">
                {{ $post->title }}
            </h1>

            <section class="flex justify-end p-4 sm:p-8">
                {{ $post->user->name }}
                @if($post->released_at)
                    -
                    {{ $post->released_at->diffForHumans() }}
                @endif
            </section>

            @if($post->tags->isNotEmpty())
                <section class="flex flex-wrap gap-2 mb-4 p-4 sm:p-8">
                    @foreach($post->tags as $tag)
                        <div class="px-2 py-1 rounded flex items-center gap-1"
                             style="color: {{ $tag->text_color }}; background-color: {{ $tag->background_color }}; border: 1px solid {{ $tag->border_color }}">
                            <img class="h-6 w-6" src="{{ asset('icons/' . $tag->logo ) }}" alt="">
                            {{ $tag->title }}
                        </div>
                    @endforeach
                </section>
            @endif

            <div class="prose prose:text-base prose-pre:bg-white prose-pre:text-base font-serif min-w-full p-4 sm:p-8" id="post">
                {!! $post->description !!}
            </div>
        </article>

        <script defer src="https://cdn.jsdelivr.net/npm/shiki"></script>

        <script defer>
            document.addEventListener('DOMContentLoaded', () => {
                // console.log('do it');
                const elements = document.querySelectorAll("#post pre code");
                elements.forEach((element) => {
                    const language = element.className.match(/\s*language-(.*)\s*/)
                    console.log(language, typeof language, language !== null ? language[1] : 0);
                    shiki
                        .getHighlighter({
                            theme: 'one-dark-pro',
                        })
                        .then(highlighter => {
                            const code = highlighter.codeToHtml(element.innerText, { lang: language !== null ? language[1] ?? "html" : "html" });
                            element.innerHTML = code;
                        });
                })
            });
        </script>
    </x-layouts.partials.content-wrap>
</x-app-layout>
