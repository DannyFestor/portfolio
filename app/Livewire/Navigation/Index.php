<?php

namespace App\Livewire\Navigation;

use App\Enums\Locales;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
        $referrer = $request->server('HTTP_REFERER');

        $request->validate([
            'route' => ['required', 'string'],
            'locale' => [Rule::in(Locales::toArray())],
        ]);
        $request->session()->put('locale', $request->get('locale'));

        return redirect()->to($request->get('route'));
    }
}
