<x-app-layout>
    <x-slot:title>{{ __('Projects')  }}</x-slot:title>

    <x-layouts.partials.content-wrap>
        <section class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4 2xl:gap-8">
            @foreach($projects as $project)
                <a href="{{ route('project.show', $project) }}"
                    class="flex flex-col justify-center items-center border border-gray-400 bg-gradient-to-br from-white to-slate-100 rounded">
                    <h2 class="font-bold p-2">{{ $project->title }}</h2>
                    <div class="w-full h-full max-h-[300px]">
                        @if($project->hasMedia(\App\Models\Project::COLLECTION))
                            <img src="{{ $project->getFirstMediaUrl(\App\Models\Project::COLLECTION, 'preview') }}"
                                 alt="" class="w-full h-full object-cover object-center">
                        @endif
                    </div>
                    <article class="p-2">
                        {{ $project->body }} {{ __('project.view') }}
                    </article>
                </a>
            @endforeach
        </section>
    </x-layouts.partials.content-wrap>
</x-app-layout>
