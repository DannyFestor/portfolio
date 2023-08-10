<x-app-layout>
    <x-slot:title>{{ __('Blog') }}</x-slot>
        <x-layouts.partials.content-wrap>
            <livewire:blog.search/>

            <h1 class="font-bold font-serif text-center text-xl">Latest Posts</h1>

            <section class="w-full mt-8 flex flex-col lg:flex-row gap-2">
                <aside class="flex flex-col gap-2 order-1 lg:order-2 w-full lg:w-[150px] p-2 rounded bg-white">
                    <div x-data="{ collapsed: true }" class="flex flex-col gap-4">
                        <div @click="collapsed = !collapsed" class="flex w-full justify-between lg:hidden">
                            <div>Filterable Tags</div>
                            <div x-cloak x-show="!collapsed">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </div>
                            <div x-cloak x-show="collapsed">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5"
                                     stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                                </svg>
                            </div>
                        </div>
                        <div class="flex-row flex-wrap lg:flex lg:flex-col gap-2"
                             :class="collapsed ? 'hidden' : 'flex'"
                        >
                            <a href="{{ route('blog.index', ['search' => $search]) }}"
                               class="flex items-center gap-1 rounded px-2 py-1"
                               style="color: black;border: 1px solid black;">
                                All
                            </a>
                            @foreach($tags as $tag)
                                <a href="{{ route('blog.index', ['search' => $search, 'tag' => $tag['title']]) }}"
                                   class="flex items-center gap-1 rounded px-2 py-1"
                                   style="color: {{ $tag['text_color'] }};border: 1px solid {{ $tag['border_color'] }};background-color: {{ $tag['background_color'] }}">
                                    <img src="{{ asset('icons/' . $tag['logo']) }}" alt="{{ $tag['title'] }}"
                                         class="h-4 w-4">
                                    {{ $tag['title'] }}
                                </a>
                            @endforeach
                        </div>
                    </div>
                </aside>

                <section id="posts" class="mx-auto flex flex-1 w-full max-w-7xl flex-col gap-4 order-2 lg:order-1">
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
                                @if($post->synopsis)
                                    {!! nl2br($post->synopsis) !!}
                                @else
                                    {!! nl2br(Str::limit(explode('---', $post->description)[0], 200)) !!}
                                @endif
                                <p>
                                    <a
                                            href="{{ route('blog.show', $post) }}"
                                            class="font-sans text-xs text-blue-600 no-underline hover:underline"
                                    >
                                        ({{ __('blog.continue-reading') }})
                                    </a>
                                </p>
                            </section>
                        </article>
                    @endforeach
                </section>
            </section>

            <section class="mt-8">
                {{ $posts->links() }}
            </section>
        </x-layouts.partials.content-wrap>
</x-app-layout>
