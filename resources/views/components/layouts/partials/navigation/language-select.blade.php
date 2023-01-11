<form x-data="language_select"
      x-ref="form"
      @submit.prevent
      @click.outside="close"
      @mouseleave="close"
      action="{{ route('set-locale') }}"
      method="POST"
      class="flex flex-col relative mt-8">
    @csrf
    <input type="hidden" id="locale" name="locale" x-model="selectedOption">
    <section @click="toggleIsOpen" class="flex items-center m-1 p-1 border rounded bg-white cursor-pointer">
        <section class="flex items-center w-8 h-6">
            <img :src="displayOption.flag" alt="">
        </section>
        <section x-text="displayOption.name"
                 class="group-hover:visible transition-opacity group-hover:opacity-100 group-hover:ml-4 group-hover:h-full group-hover:w-auto overflow-hidden flex items-center"
                 :class="$store.navigation.open ? 'visible opacity-100 ml-4 h-full w-auto' : 'invisible opacity-0 ml-0 h-0 w-0'"
        ></section>
    </section>

    <section x-show="isOpen" x-cloak x-transition class="absolute m-1 top-9 p-1 border rounded bg-white flex flex-col">
        <template x-for="option in options">
            <section @click="setSelectedOption(option.code)" class="flex items-center m-1 p-1 border rounded cursor-pointer hover:bg-slate-200">
                <section class="w-8 h-6">
                    <img :src="option.flag" alt="">
                </section>
                <section x-text="option.name"
                         class="group-hover:visible transition-opacity group-hover:opacity-100 group-hover:ml-4 group-hover:h-full group-hover:w-auto overflow-hidden flex items-center"
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
                    'code': 'de',
                    'name': 'German | Deutsch',
                    'flag': '{{ asset('flags/de.svg') }}',
                },
                {
                    'code': 'en',
                    'name': 'English',
                    'flag': '{{ asset('flags/us.svg') }}',
                },
                {
                    'code': 'ja',
                    'name': 'Japanese | 日本語',
                    'flag': '{{ asset('flags/jp.svg') }}',
                }
            ],

            selectedOption: '{{ app()->getLocale() }}',

            setSelectedOption(code) {
                if (! this.codes.includes(code)) {
                    return;
                }

                this.selectedOption = code;
                this.$nextTick(() => {
                    this.$refs.form.submit();
                });
            },

            get codes() {
                return this.options.map(lang => lang.code);
            },

            get displayOption() {
                return this.options.filter(lang => lang.code === this.selectedOption)[0];
            },

            toggleIsOpen() {
                this.isOpen = ! this.isOpen;
            },

            close () {
                this.isOpen = false;
            },
        }));
    });
</script>
@endpush
