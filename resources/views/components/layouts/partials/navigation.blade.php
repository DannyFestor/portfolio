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
     class="group fixed top-0 left-0 bottom-0 flex flex-col justify-between z-20 transition-all hover:w-[13rem] transition bg-gradient-to-r from-slate-200 via-transparent to-transparent hover:shadow hover:via-white hover:to-white"
     :class="$store.navigation.open ? 'w-[13rem] shadow via-white to-white' : 'w-[3rem] shadow-none via-transparent to-transparent'"
>
    <x-layouts.partials.navigation.logo/>

    <x-layouts.partials.navigation.links/>

    <x-layouts.partials.navigation.social/>
</nav>
