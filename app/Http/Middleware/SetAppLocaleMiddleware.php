<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class SetAppLocaleMiddleware
{
    public function handle(Request $request, Closure $next): Response|RedirectResponse
    {
        $locale = Str::before(request()->getPreferredLanguage(), '_');
        if ($request->session()->has('locale')) {
            $locale = $request->session()->get('locale');
        }
        app()->setLocale($locale);

        return $next($request);
    }
}
