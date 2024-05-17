<?php

namespace App\Livewire\Navigation;

use Illuminate\Http\Request;
use Livewire\Component;

class Index extends Component
{
    public bool $isOpen = false;

    public function render(): \Illuminate\Contracts\View\View
    {
        return view('livewire.navigation.index');
    }

    public function change(Request $request): \Illuminate\Http\RedirectResponse
    {
        //        $referrer = $request->server('HTTP_REFERER');

        $request->validate([
            'route' => ['required', 'string'],
        ]);

        $to = $request->get('route');
        if (gettype($to) !== 'string') {
            $to = '/';
        }

        return redirect()->to($to);
    }
}
