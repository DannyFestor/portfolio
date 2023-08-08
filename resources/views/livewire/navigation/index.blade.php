<nav
    x-data="{ isOpen: @entangle('isOpen').live }"
    id="navigation"
    class="group fixed bottom-0 left-0 top-0 z-20 flex flex-col justify-between bg-gradient-to-r from-slate-200 via-transparent to-transparent transition transition-all hover:w-[13rem] hover:via-white hover:to-white hover:shadow"
    :class="isOpen ? 'w-[13rem] shadow via-white to-white' : 'w-[3rem] shadow-none via-transparent to-transparent'"
>
    <x-layouts.partials.navigation.logo x-model="isOpen"/>

    <x-layouts.partials.navigation.links x-model="isOpen"/>

    <x-layouts.partials.navigation.social x-model="isOpen"/>

    @teleport('body')
    <div>
        <x-layouts.partials.backdrop x-model="isOpen"/>

        <x-layouts.partials.hamburger x-model="isOpen"/>
    </div>
    @endteleport
</nav>
