@props(['name'])
<article
    {{ $attributes->merge(['class' => 'w-full flex flex-col'])->except(['required', 'wire:model']) }}
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
            @if ($attributes->has('wire:model'))
            wire:model="{{ $attributes->get('wire:model') }}"
            @endif
        ></textarea>
    </label>

    @if ($attributes->has('wire:model'))
        @error($attributes->get('wire:model'))
        <div class="text-sm text-red-600">{{ __($message) }}</div>
        @enderror
    @else
        @error($name)
        <div class="text-sm text-red-600">{{ $message }}</div>
        @enderror
    @endif
</article>
