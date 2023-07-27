<div
    x-data
    @click="$store.navigation.toggle()"
    id="hamburger"
    class="fixed bottom-8 right-8 z-50 flex cursor-pointer items-center rounded border border-slate-600 bg-white px-1 py-5 sm:hidden"
>
    <div
        id="hamburger-bars"
        class="relative flex w-8 items-center justify-center"
    >
        <span
            id="hamburger-bar-1"
            class="hamburger-bar absolute h-[3px] w-full bg-black transition-all"
            :class="$store.navigation.open ? 'translate-y-0 rotate-45' : '-translate-y-[0.55rem]'"
        ></span>
        <span
            id="hamburger-bar-2"
            class="hamburger-bar absolute h-[3px] w-full bg-black transition-all"
            :class="$store.navigation.open ? 'translate-x-2 opacity-0' : 'opacity-100'"
        ></span>
        <span
            id="hamburger-bar-3"
            class="hamburger-bar absolute h-[3px] w-full bg-black transition-all"
            :class="$store.navigation.open ? 'translate-y-0 -rotate-45' : 'translate-y-[0.55rem]'"
        ></span>
    </div>
</div>
