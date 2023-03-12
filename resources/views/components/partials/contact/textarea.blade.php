@props(['name'])
<article {{ $attributes->merge(['class' => 'w-full flex flex-col'])->except(['required']) }}>
    <label for="{{ $name }}" class="flex flex-col gap-2 w-full justify-between items-center">
        <span class="w-full">{{ $slot }}</span>

        <textarea id="{{ $name }}"
                  name="{{ $name }}"
                  rows="8"
                  class="w-full form-input rounded"
              {{ $attributes->has('required') ? 'required' : '' }}
        >{{ old($name) }}</textarea>
    </label>

    @error($name)
    <div class="text-red-600 text-sm">{{ $message }}</div>
    @enderror
</article>
