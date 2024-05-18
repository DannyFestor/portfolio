@props([
    /** @var string $route */
    'route',
])

<a href="{{ $route }}" {{ $attributes->class(['transition-all hover:scale-105 bg-white shadow hover:shadow-lg even:rotate-2 odd:-rotate-2 p-2']) }}>
    <article>
        {{ $slot }}
    </article>
</a>
