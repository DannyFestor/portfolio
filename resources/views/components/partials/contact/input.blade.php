@props(['name', 'type' => 'text'])
<article
    {{ $attributes->merge(['class' => 'w-full flex flex-col'])->except(['required', 'hidden', 'wire:model']) }}
>
    <label
        for="{{ $name }}"
        class="flex w-full flex-col items-center justify-between gap-2 md:flex-row"
    >
        <span class="w-full md:w-1/4">{{ $slot }}</span>

        <input
            type="{{ $type }}"
            id="{{ $name }}"
            name="{{ $name }}"
            class="form-input w-full rounded md:flex-1"
            {{ $attributes->has('hidden') ? 'tabindex="-1" autocomplete="off"' : '' }}
            {{ $attributes->has('required') ? 'required' : '' }}
            @if ($attributes->has('wire:model'))
            wire:model="{{ $attributes->get('wire:model') }}"
            @endif
        />
    </label>

    @error($name)
        <div class="text-sm text-red-600">{{ __($message) }}</div>
    @enderror
</article>
