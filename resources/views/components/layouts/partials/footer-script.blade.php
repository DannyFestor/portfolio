<script>
    document.addEventListener('alpine:init', () => {
        Alpine.store('darkMode', {
            on: false,

            toggle() {
                this.on = ! this.on
            }
        });

        Alpine.store('navigation', {
            open: false,

            show() {
                this.open = true;
            },

            close() {
                this.open = false;
            },

            toggle() {
                this.open = ! this.open
            },
        });


        window.addEventListener('resize', Alpine.debounce((e) => {
            if (window.innerWidth < 640 || !Alpine.store('navigation').open) {
                return;
            }
            Alpine.store('navigation').close();
        }, 300));
    });
</script>
