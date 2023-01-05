<x-layouts.partials.content-wrap>
    <form x-data="{
            search: $wire.entangle('search'),
            onSubmit() {
                console.log('submit', this.search);
            },
        }"
          @submit.prevent
          class="flex flex-col bg-white shadow rounded max-w-4xl mx-auto p-4">
        <label class="flex items-center gap-4">
            Search:
            <input type="text"
                   x-model.debounce.500ms="search"
                   class="form-input rounded w-full"
            >
        </label>

        {{ $search }}
    </form>

    <section id="posts" class="flex flex-col gap-4 mt-8 max-w-4xl mx-auto">
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
