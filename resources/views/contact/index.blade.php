<x-app-layout>
    <x-slot:title>
        {{ __('contact.title') }}
    </x-slot>

    <x-layouts.partials.content-wrap
        class="flex flex-col items-center justify-center"
    >
        <div class="flex h-full w-full max-w-2xl flex-col rounded bg-white p-6">
            <h1 class="text-center text-2xl font-bold">
                {{ __('contact.header') }}
            </h1>

            <section class="mt-8">
                {{ __('contact.paragraph') }}
            </section>

            <form action="#" method="POST" class="mt-8 flex flex-col gap-4">
                @csrf
                <x-partials.contact.input name="name" required>
                    {{ __('contact.name') }}
                </x-partials.contact.input>

                <x-partials.contact.input name="email" type="email" required>
                    {{ __('contact.email') }}
                </x-partials.contact.input>

                <x-partials.contact.input name="telephone" class="hidden">
                    {{ __('contact.telephone') }}
                </x-partials.contact.input>

                <x-partials.contact.input name="subject" required>
                    {{ __('contact.subject') }}
                </x-partials.contact.input>

                <x-partials.contact.textarea name="body" required>
                    {{ __('contact.body') }}
                </x-partials.contact.textarea>

                <div>
                    <button type="submit">{{ __('contact.submit') }}</button>
                </div>
            </form>
        </div>
    </x-layouts.partials.content-wrap>
</x-app-layout>
