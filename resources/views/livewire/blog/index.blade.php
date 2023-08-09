<x-layouts.partials.content-wrap>
    <section class="mx-auto grid max-w-7xl gap-4 sm:grid-cols-4">
        <form
            wire:submit
            class="flex flex-col rounded bg-white p-4 shadow sm:col-span-3"
        >
            <section class="mb-2">
                <a
                    href="{{ route('blog.feed') }}"
                    class="flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                    </svg>

                    RSS Feed
                    <small>
                        (filter posts with
                        <em>?tag=Laravel</em>
                        , Pagination with ?page=2)
                    </small>
                </a>
            </section>

            <label class="flex items-center gap-4">
                Search:
                <input
                    type="text"
                    wire:model.live.debounce.500ms="search"
                    class="form-input w-full rounded"
                />
            </label>
        </form>
    </section>

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
