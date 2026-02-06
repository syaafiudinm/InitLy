<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StarterKit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StarterKitController extends Controller
{
    public function index()
    {
        return Inertia::render("Admin/StarterKits/Index", [
            "starterKits" => StarterKit::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render("Admin/StarterKits/Create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "slug" => "required|unique:starter_kits,slug|max:255",
            "short_description" => "required|string|max:255",
            "description" => "required|string",
            "difficulty" => "required|in:beginner,intermediate,advanced",
            "setup_time_minutes" => "required|integer|min:1",
            "is_featured" => "required|boolean",
            "status" => "required|in:draft,published",

            // Version
            "version" => "required|string|max:255",
            "version_repo_url" => "required|url",
            "version_repo_branch" => "nullable|string",
            "version_install_type" => "required|in:git,npm,composer",
            "version_install_command" => "nullable|string",
            "version_release_notes" => "nullable|string",

            // Stacks (array)
            "stacks" => "nullable|array",
            "stacks.*.name" => "required|string",
            "stacks.*.version" => "nullable|string",

            // Features (array of strings)
            "features" => "nullable|array",
            "features.*" => "required|string",

            // Steps (array)
            "steps" => "nullable|array",
            "steps.*.title" => "required|string",
            "steps.*.description" => "required|string",
            "steps.*.command" => "nullable|string",
            "steps.*.order" => "required|integer",
        ]);

        try {
            DB::beginTransaction();

            $starterKit = StarterKit::create([
                "name" => $validated["name"],
                "slug" => $validated["slug"],
                "short_description" => $validated["short_description"],
                "description" => $validated["description"],
                "difficulty" => $validated["difficulty"],
                "setup_time_minutes" => $validated["setup_time_minutes"],
                "is_featured" => $validated["is_featured"],
                "status" => $validated["status"],
            ]);

            $starterKit->versions()->create([
                "version" => $validated["version"],
                "repo_url" => $validated["version_repo_url"],
                "repo_branch" => $validated["version_repo_branch"],
                "install_type" => $validated["version_install_type"],
                "install_command" => $validated["version_install_command"],
                "release_notes" => $validated["version_release_notes"],
                "is_latest" => true,
            ]);

            if (!empty($validated["stacks"])) {
                foreach ($validated["stacks"] as $stack) {
                    $starterKit->stacks()->create([
                        "name" => $stack["name"],
                        "version" => $stack["version"] ?? null,
                    ]);
                }
            }

            if (!empty($validated["features"])) {
                foreach ($validated["features"] as $feature) {
                    $starterKit->features()->create([
                        "name" => $feature,
                    ]);
                }
            }

            if (!empty($validated["steps"])) {
                foreach ($validated["steps"] as $step) {
                    $starterKit->steps()->create([
                        "title" => $step["name"],
                        "description" => $step["description"],
                        "command" => $step["command"] ?? null,
                        "order" => $step["order"],
                    ]);
                }
            }

            $starterKit->stats()->create([
                "starter_kit_id" => $starterKit->id,
                "installs_count" => 0,
                "last_installed_at" => null,
            ]);

            DB::commit();

            return redirect()
                ->route("admin.starter-kit.index")
                ->with("success", "Starter Kit Created Successfully");
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->withInput([
                    "error" =>
                        "failed to create starter kit" . $e->getMessage(),
                ]);
        }
    }

    public function edit(StarterKit $starterKit)
    {
        $starterKit->load([
            "latest_version",
            "stacks",
            "features",
            "steps" => fn($query) => $query->orderBy("order"),
        ]);

        return Inertia::render("Admin/StarterKits/Edit", [
            "starterKit" => $starterKit,
        ]);
    }

    public function update(Request $request, StarterKit $starterkit)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "slug" =>
                "required|unique:starter_kits,slug," .
                $starterkit->id .
                "|max:255",
            "short_description" => "required|string|max:255",
            "description" => "required|string",
            "difficulty" => "required|in:beginner,intermediate,advanced",
            "setup_time_minutes" => "required|integer|min:1",
            "is_featured" => "required|boolean",
            "status" => "required|in:draft,published",

            // Version
            "version" => "required|string|max:255",
            "version_repo_url" => "required|url",
            "version_repo_branch" => "nullable|string",
            "version_install_type" => "required|in:git,npm,composer",
            "version_install_command" => "nullable|string",
            "version_release_notes" => "nullable|string",

            // Stacks (array)
            "stacks" => "nullable|array",
            "stacks.*.name" => "required|string",
            "stacks.*.version" => "nullable|string",

            // Features (array of strings)
            "features" => "nullable|array",
            "features.*" => "required|string",

            // Steps (array)
            "steps" => "nullable|array",
            "steps.*.title" => "required|string",
            "steps.*.description" => "required|string",
            "steps.*.command" => "nullable|string",
            "steps.*.order" => "required|integer",
        ]);

        try {
            DB::beginTransaction();

            $starterKit = StarterKit::update([
                "name" => $validated["name"],
                "slug" => $validated["slug"],
                "short_description" => $validated["short_description"],
                "description" => $validated["description"],
                "difficulty" => $validated["difficulty"],
                "setup_time_minutes" =>
                    $validated["setup_time_minutes"] ?? null,
                "is_featured" => $validated["is_featured"] ?? false,
                "status" => $validated["status"],
            ]);

            $starterKit->versions()->update([
                "version" => $validated["version"],
                "repo_url" => $validated["version_repo_url"],
                "repo_branch" => $validated["version_repo_branch"],
                "install_type" => $validated["version_install_type"],
                "install_command" =>
                    $validated["version_install_command"] ?? null,
                "release_notes" => $validated["version_release_notes"] ?? null,
            ]);

            if (!empty($validated["stacks"])) {
                foreach ($validated["stacks"] as $stack) {
                    $starterKit->stacks()->update([
                        "name" => $stack["name"],
                        "version" => $stack["version"] ?? null,
                    ]);
                }
            }

            $starterKit->stacks()->delete();
            if (!empty($validated["stacks"])) {
                $starterKit->stacks()->createMany($validated["stacks"]);
            }

            // Replace features
            $starterKit->features()->delete();
            if (!empty($validated["features"])) {
                foreach ($validated["features"] as $feature) {
                    $starterKit->features()->create(["name" => $feature]);
                }
            }

            // Replace steps
            $starterKit->steps()->delete();
            if (!empty($validated["steps"])) {
                $starterKit->steps()->createMany($validated["steps"]);
            }

            DB::commit();

            return redirect()
                ->route("admin.starter-kits.index")
                ->with("success", "starterkit berhasil di update");
        } catch (\Exception $e) {
            DB::rollBack();

            return back()
                ->withInput()
                ->withErrors([
                    "error" =>
                        "Failed to update starter kit: " . $e->getMessage(),
                ]);
        }
    }

    public function destroy(StarterKit $starterkit)
    {
        $starterkit->delete();

        return back()->with("success", "Delete Starter Kit Successfully");
    }
}
