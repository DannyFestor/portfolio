<x-layouts.partials.content-wrap>
    <section class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-8">
        @foreach($projects as $project)
            <article class="rounded-lg p-4 bg-white shadow-sm transition-all hover:scale-105 hover:shadow max-w-md flex flex-col">
                <h2 class="font-bold text-center">
                    {{ $project->title }}
                </h2>
                @if ($project->hasMedia('project-images'))
                <div>
                    <img src="{{ $project->getFirstMediaUrl('project-images', 'preview') }}" alt="">
                </div>
                @endif
                <p class="prose">
                    {{ $project->body }}
                </p>
                @if($project->git_url)
                    <a href="{{ $project->git_url }}">Github</a>
                @endif
                @if($project->live_url)
                    <a href="{{ $project->live_url }}">Live</a>
                @endif
            </article>
        @endforeach
    </section>
</x-layouts.partials.content-wrap>
