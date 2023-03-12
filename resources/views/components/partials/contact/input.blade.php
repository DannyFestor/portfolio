@props(['name', 'type' => 'text'])
<article {{ $attributes->merge(['class' => 'w-full flex flex-col'])->except(['required', 'hidden']) }}>
    <label for="{{ $name }}" class="flex flex-col md:flex-row gap-2 w-full justify-between items-center">
        <span class="w-full md:w-1/4">{{ $slot }}</span>

        <input type="{{ $type }}"
               id="{{ $name }}"
               name="{{ $name }}"
               value="{{ old($name) }}"
               class="w-full md:flex-1 form-input rounded"
               {{ $attributes->has('hidden') ? 'tabindex="-1" autocomplete="off"' : '' }}
               {{ $attributes->has('required') ? 'required' : '' }}
        >
    </label>

    @error($name)
    <div class="text-red-600 text-sm">{{ __($message) }}</div>
    @enderror
</article>
