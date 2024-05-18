<x-layouts.partials.content-wrap
    class="flex flex-col items-center justify-center"
>
    {{-- Hero Section --}}
    {{-- TODO --}}
    <section class="font-gradient">
        <H1 class="font-bold text-3xl">I like to learn new stuff. I also like to share knowledge.</H1>
    </section>
    {{-- Hero Section End --}}
    <hr class="w-full border-t-2 border-black my-2" />
    {{-- New Blog Posts Section --}}
    <section class="w-full text-left">
        <h2 class="font-gradient font-bold text-2xl">From my blog</h2>
        @if($newestPosts->isNotEmpty())
            <h3 class="font-gradient font-bold text-lg mt-4">Latest Posts</h3>
            <div class="grid sm:grid-cols-3 gap-4 mt-2">
                @foreach($newestPosts as $post)
                    <x-homepage.post :route="route('blog.show', [$post])">
                        {{ $post->title }}
                    </x-homepage.post>
                @endforeach
            </div>
        @endif

        @if($highlightedPosts->isNotEmpty())
            <h3 class="font-gradient font-bold text-lg mt-4">Highlighted</h3>
            <div class="grid sm:grid-cols-3 gap-4 mt-2">
                @foreach($highlightedPosts as $post)
                    <x-homepage.post :route="route('blog.show', [$post])">
                        {{ $post->title }}
                    </x-homepage.post>
                @endforeach
            </div>
        @endif

        @if($randomPosts->isNotEmpty())
            <h3 class="font-gradient font-bold text-lg mt-4">Randomly selected</h3>
            <div class="grid sm:grid-cols-3 gap-4 mt-2">
                @foreach($randomPosts as $post)
                    <x-homepage.post :route="route('blog.show', [$post])">
                        {{ $post->title }}
                    </x-homepage.post>
                @endforeach
            </div>
        @endif
    </section>
    {{-- New Blog Section End --}}

    {{-- New Video Section --}}
    @if($videos->isNotEmpty())
        <section>
            {{-- TODO: Newest Video --}}
            {{-- TODO: Random Video --}}
        </section>
    @endif
    {{-- New Video Section End --}}

    {{-- About Me Box --}}
    <h2 class="font-gradient font-bold text-2xl mt-16">About me</h2>
    <section
            class="my-4 flex flex-col items-center justify-center rounded bg-white lg:flex-row"
    >
        <div
                id="img-container"
                class="h-[200px] w-full max-w-[360px] overflow-hidden rounded-t shadow-lg lg:h-[500px] lg:rounded-l"
        >
            <picture alt="This is me" aria-label="This is me">
                <source
                        media="(min-width:1024px)"
                        srcset="{{ asset('img/danny.webp') }}"
                        type="image/webp"
                        class="main-img"
                        alt="This is me"
                        aria-label="This is me"
                />
                <source
                        media="(min-width:1024px)"
                        srcset="{{ asset('img/danny.jpg') }}"
                        type="image/jpeg"
                        class="main-img"
                        alt="This is me"
                        aria-label="This is me"
                />
                <source
                        media="(min-width:640px)"
                        srcset="{{ asset('img/danny-640.webp') }}"
                        type="image/webp"
                        class="main-img"
                        alt="This is me"
                        aria-label="This is me"
                />
                <source
                        media="(min-width:640px)"
                        srcset="{{ asset('img/danny-640.jpeg') }}"
                        type="image/jpeg"
                        class="main-img"
                        alt="This is me"
                        aria-label="This is me"
                />
                <source
                        srcset="{{ asset('img/danny-320.webp') }}"
                        type="image/webp"
                        class="main-img"
                        alt="This is me"
                        aria-label="This is me"
                />
                <img
                        src="{{ asset('img/danny-320.jpeg') }}"
                        type="image/jpeg"
                        class="main-img"
                        alt="This is me"
                        aria-label="This is me"
                />
            </picture>
        </div>
        <article
                class="relative flex max-w-[360px] flex-1 flex-col items-center justify-center gap-4 rounded-r p-4 font-serif shadow-lg sm:h-[500px] sm:max-h-[500px]"
        >
            <p class="w-full text-center text-lg">
                {{ __('homepage.me') }}
            </p>
            <p class="w-full text-left text-xl">
                {!! __('homepage.freelancer') !!}
            </p>
            <p class="w-full text-center text-2xl">
                {!! __('homepage.websites') !!}
            </p>
            <p class="w-full text-right">
                {!! __('homepage.nagasaki') !!}
            </p>

            {!! __('homepage.about') !!}
        </article>
    </section>
    {{-- About Me Box End --}}

    {{-- Using Box --}}
    <h2 class="font-gradient font-bold text-2xl mt-4">Technologies</h2>
    <section class="w-full">
        <h3 class="font-gradient font-bold text-lg mt-4">I actively use</h3>
        <ul class="w-full flex flex-wrap justify-center gap-6 my-2 p-4 bg-white shadow">
            <x-homepage.technology link="https://php.net/" title="PHP" :asset="asset('icons/php.svg')"/>
            <x-homepage.technology link="https://laravel.com/" title="Laravel" :asset="asset('icons/laravel.svg')"/>
            <x-homepage.technology link="https://livewire.laravel.com/" title="Laravel Livewire"
                                   :asset="asset('icons/livewire.svg')"/>
            <x-homepage.technology link="https://inertiajs.com/" title="InertiaJS" :asset="asset('icons/inertia.svg')"/>
            <x-homepage.technology link="https://go.dev/" title="Go" :asset="asset('icons/go.svg')"/>
            <x-homepage.technology link="#" title="JavaScript" :asset="asset('icons/javascript.svg')"/>
            <x-homepage.technology link="https://typescriptlang.com/" title="Typescript" :asset="asset('icons/typescript.svg')"/>
            <x-homepage.technology link="https://vuejs.org/" title="VueJS" :asset="asset('icons/vuejs.svg')"/>
            <x-homepage.technology link="https://alpinejs.dev/" title="AlpineJS" :asset="asset('icons/alpinejs.svg')"/>
            <x-homepage.technology link="https://sst.dev/" title="SST" :asset="asset('icons/sst.svg')"/>
            <x-homepage.technology link="https://nodejs.org/" title="NodeJS" :asset="asset('icons/nodedotjs.svg')"/>
        </ul>
        <h3 class="font-gradient font-bold text-lg mt-4">I've used and will use again</h3>
        <ul class="w-full flex flex-wrap justify-center gap-4 my-2 p-4 bg-white shadow">
            <x-homepage.technology link="https://dart.dev/" title="Dart" :asset="asset('icons/dart.svg')"/>
            <x-homepage.technology link="https://flutter.dev/" title="Flutter" :asset="asset('icons/flutter.svg')"/>
            <x-homepage.technology link="https://reactjs.org/" title="ReactJS" :asset="asset('icons/react.svg')"/>
            <x-homepage.technology link="https://electronjs.org/" title="ElectronJS" :asset="asset('icons/electron.svg')"/>
            <x-homepage.technology link="https://svelte.dev/" title="Svelte" :asset="asset('icons/svelte.svg')"/>
        </ul>
        <h3 class="font-gradient font-bold text-lg mt-4">I'm curious about</h3>
        <ul class="w-full flex flex-wrap justify-center gap-4 my-2 p-4 bg-white shadow">
            <x-homepage.technology link="https://rust-lang.org/" title="Rust" :asset="asset('icons/rust.svg')"/>
            <x-homepage.technology link="https://ocaml.org/" title="OCaml" :asset="asset('icons/ocaml.svg')"/>
            <x-homepage.technology link="https://ziglang.org/" title="ZIG" :asset="asset('icons/zig.svg')"/>
            <x-homepage.technology link="https://bun.sh/" title="Bun" :asset="asset('icons/bun.svg')"/>
            <x-homepage.technology link="https://deno.land/" title="Deno" :asset="asset('icons/deno.svg')"/>
            <x-homepage.technology link="https://solidjs.com/" title="SolidJS" :asset="asset('icons/solid.svg')"/>
            <x-homepage.technology link="https://openjdk.org/" title="Java (OpenJDK)" :asset="asset('icons/openjdk.svg')"/>
            <x-homepage.technology link="https://spring.io/projects/spring-boot/" title="Java Spring Boot" :asset="asset('icons/springboot.svg')"/>
            <x-homepage.technology link="https://kotlinlang.org/" title="Kotlin" :asset="asset('icons/kotlin.svg')"/>
            <x-homepage.technology link="https://learn.microsoft.com/en-us/dotnet/csharp/" title="C#" :asset="asset('icons/csharp.svg')"/>
            <x-homepage.technology link="https://dotnet.microsoft.com/en-us/" title=".NET" :asset="asset('icons/dotnet.svg')"/>
        </ul>
    </section>
</x-layouts.partials.content-wrap>

@push('metatags')
    {!! $metatags !!}
@endpush
