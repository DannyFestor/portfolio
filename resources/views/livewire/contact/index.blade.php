<x-layouts.partials.content-wrap
    class="flex flex-col items-center justify-center"
>
    @if($message)
        <div class="relative w-full max-w-2xl mx-auto px-4 py-2 text-center bg-emerald-200 border-2 border-emerald-700 text-emerald-700 rounded mb-8">
            {{ $message }}
        </div>
    @endif

    <div class="flex h-full w-full max-w-2xl flex-col rounded bg-white p-6">
        <h1 class="text-center text-2xl font-bold">
            {{ __('contact.header') }}
        </h1>

        <section class="mt-8">
            {{ __('contact.paragraph') }}
        </section>

        <form wire:submit="save" method="POST" class="mt-8 flex flex-col gap-4">
            @csrf

            <x-partials.contact.input name="name" wire:model="form.name" required>
                {{ __('contact.name') }}
            </x-partials.contact.input>

            <x-partials.contact.input name="email" wire:model="form.email" type="email" required>
                {{ __('contact.email') }}
            </x-partials.contact.input>

            <x-partials.contact.input name="telephone" wire:model="form.telephone" class="hidden">
                {{ __('contact.telephone') }}
            </x-partials.contact.input>

            <x-partials.contact.input name="subject" wire:model="form.subject" required>
                {{ __('contact.subject') }}
            </x-partials.contact.input>

            <x-partials.contact.textarea name="body" wire:model="form.body" required>
                {{ __('contact.body') }}
            </x-partials.contact.textarea>

            <div class="flex justify-end">
                <button type="submit"
                        class="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-500 text-slate-50 rounded transition-all hover:scale-105"
                        wire:loading.attr="disabled"
                        wire:loading.class="pointer-events-none opacity-50"
                >
                    <svg wire:loading class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>

                    {{ __('contact.submit') }}
                </button>
            </div>
        </form>
    </div>
</x-layouts.partials.content-wrap>
