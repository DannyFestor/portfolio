<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LocaleController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'locale' => [Rule::in(['de', 'en', 'ja'])],
        ]);
        $request->session()->put('locale', $request->get('locale'));

        return redirect()->back();
    }
}
