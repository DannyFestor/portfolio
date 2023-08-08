<?php

namespace App\Http\Middleware;

use App\Models\AccessLog;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LogActivityMiddleware
{
    public function handle(Request $request, Closure $next): Closure|JsonResponse|Response|RedirectResponse
    {
        if (
            ($request->header('Accept') && str_starts_with($request->header('Accept'), 'text/html')) ||
            ($request->header('Accept') && str_starts_with($request->header('Accept'), 'application/json'))
        ) {
            $attributes = [
                'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
                'origin' => $_SERVER['HTTP_ORIGIN'] ?? null,
                'address' => $_SERVER['REQUEST_URI'] ?? null,
                'referrer' => $_SERVER['HTTP_REFERER'] ?? null,
                'method' => $_SERVER['REQUEST_METHOD'] ?? null,
                'language' => $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? null,
                'is_livewire' => isset($_SERVER['HTTP_X_LIVEWIRE']),
                'content_type' => $_SERVER['CONTENT_TYPE'] ?? null,
                'accept' => $_SERVER['HTTP_ACCEPT'] ?? null,
            ];
            AccessLog::create($attributes);
        }

        return $next($request);
    }
}
