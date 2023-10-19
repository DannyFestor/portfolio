<x-layouts.partials.content-wrap>
    <section
        class="grid gap-2 sm:grid-cols-2 lg:gap-4 xl:grid-cols-3 2xl:gap-8"
    >
        @foreach ($projects as $project)
            <article
                class="flex flex-col items-center justify-start rounded border border-gray-200 bg-gradient-to-br from-white to-slate-100"
            >
                <h2 class="w-full font-bold">
                    <a
                        href="{{ route('project.show', ['locale' => $locale, 'project' => $project]) }}"
                        class="block w-full p-2 text-center hover:bg-slate-200"
                    >
                        {{ $project->title }}
                    </a>
                </h2>
                <div class="h-full max-h-[300px] w-full">
                    @if ($project->hasMedia(\App\Models\Project::PROJECT_IMAGE))
                        <a
                            href="{{ route('project.show', ['locale' => $locale, 'project' => $project]) }}"
                        >
                            <img
                                src="{{ $project->getFirstMediaUrl(\App\Models\Project::PROJECT_IMAGE, 'preview') }}"
                                alt=""
                                class="h-full w-full object-cover object-center"
                            />
                        </a>
                    @endif
                </div>
                <section class="p-2">
                    {{ $project->body }}
                    <a
                        href="{{ route('project.show', ['locale' => $locale, 'project' => $project]) }}"
                        class="hover:underline"
                    >
                        {{ __('project.view') }}
                    </a>
                </section>
                <section
                    class="flex flex-wrap items-center justify-start gap-2 p-2"
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
            </article>
        @endforeach
    </section>
</x-layouts.partials.content-wrap>
