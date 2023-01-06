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
