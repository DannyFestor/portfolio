<x-layouts.partials.content-wrap>
    <h1 class="mb-8 text-center font-serif text-5xl font-bold">
            <span
                class="bg-gradient-to-r from-indigo-800 to-rose-800 bg-clip-text text-transparent"
            >
                {{ $project->title }}
            </span>
    </h1>
    @if ($project->hasMedia(\App\Models\Project::PROJECT_IMAGE))
        <div
            class="mx-auto h-[400px] max-h-[400px] w-full max-w-2xl overflow-y-hidden"
        >
            <img
                src="{{ $project->getFirstMediaUrl(\App\Models\Project::PROJECT_IMAGE) }}"
                alt=""
                class="h-full w-full object-cover"
            />
        </div>
    @endif

    @if ($project->hasMedia(\App\Models\Project::PROJECT_IMAGES))
        <div
            id="previews"
            class="mx-auto my-8 flex flex-wrap justify-center gap-4"
        >
            @foreach ($project->getMedia(\App\Models\Project::PROJECT_IMAGES) as $image)
                <div>
                    <img
                        class="w-full max-w-[360px]"
                        src="{{ $image->getUrl() }}"
                        alt="{{ $project->title }} Preview {{ $loop->iteration }}"
                        data-src="{{ $image->getUrl() }}"
                    />
                </div>
            @endforeach
        </div>
    @endif

    <article
        class="mx-auto mt-8 max-w-xl rounded bg-white p-2 text-justify"
    >
        {{ $project->body }}
    </article>
    @if (isset($project->git_url))
        <a
            href="{{ $project->git_url }}"
            class="mx-auto mt-4 flex max-w-xl items-center gap-2 rounded bg-white p-2 hover:bg-gray-200"
        >
            <img src="{{ asset('icons/github.svg') }}" class="h-8 w-8" />
            Github
        </a>
    @endif

    @if (isset($project->live_url))
        <a
            href="{{ $project->live_url }}"
            class="mx-auto mt-4 flex max-w-xl items-center gap-2 rounded bg-white p-2 hover:bg-gray-200"
        >
            <img src="{{ asset('icons/live.svg') }}" class="h-8 w-8" />
            Live Demo
        </a>
    @endif

    <section
        class="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-between gap-2 rounded bg-white p-2"
    >
        @foreach ($project->tags as $tag)
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

    @pushonce('vite')
        @vite('resources/js/project-image.js')
    @endpushonce
</x-layouts.partials.content-wrap>

@pushonce('metatags')
    {!! $metatags !!}
@endpushonce
