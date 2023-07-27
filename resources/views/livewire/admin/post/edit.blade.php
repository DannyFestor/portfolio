<x-layouts.partials.content-wrap class="flex flex-col">
    <form
        x-data="{
            title: $wire.entangle('title'),
            slug: $wire.entangle('slug'),
            description: $wire.entangle('description'),
            released_at: $wire.entangle('released_at'),
            is_released: $wire.entangle('is_released'),

            onCancel() {
                $wire.onCancel()
            },
        }"
        @submit.prevent="$wire.onSubmit()"
        class="mx-auto flex max-w-4xl flex-col gap-4 rounded bg-white p-4 shadow sm:p-8"
    >
        <label class="flex items-center justify-between gap-4" for="title">
            Title
            <input
                id="title"
                x-model.lazy="title"
                type="text"
                class="form-input w-full rounded"
            />
        </label>
        @error('title')
        <div class="text-sm text-red-700">
            {{ $message }}
        </div>
        @enderror
        <section class="grid gap-4 sm:grid-cols-2">
            <label
                class="flex items-center justify-between gap-4"
                for="released_at"
            >
                Release Date
                <input
                    id="released_at"
                    x-model.lazy="released_at"
                    type="datetime-local"
                    class="form-input rounded"
                />
            </label>
            <label
                class="flex items-center justify-between gap-4"
                for="is_released"
            >
                Released?
                <input
                    id="is_released"
                    x-model.lazy="is_released"
                    type="checkbox"
                    class="form-input rounded"
                />
            </label>
        </section>
        @error('released_at')
            <div class="text-sm text-red-700">
                {{ $message }}
            </div>
        @enderror

        <label class="flex items-center justify-between gap-4" for="slug">
            Slug
            <input
                id="slug"
                x-model.lazy="slug"
                type="text"
                class="form-input w-full rounded"
            />
        </label>
        @error('slug')
            <div class="text-sm text-red-700">
                {{ $message }}
            </div>
        @enderror

        <label class="flex flex-col gap-2" for="description">
            Description
            <textarea
                id="description"
                x-model.lazy="description"
                class="form-input w-full rounded"
                rows="20"
            ></textarea>
        </label>
        @error('description')
            <div class="text-sm text-red-700">
                {{ $message }}
            </div>
        @enderror

        <section class="flex justify-end gap-4">
            <button type="reset" @click.prevent="onCancel">Cancel</button>
            <button type="submit">Save</button>
        </section>
    </form>
</x-layouts.partials.content-wrap>
