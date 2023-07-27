@props(['name'])
<article
    {{ $attributes->merge(['class' => 'w-full flex flex-col'])->except(['required']) }}
>
    <label
        for="{{ $name }}"
        class="flex w-full flex-col items-center justify-between gap-2"
    >
        <span class="w-full">{{ $slot }}</span>

        <textarea
            id="{{ $name }}"
            name="{{ $name }}"
            rows="8"
            class="form-input w-full rounded"
            {{ $attributes->has('required') ? 'required' : '' }}
        >
{{ old($name) }}</textarea
        >
    </label>

    @error($name)
        <div class="text-sm text-red-600">{{ $message }}</div>
    @enderror
</article>
