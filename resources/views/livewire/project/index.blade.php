<x-layouts.partials.content-wrap>
    <section class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-4 2xl:gap-8">
        @foreach($projects as $project)
            <div x-data="project"
                 @click="isOpen = true"
            >
                <div class="rounded max-h-64 cursor-pointer bg-white shadow">
                    <div class="p-4 text-center">
                        {{ $project->title }}
                    </div>

                    @if ($project->hasMedia('project-images'))
                        <img src="{{ $project->getFirstMediaUrl('project-images', 'preview') }}" alt=""
                             class="w-full object-cover rounded-b h-32">
                    @endif
                </div>
                <div class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 p-4"
                     x-show="isOpen"
                     x-cloak
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0 scale-90"
                     x-transition:enter-end="opacity-100 scale-100"
                     x-transition:leave="transition ease-in duration-300"
                     x-transition:leave-start="opacity-100 scale-100"
                     x-transition:leave-end="opacity-0 scale-90"
                     @click.stop="isOpen = false"
                >
                    <article
                        @click.stop
                        class="w-full rounded-lg p-4 bg-white shadow-sm max-w-md flex flex-col z-20 "
                    >
                        <h2 class="font-bold text-center">
                            {{ $project->title }}
                        </h2>
                        @if ($project->hasMedia('project-images'))
                            <div :class="isOpen ? 'relative' : 'absolute'">
                                <img src="{{ $project->getFirstMediaUrl('project-images', 'preview') }}" alt=""
                                     class="w-full max-h-96">
                            </div>
                        @endif
                        <p class="prose">
                            {{ $project->body }}
                        </p>

                        <div class="grid grid-cols-2 w-full">
                            @if($project->git_url)
                                <a href="{{ $project->git_url }}"
                                   class="flex items-center gap-2 rounded hover:bg-black hover:bg-opacity-20 p-2">
                                    <img src="{{ asset('icons/github.svg') }}" class="w-8 h-8">
                                    Github
                                </a>
                            @else
                                <div></div>
                            @endif
                            @if($project->live_url)
                                <a href="{{ $project->live_url }}"
                                   class="flex items-center gap-2 rounded hover:bg-black hover:bg-opacity-20 p-2">
                                    <img src="{{ asset('icons/live.svg') }}" class="w-8 h-8">
                                    Live
                                </a>
                            @else
                                <div></div>
                            @endif
                        </div>
                    </article>
                </div>
            </div>
        @endforeach
    </section>
</x-layouts.partials.content-wrap>

@pushonce('scripts')
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('project', () => ({
                isOpen: false,
            }));
        });
    </script>
@endpushonce
