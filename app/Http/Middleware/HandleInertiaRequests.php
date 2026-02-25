<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = "app";

    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            "appName" => config("app.name"),
            "auth" => [
                "user" => $request->user()
                    ? [
                        "id" => $request->user()->id,
                        "name" => $request->user()->name,
                        "email" => $request->user()->email,
                        "role" => $request->user()->role,
                    ]
                    : null,
            ],
            // Share saved kit IDs agar bisa dipakai di Index & Show untuk status saved
            "savedKitIds" => $request->user()
                ? $request
                    ->user()
                    ->savedStarterKits()
                    ->pluck("starter_kit_id")
                    ->toArray()
                : [],
        ];
    }
}
