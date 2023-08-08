<?php

namespace App\Http\Middleware;

use App\Enums\Locales;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class SetAppLocaleMiddleware
{
    public function handle(Request $request, Closure $next): Response|RedirectResponse|JsonResponse
    {
        if ($request->route('locale') && in_array($request->route('locale'), Locales::toArray())) {
            $locale = $request->route('locale');
        } elseif ($request->session()->has('locale')) {
            $locale = $request->session()->get('locale');
        } else {
            $locale = Str::before(request()->getPreferredLanguage() ?? 'en', '_');
        }

        if (!in_array($locale, Locales::toArray())) {
            $locale = 'en';
        }

        session()->put('locale', $locale);
        app()->setLocale($locale);

        return $next($request);
    }
}
