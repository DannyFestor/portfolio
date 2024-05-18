@props(['link', 'title', 'asset'])

<a href="{{ $link }}" target="_blank" {{ $attributes->merge(['class' => 'transition-all hover:scale-105']) }}>
    <li class="flex flex-col items-center text-center"><img class="w-12 h-12" src="{{ $asset }}" alt="{{ $title }}" aria-label="{{ $title }}" title="{{ $title }}"/>{{ $title }}</li>
</a>
