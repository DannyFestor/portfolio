<?php

namespace App\Livewire\Navigation;

use Livewire\Component;

class Index extends Component
{
    public bool $isOpen = false;

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.navigation.index');
    }
}
