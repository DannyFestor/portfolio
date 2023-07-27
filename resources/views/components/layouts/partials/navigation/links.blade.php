<section id="nav-links" class="relative">
    <section
        class="absolute -translate-y-1/2 group-hover:w-[13rem]"
        :class="$store.navigation.open ? 'w-[13rem]' : 'w-[3rem]'"
    >
        @if (Route::is('admin.*'))
            ADMIN
        @endif

        <x-layouts.partials.navigation.link
            href="{{ route('home') }}"
            label="Homepage"
            aria-label="Homepage"
        >
            <x-slot:icon>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </x-slot>
            About
        </x-layouts.partials.navigation.link>
        <x-layouts.partials.navigation.link
            href="{{ route('blog.index') }}"
            label="Blog"
            aria-label="Blog"
        >
            <x-slot:icon>
                <path
                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                />
            </x-slot>
            Blog
        </x-layouts.partials.navigation.link>
        <x-layouts.partials.navigation.link
            href="{{ route('project.index') }}"
            label="Projects I am or have been involved with"
            aria-label="Projects I am or have been involved with"
        >
            <x-slot:icon>
                <path
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                />
            </x-slot>
            Projects
        </x-layouts.partials.navigation.link>
        <x-layouts.partials.navigation.link
            href="/contact"
            label="Don't hesitate to contact me"
            aria-label="Don't hesitate to contact me"
        >
            <x-slot:icon>
                <path
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                />
            </x-slot>
            Contact
        </x-layouts.partials.navigation.link>

        <x-layouts.partials.navigation.language-select />
    </section>
</section>
