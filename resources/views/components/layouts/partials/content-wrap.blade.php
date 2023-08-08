<main
        {{ $attributes->merge(['class' => 'relative flex-1 p-4 ml-12 sm:ml-52']) }}
>
    @if(Session::has('success'))
        <section class="px-4 py-2 border-2 border-emerald-900 text-emerald-900 bg-emerald-300 mb-8 rounded">
            {{ Session::get('success') }}
        </section>
    @endif

    {{ $slot }}
</main>
