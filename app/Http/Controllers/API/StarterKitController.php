<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\StarterKit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class StarterKitController extends Controller
{
    /**
     * List all available starter kits
     * GET /api/starter-kits
     */
    public function index(Request $request)
    {
        $query = StarterKit::published()
            ->with(["stacks", "latestVersion", "stats"])
            ->orderBy("is_featured", "desc")
            ->orderBy("created_at", "desc");

        // Optional: Filter by difficulty
        if ($request->has("difficulty")) {
            $query->difficulty($request->difficulty);
        }

        // Optional: Search
        if ($request->has("search")) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where("name", "like", "%{$search}%")->orWhere(
                    "short_description",
                    "like",
                    "%{$search}%",
                );
            });
        }

        $starterKits = $query->get()->map(function ($kit) {
            return [
                "name" => $kit->name,
                "slug" => $kit->slug,
                "description" => $kit->short_description,
                "difficulty" => $kit->difficulty,
                "setup_time_minutes" => $kit->setup_time_minutes,
                "stacks" => $kit->stacks->pluck("name")->toArray(),
                "version" => $kit->latestVersion?->version,
                "installs" => $kit->stats?->installs_count ?? 0,
                "is_featured" => $kit->is_featured,
            ];
        });

        return response()->json([
            "success" => true,
            "data" => $starterKits,
        ]);
    }

    /**
     * Get specific starter kit details
     * GET /api/starter-kits/{slug}
     */
    public function show(string $slug)
    {
        $starterKit = StarterKit::published()
            ->where("slug", $slug)
            ->with(["stacks", "latestVersion", "features", "steps", "stats"])
            ->first();

        if (!$starterKit) {
            return response()->json(
                [
                    "success" => false,
                    "message" => "Starter kit not found",
                ],
                404,
            );
        }

        $latestVersion = $starterKit->latestVersion;

        return response()->json([
            "success" => true,
            "data" => [
                "name" => $starterKit->name,
                "slug" => $starterKit->slug,
                "description" => $starterKit->description,
                "short_description" => $starterKit->short_description,
                "difficulty" => $starterKit->difficulty,
                "setup_time_minutes" => $starterKit->setup_time_minutes,
                "stacks" => $starterKit->stacks
                    ->map(
                        fn($s) => [
                            "name" => $s->name,
                            "version" => $s->version,
                        ],
                    )
                    ->toArray(),
                "features" => $starterKit->features->pluck("name")->toArray(),
                "version" => [
                    "number" => $latestVersion?->version,
                    "repo_url" => $latestVersion?->repo_url,
                    "branch" => $latestVersion?->branch ?? "main",
                    "install_type" => $latestVersion?->install_type,
                    "install_command" => $latestVersion?->install_command,
                    "release_notes" => $latestVersion?->release_notes,
                ],
                "steps" => $starterKit->steps
                    ->map(
                        fn($step) => [
                            "title" => $step->title,
                            "description" => $step->description,
                            "command" => $step->command,
                            "order" => $step->order,
                        ],
                    )
                    ->toArray(),
                "stats" => [
                    "installs" => $starterKit->stats?->installs_count ?? 0,
                    "last_installed_at" =>
                        $starterKit->stats?->last_installed_at,
                ],
            ],
        ]);
    }

    /**
     * Track installation
     * POST /api/starter-kits/{slug}/track-install
     */
    public function trackInstall(string $slug)
    {
        $starterKit = StarterKit::published()->where("slug", $slug)->first();

        if (!$starterKit) {
            return response()->json(
                [
                    "success" => false,
                    "message" => "Starter kit not found",
                ],
                404,
            );
        }

        try {
            DB::transaction(function () use ($starterKit) {
                $starterKit->stats()->updateOrCreate(
                    ["starter_kit_id" => $starterKit->id],
                    [
                        "installs_count" => DB::raw("installs_count + 1"),
                        "last_installed_at" => now(),
                    ],
                );
            });

            return response()->json([
                "success" => true,
                "data" => [
                    "installs_count" => $starterKit->stats->installs_count,
                    "last_installed_at" => $starterKit->stats->last_installed_at,
                ],
                "message" => "Installation tracked successfully",
            ]);
        } catch (\Exception $e) {
            return response()->json(
                [
                    "success" => false,
                    "message" => $e->getMessage(),
                ],
                500,
            );
        }
    }

    /**
     * Get available stacks (for filtering)
     * GET /api/stacks
     */
    public function stacks()
    {
        $stacks = DB::table("starter_kit_stacks")
            ->select("name")
            ->distinct()
            ->orderBy("name")
            ->pluck("name");

        return response()->json([
            "success" => true,
            "data" => $stacks,
        ]);
    }
}
