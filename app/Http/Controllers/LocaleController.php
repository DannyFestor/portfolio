<?php

namespace App\Http\Controllers;

use App\Enums\Locales;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LocaleController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'route' => ['required', 'string'],
            'locale' => [Rule::in(Locales::toArray())],
        ]);
        $request->session()->put('locale', $request->get('locale'));

        $to = $request->get('route');
        if (gettype($to) !== 'string') {
            $to = '/';
        }

        return redirect()->to($to);
    }
}
