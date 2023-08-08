@props(['options'])
{{--<form--}}

{{--    --}}{{--    x-data="language_select"--}}
{{--    {{ $attributes->merge() }}--}}
{{--    x-ref="form"--}}
{{--    x-modelable="isVisible"--}}
{{--    @submit.prevent--}}
{{--    @click.outside="close"--}}
{{--    @mouseleave="close"--}}
{{--    action="{{ route('set-locale') }}"--}}
{{--    method="POST"--}}
{{-->--}}
{{--    @csrf--}}
{{--    <input--}}
{{--        type="hidden"--}}
{{--        id="locale"--}}
{{--        name="locale"--}}
{{--        x-model="selectedOption"--}}
{{--    />--}}
{{--    <input type="hidden" id="route" name="route" x-model="selectedRoute"/>--}}

{{--    <section--}}
{{--        x-show="isOpen"--}}
{{--        x-cloak--}}
{{--        x-transition--}}
{{--        class="absolute top-9 m-1 flex flex-col rounded border bg-white p-1"--}}
{{--    >--}}
{{--        <template x-for="option in options">--}}
{{--            <section--}}
{{--                @click="setSelectedOption(option.code, option.route)"--}}
{{--                class="m-1 flex cursor-pointer items-center rounded border p-1 hover:bg-slate-200"--}}
{{--            >--}}
{{--                <section class="h-6 w-8">--}}
{{--                    <img :src="option.flag" alt=""/>--}}
{{--                </section>--}}
{{--                <section--}}
{{--                    x-text="option.name"--}}
{{--                    class="flex items-center overflow-hidden transition-opacity group-hover:visible group-hover:ml-4 group-hover:h-full group-hover:w-auto group-hover:opacity-100"--}}
{{--                    :class="isVisible ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"--}}
{{--                ></section>--}}
{{--            </section>--}}
{{--        </template>--}}
{{--    </section>--}}
{{--</form>--}}

{{--@push('scripts')--}}
{{--    <script>--}}
{{--        document.addEventListener('alpine:init', () => {--}}
{{--            Alpine.data('language_select', () => ({--}}
{{--                isOpen: false,--}}
{{--                isVisible: false,--}}


{{--                selectedOption: '{{ app()->getLocale() }}',--}}
{{--                selectedRoute: '',--}}

{{--                setSelectedOption(code, route) {--}}
{{--                    if (!this.codes.includes(code)) {--}}
{{--                        return;--}}
{{--                    }--}}

{{--                    this.selectedOption = code;--}}
{{--                    this.selectedRoute = route;--}}

{{--                    this.$nextTick(() => {--}}
{{--                        this.$refs.form.submit();--}}
{{--                    });--}}
{{--                },--}}

{{--                get codes() {--}}
{{--                    return this.options.map((lang) => lang.code);--}}
{{--                },--}}

{{--                get displayOption() {--}}
{{--                    return this.options.filter(--}}
{{--                        (lang) => lang.code === this.selectedOption,--}}
{{--                    )[0];--}}
{{--                },--}}

{{--                toggleIsOpen() {--}}
{{--                    this.isOpen = !this.isOpen;--}}
{{--                },--}}

{{--                close() {--}}
{{--                    this.isOpen = false;--}}
{{--                },--}}
{{--            }));--}}
{{--        });--}}
{{--    </script>--}}
{{--@endpush--}}
