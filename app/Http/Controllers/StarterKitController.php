<?php

namespace App\Http\Controllers;

use App\Models\StarterKit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StarterKitController extends Controller
{
    public function index()
    {
        $starterKits = StarterKit::published()
            ->with("latestVersion")
            ->get()
            ->map(function ($kit) {
                $kit->is_saved = Auth::check()
                    ? Auth::user()
                        ->savedStarterKits()
                        ->where("starter_kit_id", $kit->id)
                        ->exists()
                    : false;
                return $kit;
            });

        return Inertia::render("StarterKits/Index", [
            "starterKits" => [
                "data" => $starterKits,
            ],
        ]);
    }

    public function show(string $slug)
    {
        $starterKit = StarterKit::where("slug", $slug)
            ->with([
                "latestVersion",
                "stacks",
                "features",
                "steps" => fn($query) => $query->orderBy("order"),
                "stats",
            ])
            ->firstOrFail();

        $isSaved = Auth::check()
            ? Auth::user()
                ->savedStarterKits()
                ->where("starter_kit_id", $starterKit->id)
                ->exists()
            : false;

        return Inertia::render("StarterKits/Show", [
            "starterKit" => [
                "name" => $starterKit->name,
                "slug" => $starterKit->slug,
                "description" => $starterKit->description,
                "short_description" => $starterKit->short_description,
                "difficulty" => $starterKit->difficulty,
                "setup_time_minutes" => $starterKit->setup_time_minutes,
                "stacks" => $starterKit->stacks->map(
                    fn($s) => [
                        "name" => $s->name,
                        "version" => $s->version,
                    ],
                ),
                "features" => $starterKit->features->pluck("name"),
                "version" => $starterKit->latestVersion
                    ? [
                        "number" => $starterKit->latestVersion->version,
                        "repo_url" => $starterKit->latestVersion->repo_url,
                        "branch" => $starterKit->latestVersion->branch,
                        "install_type" =>
                            $starterKit->latestVersion->install_type,
                        "install_command" =>
                            $starterKit->latestVersion->install_command,
                        "release_notes" =>
                            $starterKit->latestVersion->release_notes,
                    ]
                    : null,
                "steps" => $starterKit->steps->map(
                    fn($s) => [
                        "title" => $s->title,
                        "description" => $s->description,
                        "command" => $s->command,
                        "order" => $s->order,
                    ],
                ),
                "stats" => $starterKit->stats
                    ? [
                        "installs" => $starterKit->stats->installs_count,
                        "last_installed_at" =>
                            $starterKit->stats->last_installed_at,
                    ]
                    : null,
                "is_saved" => $isSaved,
            ],
        ]);
    }
}
