<form x-data="{
        isVisible: false,
        showOptions: false,
    }"
      x-modelable="isVisible"
      x-model="{{ $xModel }}"
      wire:submit="change"
      @click.outside="showOptions = false"
      class="relative mt-8 flex flex-col"
>
    <section
        @click="showOptions = ! showOptions"
        class="m-1 flex cursor-pointer items-center rounded border bg-white p-1"
    >
        <section class="flex h-6 w-8 items-center">
            <img src="{{ $this->selectedLocale['flag'] }}" alt=""/>
        </section>
        <section
            class="flex items-center overflow-hidden transition-opacity group-hover:visible group-hover:ml-4 group-hover:h-full group-hover:w-auto group-hover:opacity-100"
            :class="isVisible ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
        >{{ $this->selectedLocale['name'] }}</section>
    </section>

    <section
        x-show="showOptions"
        x-cloak
        x-transition
        class="absolute top-9 m-1 flex flex-col rounded border bg-white p-1"
    >
        @foreach($options as $option)
            <section
                wire:click="setLocale('{{ $option['code'] }}', '{{ $routeName }}', {{ json_encode($routeOptions) }} )"
                class="m-1 flex cursor-pointer items-center rounded border p-1 hover:bg-slate-200"
            >
                <section class="h-6 w-8">
                    <img src="{{ $option['flag'] }}" alt="{{ $option['name'] }} Flag"/>
                </section>
                <section
                    class="flex items-center overflow-hidden transition-opacity group-hover:visible group-hover:ml-4 group-hover:h-full group-hover:w-auto group-hover:opacity-100"
                    :class="isVisible ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
                >{{ $option['name'] }}</section>
            </section>
        @endforeach
    </section>
</form>
