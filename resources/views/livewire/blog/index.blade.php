<x-layouts.partials.content-wrap>
    <section x-data="{
                search: $wire.entangle('search'),
                selectedTags: $wire.entangle('selectedTags'),

                addTag(title) {
                    if (!this.selectedTags.includes(title)) {
                        this.selectedTags.push(title);
                    }
                },

                removeTitle(title) {
                    this.selectedTags = this.selectedTags.filter(tag => tag !== title);
                },

                onSubmit() {
                    console.log('submit', this.search);
                },
            }" class="grid sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <form @submit.prevent
              class="flex flex-col bg-white shadow rounded p-4 sm:col-span-3">

            <section class="mb-2">
                <a href="{{ route('blog.feed') }}" class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    RSS Feed <small>(filter posts with <em>?tag=Laravel</em>, Pagination with ?page=2)</small>
                </a>
            </section>

            <label class="flex items-center gap-4">
                Search:
                <input type="text"
                       x-model.debounce.500ms="search"
                       class="form-input rounded w-full"
                >
            </label>

            <section class="flex flex-wrap gap-2 mt-2">
                @foreach($tags->filter(fn (\App\Models\Tag $tag) => in_array($tag->title, $selectedTags)) as $tag)
                    <div @click="removeTitle('{{ $tag->title }}')"
                         class="px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                         style="color: {{ $tag->text_color }}; background-color: {{ $tag->background_color }}; border: 1px solid {{ $tag->border_color }}">
                        <img class="h-6 w-6" src="{{ asset('icons/' . $tag->logo ) }}" alt="">
                        {{ $tag->title }}
                    </div>
                @endforeach
            </section>
        </form>

        <aside class="flex flex-col gap-1 overflow-y-scroll max-h-32 p-2 rounded shadow bg-white">
            @foreach($tags->filter(fn (\App\Models\Tag $tag) => !in_array($tag->title, $selectedTags)) as $tag)
                <div @click="addTag('{{ $tag->title }}')" class="px-2 py-1 rounded flex items-center gap-1 cursor-pointer"
                     style="color: {{ $tag->text_color }}; background-color: {{ $tag->background_color }}; border: 1px solid {{ $tag->border_color }}">
                    <img class="h-6 w-6" src="{{ asset('icons/' . $tag->logo ) }}" alt="">
                    {{ $tag->title }}
                </div>
            @endforeach
        </aside>
    </section>



    <section id="posts" class="flex flex-col gap-4 mt-8 max-w-7xl mx-auto">
    @foreach($posts as $post)
        <article class="flex flex-col bg-white p-4 rounded shadow" role="article">
            <section class="flex flex-row items-center gap-2">
                @if($post->hasMedia(\App\Models\Post::HERO_IMAGE))
                    <section class="h-[100px] w-[100px] overflow-hidden">
                        <img src="{{ $post->getFirstMediaUrl(\App\Models\Post::HERO_IMAGE, 'thumb') }}" alt="" class="w-full h-full object-cover">
                    </section>
                @endif
                <section>
                    <h2 class="font-bold font-serif">
                        <a href="{{ route('blog.show', $post) }}" class="hover:underline">
                            {{ $post->title }}
                        </a>
                    </h2>
                    <section>
                        {{ $post->user->name }}
                        -
                        {{ $post->released_at->diffForHumans() }}
                    </section>
                    <section class="flex flex-wrap justify-end gap-2">
                        @foreach($post->tags as $tag)
                            <div class="px-2 py-1 rounded flex items-center gap-1" style="color: {{ $tag->text_color }}; background-color: {{ $tag->background_color }}; border: 1px solid {{ $tag->border_color }}">
                                <img class="h-6 w-6" src="{{ asset('icons/' . $tag->logo ) }}" alt="">
                                {{ $tag->title }}
                            </div>
                        @endforeach
                    </section>
                </section>
            </section>
            <section class="mt-2 prose font-serif">
                {!! nl2br(Str::limit(explode('---', $post->description)[0], 200)) !!} <a href="{{ route('blog.show', $post) }}" class="text-xs text-blue-600 font-sans no-underline hover:underline">(... Continue Reading)</a>
            </section>
        </article>
    @endforeach
    </section>

    <section class="mt-8">
        {{ $posts->links() }}
    </section>
</x-layouts.partials.content-wrap>
