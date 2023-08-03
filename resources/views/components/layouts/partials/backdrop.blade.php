<div
    x-data="{
        open: false,

        init() {
            $watch('open', (v) => {
                if (v) {
                    document.body.style.overflowY = 'hidden';
                } else {
                    document.body.style.overflowY = '';
                }
            });
        }
    }"
    {{ $attributes->merge() }}
    x-modelable="open"
    id="backdrop"
    x-show="open"
    @click="open = false"
    class="fixed inset-0 z-10 bg-black bg-opacity-30 sm:hidden"
    x-transition:enter="transition duration-200 ease-out"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition duration-200 ease-in"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
></div>
