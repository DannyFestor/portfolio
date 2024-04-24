<?php

namespace App\Http\Middleware;

use App\Models\AccessLog;
use App\Models\Post;
use App\Models\Project;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Jenssegers\Agent\Agent;

class LogActivityMiddleware
{
    public function handle(Request $request, Closure $next): Closure|JsonResponse|Response|RedirectResponse
    {
        $accessed_at = now()->format('Y-m-d');
        $ip = $_SERVER['REMOTE_ADDR'] ?? null;
        $requestUri = $_SERVER['REQUEST_URI'] ?? null;
        $accessLog = AccessLog::query()
            ->where('accessed_at', '=', $accessed_at)
            ->where('ip', '=', $ip)
            ->where('address', '=', $requestUri)
            ->where('created_at', '>', now()->subMinutes(3))
            ->exists();
        if ($accessLog) {
            return $next($request);
        }

        if (
            ($request->header('Accept') && str_starts_with($request->header('Accept'), 'text/html')) ||
            ($request->header('Accept') && str_starts_with($request->header('Accept'), 'application/json'))
        ) {
            // 'platform', 'platform_version', 'device', 'device_kind', 'browser', 'browser_version', 'is_robot'
            $agent = new Agent();

            /** @var ?string $platform */
            $platform = $agent->platform();
            $platform_version = $platform ? $agent->version(propertyName: $platform) : null;

            $device = $agent->device();
            if ($agent->isDesktop()) {
                $device_kind = 'desktop';
            } elseif ($agent->isTablet()) {
                $device_kind = 'tablet';
            } elseif ($agent->isPhone()) {
                $device_kind = 'phone';
            } else {
                $device_kind = 'n/a';
            }

            /** @var ?string $browser */
            $browser = $agent->browser(

            );
            $browser_version = $browser ? $agent->version(propertyName: $browser) : null;

            $is_robot = $agent->isRobot();

            $attributes = [
                'accessed_at' => $accessed_at,
                'ip' => $ip,
                'origin' => $_SERVER['HTTP_ORIGIN'] ?? null,
                'platform' => $platform,
                'platform_version' => $platform_version,
                'device' => $device,
                'device_kind' => $device_kind,
                'browser' => $browser,
                'browser_version' => $browser_version,
                'is_robot' => $is_robot,
                'address' => $requestUri,
                'referrer' => $_SERVER['HTTP_REFERER'] ?? null,
                'method' => $_SERVER['REQUEST_METHOD'] ?? null,
                'language' => $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? null,
                'is_livewire' => isset($_SERVER['HTTP_X_LIVEWIRE']),
                'content_type' => $_SERVER['CONTENT_TYPE'] ?? null,
                'accept' => $_SERVER['HTTP_ACCEPT'] ?? null,
            ];

            /** @var ?Post $post */
            $post = $request->route('post');
            if ($post !== null) {
                $attributes['accessible_id'] = Post::where('slug', $post->slug)->first()->id;
                $attributes['accessible_type'] = Post::class;
            }

            /** @var ?Project $project */
            $project = $request->route('project');
            if ($project !== null) {
                $attributes['accessible_id'] = Project::where('slug', $project->slug)->first()->id;
                $attributes['accessible_type'] = Project::class;
            }

            AccessLog::create($attributes);
        }

        return $next($request);
    }
}
