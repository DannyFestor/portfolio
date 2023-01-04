<div x-data
     id="backdrop"
     x-show="$store.navigation.open"
     @click="$store.navigation.close()"
     class="fixed z-10 inset-0 bg-black bg-opacity-30"
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

{{--    <section id="nav-links">--}}
{{--        <a class="nav-link" href="/" label="Homepage">--}}
{{--            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">--}}
{{--                <path stroke-linecap="round" stroke-linejoin="round"--}}
{{--                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />--}}
{{--            </svg>--}}
{{--            <div>About</div>--}}
{{--        </a>--}}
{{--        <a class="nav-link" href="/blog" label="I'll write about what interests me">--}}
{{--            <svg class="h-8 w-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"--}}
{{--                 xmlns="http://www.w3.org/2000/svg">--}}
{{--                <path--}}
{{--                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"--}}
{{--                    stroke-linecap="round"--}}
{{--                    stroke-linejoin="round"--}}
{{--                    stroke-width="2"--}}
{{--                />--}}
{{--            </svg>--}}
{{--            <div>Blog</div>--}}
{{--        </a>--}}
{{--        <a class="nav-link" href="/projects" label="Projects I am or have been involved with">--}}
{{--            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">--}}
{{--                <path--}}
{{--                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"--}}
{{--                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />--}}
{{--            </svg>--}}
{{--            <div>Projects</div>--}}
{{--        </a>--}}
{{--        <a class="nav-link" href="/cv" label="If you need my CV for your Database...">--}}
{{--            <svg class="h-8 w-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"--}}
{{--                 xmlns="http://www.w3.org/2000/svg">--}}
{{--                <path--}}
{{--                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"--}}
{{--                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />--}}
{{--            </svg>--}}
{{--            <div>CV</div>--}}
{{--        </a>--}}
{{--        <a class="nav-link" href="/contact" label="Don't hesitate to contact me">--}}
{{--            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">--}}
{{--                <path--}}
{{--                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"--}}
{{--                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />--}}
{{--            </svg>--}}
{{--            <div>Contact</div>--}}
{{--        </a>--}}
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

    <section>
        Footer
    </section>
</nav>
