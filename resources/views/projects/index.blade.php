<x-app-layout>
    <x-slot:title>{{ __('Projects')  }}</x-slot:title>

    <x-layouts.partials.content-wrap>
        <section class="grid sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4 2xl:gap-8">
            @foreach($projects as $project)
                <article
                    class="flex flex-col justify-start items-center border border-gray-200 bg-gradient-to-br from-white to-slate-100 rounded">
                    <h2 class="font-bold w-full">
                        <a href="{{ route('project.show', $project) }}"
                           class="p-2 w-full text-center block hover:bg-slate-200">{{ $project->title }}</a>
                    </h2>
                    <div class="w-full h-full max-h-[300px]">
                        @if($project->hasMedia(\App\Models\Project::COLLECTION))
                            <a href="{{ route('project.show', $project) }}">
                                <img src="{{ $project->getFirstMediaUrl(\App\Models\Project::COLLECTION, 'preview') }}"
                                     alt="" class="w-full h-full object-cover object-center">
                            </a>
                        @endif
                    </div>
                    <section class="p-2">
                        {{ $project->body }}
                        <a href="{{ route('project.show', $project) }}" class="hover:underline">{{ __('project.view') }}</a>
                    </section>
                    <section class="flex flex-wrap justify-start items-center gap-2 p-2">
                        @foreach($project->tags as $tag)
                            <a href="{{ $tag->url }}" class="px-2 py-1 rounded flex items-center gap-1"
                               style="color: {{ $tag->text_color }}; background-color: {{ $tag->background_color }}; border: 1px solid {{ $tag->border_color }}">
                                <img class="h-6 w-6" src="{{ asset('icons/' . $tag->logo ) }}" alt="">
                                {{ $tag->title }}
                            </a>
                        @endforeach
                    </section>
                </article>
            @endforeach
        </section>
    </x-layouts.partials.content-wrap>
</x-app-layout>
