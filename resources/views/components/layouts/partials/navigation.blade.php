<div
    x-data
    id="backdrop"
    x-show="$store.navigation.open"
    @click="$store.navigation.close()"
    class="fixed inset-0 z-10 bg-black bg-opacity-30 sm:hidden"
    x-transition:enter="transition duration-200 ease-out"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition duration-200 ease-in"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
></div>
<nav
    x-data
    id="navigation"
    class="group fixed bottom-0 left-0 top-0 z-20 flex flex-col justify-between bg-gradient-to-r from-slate-200 via-transparent to-transparent transition transition-all hover:w-[13rem] hover:via-white hover:to-white hover:shadow"
    :class="$store.navigation.open ? 'w-[13rem] shadow via-white to-white' : 'w-[3rem] shadow-none via-transparent to-transparent'"
>
    <x-layouts.partials.navigation.logo/>

    <x-layouts.partials.navigation.links/>

    <x-layouts.partials.navigation.social/>
</nav>
