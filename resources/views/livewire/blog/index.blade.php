<x-layouts.partials.content-wrap>
    <section class="mx-auto grid max-w-7xl gap-4 sm:grid-cols-4">
        <form
            wire:submit
            class="flex flex-col rounded bg-white p-4 shadow sm:col-span-3"
        >
            <section class="mb-2">
                <a
                    href="{{ route('blog.feed') }}"
                    class="flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                    </svg>

                    RSS Feed
                    <small>
                        (filter posts with
                        <em>?tag=Laravel</em>
                        , Pagination with ?page=2)
                    </small>
                </a>
            </section>

            <label class="flex items-center gap-4">
                Search:
                <input
                    type="text"
                    wire:model.live.debounce.500ms="search"
                    class="form-input w-full rounded"
                />
            </label>
        </form>
    </section>

</x-layouts.partials.content-wrap>
