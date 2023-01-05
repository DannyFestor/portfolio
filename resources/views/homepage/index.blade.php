<x-app-layout>
    <x-slot:title>{{ __('Moderne, sichere Webseiten und Services')  }}</x-slot:title>
    <x-slot:main_classes></x-slot:main_classes>

    <x-layouts.partials.content-wrap class="flex flex-col items-center justify-center">
        <div class="bg-white rounded flex flex-col sm:flex-row justify-center items-center h-full">
            <div id="img-container"
                 class="h-[200px] sm:h-[500px] w-full max-w-[360px] overflow-hidden rounded-t sm:rounded-l shadow-lg"
            >
                <img src="{{ asset('img/danny.jpg') }}"
                     alt="This is me"
                     aria-label="This is me"
                     class="-translate-y-[60px] sm:translate-y-0 sm:object-cover sm:h-full sm:w-auto"
                >
            </div>
            <article
                class="font-serif relative flex flex-1 flex-col items-center justify-center gap-4 max-w-[360px] sm:h-[500px] sm:max-h-[500px] p-4 rounded-r shadow-lg">
                <p class="text-lg text-center w-full">{{ __('Hi, ich bin Danny!') }}</p>
                <h2 class="text-xl text-left w-full">
                    {!! __('Ich bin <em>Freelancer</em>.') !!}
                </h2>
                <h1 class="text-2xl text-center w-full">
                    {!! __('Ich erstelle <strong>moderne Webseiten</strong>.') !!}
                </h1>
                <h3 class="text-right w-full">{!! __('Ich lebe in <em>Nagasaki, Japan</em>.') !!}</h3>

                <p class="icons flex gap-2 justify-between mt-12">
                    <a href="https://go.dev/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/go.svg') }}" alt="GO" aria-label="GO"
                             title="GO">
                    </a>
                    <a href="https://www.php.net/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/php.svg') }}" alt="PHP" aria-label="PHP"
                             title="PHP">
                    </a>
                    <a href="https://laravel.com/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/laravel.svg') }}" alt="Laravel"
                             aria-label="Laravel" title="Laravel">
                    </a>
                    <a href="https://laravel-livewire.com/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/livewire.svg') }}" alt="Livewire"
                             aria-label="Livewire" title="Livewire">
                    </a>
                    <a href="https://inertiajs.com/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/inertia.svg') }}" alt="Inertia.js"
                             aria-label="Inertia.js" title="Inertia.js">
                    </a>
                </p>

                <p class="icons flex gap-2 justify-between">
                    <a href="#" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/javascript.svg') }}" alt="JavaScript"
                             aria-label="JavaScript" title="JavaScript">
                    </a>
                    <a href="https://www.typescriptlang.org/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/typescript.svg') }}" alt="TypeScript"
                             aria-label="TypeScript" title="TypeScript">
                    </a>
                    <a href="https://vuejs.org/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/vuejs.svg') }}" alt="Vue.js"
                             aria-label="Vue.js"
                             title="Vue.js">
                    </a>
                    <a href="https://alpinejs.dev/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/alpinejs.svg') }}" alt="Alpine.js"
                             aria-label="Alpine.js" title="Alpine.js">
                    </a>
                    <a href="https://flutter.dev/" class="w-1/5 flex justify-center items-center">
                        <img class="w-[100%] max-w-12" src="{{ asset('icons/flutter.svg') }}" alt="Flutter"
                             aria-label="Flutter" title="Flutter">
                    </a>
                </p>

                <p id="cv" class="mt-8 flex flex-wrap">
                    <span class="flex gap-4 items-center">Download my CV 履歴書</span>
                    <span class="flex gap-4 items-center ml-auto">
                    <a href="{{ asset('cv/[GER]-2022-12-15.pdf') }}">
                        <img class="h-8 w-8" src="{{ asset('flags/de.svg') }}" alt="German CV" aria-label="German CV"
                             title="German CV">
                    </a>
                    <a href="{{ asset('cv/[ENG]-2022-12-15.pdf') }}">
                        <img class="h-8 w-8" src="{{ asset('flags/us.svg') }}" alt="English CV" aria-label="English CV"
                             title="English CV">
                    </a>
                    <a href="{{ asset('cv/[JAP]-2022-12-15.pdf') }}">
                        <img class="h-8 w-8" src="{{ asset('flags/jp.svg') }}" alt="Japanese CV" aria-label="German CV"
                             title="German CV">
                    </a>
                </span>
                </p>
            </article>
        </div>
    </x-layouts.partials.content-wrap>
</x-app-layout>
