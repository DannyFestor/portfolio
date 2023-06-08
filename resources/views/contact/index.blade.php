<x-app-layout>
    <x-slot:title>{{ __('contact.title')  }}</x-slot:title>

    <x-layouts.partials.content-wrap class="flex flex-col items-center justify-center">
        <div class="bg-white rounded flex flex-col h-full p-6 w-full max-w-2xl">
            <h1 class="text-2xl font-bold text-center">{{ __('contact.header') }}</h1>

            <section class="mt-8">
                {{ __('contact.paragraph') }}
            </section>

            <form action="#" method="POST" class="mt-8 flex flex-col gap-4">
                @csrf
                <x-partials.contact.input name="name" required >
                    {{ __('contact.name') }}
                </x-partials.contact.input>

                <x-partials.contact.input name="email" type="email" required >
                    {{ __('contact.email') }}
                </x-partials.contact.input>

                <x-partials.contact.input name="telephone" class="hidden" >
                    {{ __('contact.telephone') }}
                </x-partials.contact.input>

                <x-partials.contact.input name="subject" required >
                    {{ __('contact.subject') }}
                </x-partials.contact.input>

                <x-partials.contact.textarea name="body" required >
                    {{ __('contact.body') }}
                </x-partials.contact.textarea>

                <div>
                    <button type="submit">{{ __('contact.submit') }}</button>
                </div>
            </form>
        </div>
    </x-layouts.partials.content-wrap>
</x-app-layout>
