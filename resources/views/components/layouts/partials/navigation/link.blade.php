<a class="nav-link flex justify-start items-center p-1 min-h-[2rem] transition-all hover:bg-slate-300"
   {{ $attributes->merge() }}
>
    <svg class="h-8 w-8 flex-shrink-0"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         stroke-width="2">
        {{ $icon }}
    </svg>
    <div x-data
         class="group-hover:visible transition-opacity group-hover:opacity-100 group-hover:ml-4 group-hover:h-full group-hover:w-auto overflow-hidden flex items-center"
         :class="$store.navigation.open ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
    >
        {{ $slot }}
    </div>
</a>
