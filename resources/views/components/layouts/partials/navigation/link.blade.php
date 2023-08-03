<a x-data="{ isVisible: true }"
   x-modelable="isVisible"
   class="nav-link flex min-h-[2rem] items-center justify-start p-1 transition-all hover:bg-slate-300"
   {{ $attributes->merge() }}
   wire:navigate
>
    <svg
        class="h-8 w-8 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
    >
        {{ $icon }}
    </svg>
    <div
        class="flex items-center overflow-hidden transition-opacity group-hover:visible group-hover:ml-4 group-hover:h-full group-hover:w-auto group-hover:opacity-100"
        :class="isVisible ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
    >
        {{ $slot }}
    </div>
</a>
