<form x-data="{ collapsed: true }" wire:submit="onSubmit" class="w-full max-w-xl mx-auto mb-8">
    <div @click="collapsed = !collapsed" class="w-full flex justify-between px-4 py-2 rounded-t bg-white">
        <div>Search</div>
        <div x-cloak x-show="!collapsed">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
            </svg>
        </div>
        <div x-cloak x-show="collapsed">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
            </svg>
        </div>
    </div>
    <div x-show="!collapsed" x-cloak x-collapse class="px-4 py-2 bg-white rounded-b flex flex-col gap-2">
        <input type="text" wire:model="search" class="rounded" placeholder="e.g. Laravel Scout Flutter">
        <div class="flex justify-end gap-2">
            <button type="reset" class="px-4 py-2 text-slate-800 rounded">Clear</button>
            <button type="submit" class="px-4 py-2 bg-slate-800 text-slate-50 rounded">Search</button>
        </div>
    </div>
</form>
