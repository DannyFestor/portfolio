<div x-data
     id="backdrop"
     x-show="$store.navigation.open"
     @click="$store.navigation.close()"
     class="fixed sm:hidden z-10 inset-0 bg-black bg-opacity-30"
     x-transition:enter="transition ease-out duration-200"
     x-transition:enter-start="opacity-0"
     x-transition:enter-end="opacity-100"
     x-transition:leave="transition ease-in duration-200"
     x-transition:leave-start="opacity-100"
     x-transition:leave-end="opacity-0"
></div>
<nav x-data
     id="navigation"
     class="group fixed top-0 left-0 bottom-0 flex flex-col justify-between z-20 transition-all w-[3rem] hover:w-[13rem] transition bg-gradient-to-r from-slate-200 via-transparent to-transparent hover:shadow hover:via-white hover:to-white"
     :class="$store.navigation.open ? 'w-[13rem] shadow via-white to-white' : 'w-[3rem] shadow-none via-transparent to-transparent'"
>
    <x-layouts.partials.navigation.logo />

    <section id="nav-links">
        @if(Route::is('admin.*'))
            ADMIN
        @endif
        <x-layouts.partials.navigation.link href="{{ route('home.ger') }}" label="Homepage" aria-label="Homepage">
            <x-slot:icon>
                <path stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </x-slot:icon>
            About
        </x-layouts.partials.navigation.link>
        <x-layouts.partials.navigation.link href="{{ route('blog.index') }}" label="Blog" aria-label="Blog">
            <x-slot:icon>
                <path
                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                />
            </x-slot:icon>
            Blog
        </x-layouts.partials.navigation.link>
        <x-layouts.partials.navigation.link href="/projects"
                                            label="Projects I am or have been involved with"
                                            aria-label="Projects I am or have been involved with"
        >
            <x-slot:icon>
                <path
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2" />
            </x-slot:icon>
            Projects
        </x-layouts.partials.navigation.link>
{{--        <x-layouts.partials.navigation.link href="/cv"--}}
{{--                                            label="My CV for your Database"--}}
{{--                                            aria-label="My CV for your Database"--}}
{{--        >--}}
{{--            <x-slot:icon>--}}
{{--                <path--}}
{{--                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"--}}
{{--                    stroke-linecap="round"--}}
{{--                    stroke-linejoin="round"--}}
{{--                    stroke-width="2" />--}}
{{--            </x-slot:icon>--}}
{{--            CV--}}
{{--        </x-layouts.partials.navigation.link>--}}
        <x-layouts.partials.navigation.link href="/contact"
                                            label="Don't hesitate to contact me"
                                            aria-label="Don't hesitate to contact me"
        >
            <x-slot:icon>
                <path
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2" />
            </x-slot:icon>
            Contact
        </x-layouts.partials.navigation.link>
        {{--        <!-- <a class="nav-link" href="/ja" hash="#about" label="日本語版に変更">--}}
        {{--              <svg--}}
        {{--                xmlns="http://www.w3.org/2000/svg"--}}
        {{--                viewBox="0 0 900 600"--}}
        {{--              >--}}
        {{--                <rect fill="#fff" height="600" width="900" />--}}
        {{--                <circle fill="#bc002d" cx="450" cy="300" r="180" />--}}
        {{--              </svg>--}}

        {{--              <div>日本語</div>--}}
        {{--            </a> -->--}}
    </section>

    <section class="flex flex-wrap justify-center items-center group-hover:gap-4 p-2 h-18 w-full"
             :class="$store.navigation.open ? 'gap-4' : 'gap-0.5'"
    >
        <a href="https://github.com/DannyFestor" target="_blank"
           class="group-hover:h-8 group-hover:w-8 transition-all"
          :class="$store.navigation.open ? 'h-8 w-8' : 'h-2 w-2'"
        >
            <svg role="img"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-full w-full transition-all hover:fill-[#181717]"
            >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/danny-festor" target="_blank"
           class="group-hover:h-8 group-hover:w-8 transition-all"
          :class="$store.navigation.open ? 'h-8 w-8' : 'h-2 w-2'"
        >
            <svg role="img"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-full w-full transition-all hover:fill-[#0A66C2]"
            >
                <title>LinkedIn</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://twitter.com/Denakino" target="_blank"
           class="group-hover:h-8 group-hover:w-8 transition-all"
          :class="$store.navigation.open ? 'h-8 w-8' : 'h-2 w-2'"
        >
            <svg role="img"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-full w-full transition-all hover:fill-[#1DA1F2]"
            >
                <title>Twitter</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        </a>
        <a href="https://ruhr.social/@denakino" target="_blank"
           class="group-hover:h-8 group-hover:w-8 transition-all"
          :class="$store.navigation.open ? 'h-8 w-8' : 'h-2 w-2'"
        >
            <svg role="img"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-full w-full transition-all hover:fill-[#6364FF]"
            >
                <title>Mastodon</title>
                <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
            </svg>
        </a>
        <a href="https://www.youtube.com/@denakino" target="_blank"
           class="group-hover:h-8 group-hover:w-8 transition-all"
          :class="$store.navigation.open ? 'h-8 w-8' : 'h-2 w-2'"
        >
            <svg role="img"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-full w-full transition-all hover:fill-[#FF0000]"
            >
                <title>YouTube</title>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
        </a>
        <a href="https://www.twitch.tv/danakino" target="_blank"
           class="group-hover:h-8 group-hover:w-8 transition-all"
          :class="$store.navigation.open ? 'h-8 w-8' : 'h-2 w-2'"
        >
            <svg role="img"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-full w-full transition-all hover:fill-[#9146FF]"
            >
                <title>Twitch</title>
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
            </svg>
        </a>
    </section>
</nav>
