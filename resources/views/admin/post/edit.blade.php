<x-app-layout>
    <x-slot:title>Edit {{ $post->title }}</x-slot:title>

    <livewire:admin.post.edit :post="$post" />
</x-app-layout>
