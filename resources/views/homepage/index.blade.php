<x-app-layout>
    <x-slot:title>
        {{ __('homepage.title') }}
    </x-slot>

    <x-layouts.partials.content-wrap
        class="flex flex-col items-center justify-center"
    >
        <div
            class="mb-4 flex flex-col items-center justify-center rounded bg-white sm:mb-8 sm:mt-8 md:mb-16 md:mt-16 lg:mb-32 lg:mt-32 lg:flex-row"
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
                <h2 class="w-full text-left text-xl">
                    {!! __('homepage.freelancer') !!}
                </h2>
                <h1 class="w-full text-center text-2xl">
                    {!! __('homepage.websites') !!}
                </h1>
                <h3 class="w-full text-right">
                    {!! __('homepage.nagasaki') !!}
                </h3>

                <p class="icons mt-12 flex h-16 w-full justify-between gap-2">
                    <a
                        href="https://go.dev/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/go.svg') }}"
                            alt="GO"
                            aria-label="GO"
                            title="GO"
                        />
                    </a>
                    <a
                        href="https://www.php.net/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/php.svg') }}"
                            alt="PHP"
                            aria-label="PHP"
                            title="PHP"
                        />
                    </a>
                    <a
                        href="https://laravel.com/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/laravel.svg') }}"
                            alt="Laravel"
                            aria-label="Laravel"
                            title="Laravel"
                        />
                    </a>
                    <a
                        href="https://laravel-livewire.com/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/livewire.svg') }}"
                            alt="Livewire"
                            aria-label="Livewire"
                            title="Livewire"
                        />
                    </a>
                    <a
                        href="https://inertiajs.com/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/inertia.svg') }}"
                            alt="Inertia.js"
                            aria-label="Inertia.js"
                            title="Inertia.js"
                        />
                    </a>
                </p>

                <p class="icons flex h-16 w-full justify-between gap-2">
                    <a href="#" class="flex w-1/5 items-center justify-center">
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/javascript.svg') }}"
                            alt="JavaScript"
                            aria-label="JavaScript"
                            title="JavaScript"
                        />
                    </a>
                    <a
                        href="https://www.typescriptlang.org/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/typescript.svg') }}"
                            alt="TypeScript"
                            aria-label="TypeScript"
                            title="TypeScript"
                        />
                    </a>
                    <a
                        href="https://vuejs.org/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/vuejs.svg') }}"
                            alt="Vue.js"
                            aria-label="Vue.js"
                            title="Vue.js"
                        />
                    </a>
                    <a
                        href="https://alpinejs.dev/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/alpinejs.svg') }}"
                            alt="Alpine.js"
                            aria-label="Alpine.js"
                            title="Alpine.js"
                        />
                    </a>
                    <a
                        href="https://flutter.dev/"
                        class="flex w-1/5 items-center justify-center"
                    >
                        <img
                            class="max-w-12 w-[100%] w-full"
                            src="{{ asset('icons/flutter.svg') }}"
                            alt="Flutter"
                            aria-label="Flutter"
                            title="Flutter"
                        />
                    </a>
                </p>

                <p id="cv" class="mt-8 flex flex-wrap">
                    <span class="flex items-center gap-4">
                        Download my CV 履歴書
                    </span>
                    <span class="ml-auto flex items-center gap-4">
                        <a href="{{ asset('cv/[GER]-2022-12-15.pdf') }}">
                            <img
                                class="h-8 w-8"
                                src="{{ asset('flags/de.svg') }}"
                                alt="German CV"
                                aria-label="German CV"
                                title="German CV"
                            />
                        </a>
                        <a href="{{ asset('cv/[ENG]-2022-12-15.pdf') }}">
                            <img
                                class="h-8 w-8"
                                src="{{ asset('flags/us.svg') }}"
                                alt="English CV"
                                aria-label="English CV"
                                title="English CV"
                            />
                        </a>
                        <a href="{{ asset('cv/[JAP]-2022-12-15.pdf') }}">
                            <img
                                class="h-8 w-8"
                                src="{{ asset('flags/jp.svg') }}"
                                alt="Japanese CV"
                                aria-label="German CV"
                                title="German CV"
                            />
                        </a>
                    </span>
                </p>
            </article>
        </div>

        {!! __('homepage.about') !!}

        @push('metatags')
            {!! $metatags !!}
        @endpush
    </x-layouts.partials.content-wrap>
</x-app-layout>
