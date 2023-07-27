<form
    x-data="language_select"
    x-ref="form"
    @submit.prevent
    @click.outside="close"
    @mouseleave="close"
    action="{{ route('set-locale') }}"
    method="POST"
    class="relative mt-8 flex flex-col"
>
    @csrf
    <input
        type="hidden"
        id="locale"
        name="locale"
        x-model="selectedOption"
    />
    <section
        @click="toggleIsOpen"
        class="m-1 flex cursor-pointer items-center rounded border bg-white p-1"
    >
        <section class="flex h-6 w-8 items-center">
            <img :src="displayOption.flag" alt="" />
        </section>
        <section
            x-text="displayOption.name"
            class="flex items-center overflow-hidden transition-opacity group-hover:visible group-hover:ml-4 group-hover:h-full group-hover:w-auto group-hover:opacity-100"
            :class="$store.navigation.open ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
        ></section>
    </section>

    <section
        x-show="isOpen"
        x-cloak
        x-transition
        class="absolute top-9 m-1 flex flex-col rounded border bg-white p-1"
    >
        <template x-for="option in options">
            <section
                @click="setSelectedOption(option.code)"
                class="m-1 flex cursor-pointer items-center rounded border p-1 hover:bg-slate-200"
            >
                <section class="h-6 w-8">
                    <img :src="option.flag" alt="" />
                </section>
                <section
                    x-text="option.name"
                    class="flex items-center overflow-hidden transition-opacity group-hover:visible group-hover:ml-4 group-hover:h-full group-hover:w-auto group-hover:opacity-100"
                    :class="$store.navigation.open ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
                ></section>
            </section>
        </template>
    </section>
</form>

@push('scripts')
    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('language_select', () => ({
                isOpen: false,

                options: [
                    {
                        code: 'de',
                        name: 'German | Deutsch',
                        flag: '{{ asset('flags/de.svg') }}',
                    },
                    {
                        code: 'en',
                        name: 'English',
                        flag: '{{ asset('flags/us.svg') }}',
                    },
                    {
                        code: 'ja',
                        name: 'Japanese | 日本語',
                        flag: '{{ asset('flags/jp.svg') }}',
                    },
                ],

                selectedOption: '{{ app()->getLocale() }}',

                setSelectedOption(code) {
                    if (!this.codes.includes(code)) {
                        return;
                    }

                    this.selectedOption = code;
                    this.$nextTick(() => {
                        this.$refs.form.submit();
                    });
                },

                get codes() {
                    return this.options.map((lang) => lang.code);
                },

                get displayOption() {
                    return this.options.filter(
                        (lang) => lang.code === this.selectedOption
                    )[0];
                },

                toggleIsOpen() {
                    this.isOpen = !this.isOpen;
                },

                close() {
                    this.isOpen = false;
                },
            }));
        });
    </script>
@endpush
