<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EnsureUserIsAdminMiddleware
{
    public function handle(Request $request, Closure $next): Closure|RedirectResponse
    {
        if (!$request->user() || !$request->user()->is_admin) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}
