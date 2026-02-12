<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use App\Models\StarterKit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StarterKitController extends Controller
{
    public function index()
    {
        $starterKits = StarterKit::with("latestVersion")->get();
        return Inertia::render("Admin/StarterKits/Index", [
            "starterKits" => $starterKits,
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

            // Version fields - sesuai migration yang diperbaiki
            "version" => "required|string|max:255",
            "version_repo_url" => "required|url",
            "version_repo_branch" => "nullable|string",
            "version_install_type" => "required|in:git,npm,composer",
            "version_install_command" => "nullable|string",
            "version_release_notes" => "nullable|string",

            // Stacks - version dan image nullable
            "stacks" => "nullable|array",
            "stacks.*.name" => "required|string",
            "stacks.*.version" => "nullable|string",

            // Features
            "features" => "nullable|array",
            "features.*" => "required|string",

            // Steps - command nullable
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

            // Create version dengan field yang benar
            $starterKit->versions()->create([
                "version" => $validated["version"],
                "repo_url" => $validated["version_repo_url"],
                "branch" => $validated["version_repo_branch"] ?? "main",
                "install_type" => $validated["version_install_type"],
                "install_command" => $validated["version_install_command"],
                "release_notes" => $validated["version_release_notes"],
                "is_latest" => true,
            ]);

            if (!empty($validated["stacks"])) {
                foreach ($validated["stacks"] as $stack) {
                    $starterKit->stacks()->create([
                        "name" => $stack["name"],
                        "version" => $stack["version"],
                        "image" => null,
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
                        "title" => $step["title"],
                        "description" => $step["description"],
                        "command" => $step["command"],
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
                ->route("admin.index")
                ->with("success", "Starter Kit Created Successfully");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to create starter kit: " . $e->getMessage(), [
                "validated_data" => $validated,
                "trace" => $e->getTraceAsString(),
            ]);

            return redirect()
                ->back()
                ->withInput()
                ->withErrors([
                    "error" =>
                        "Failed to create starter kit: " . $e->getMessage(),
                ]);
        }
    }

    public function edit($slug)
    {
        $starterKit = StarterKit::where("slug", $slug)
            ->with([
                "latestVersion",
                "stacks",
                "features",
                "steps" => fn($query) => $query->orderBy("order"),
            ])
            ->firstOrFail();

        return Inertia::render("Admin/StarterKits/Edit", [
            "starterKit" => $starterKit,
        ]);
    }

    public function update(Request $request, $slug)
    {
        $starterkit = StarterKit::where("slug", $slug)->firstOrFail();

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
            "is_featured" => "boolean",
            "status" => "required|in:draft,published",

            // Version
            "version" => "required|string|max:255",
            "version_repo_url" => "required|url",
            "version_repo_branch" => "nullable|string",
            "version_install_type" => "required|in:git,npm,composer",
            "version_install_command" => "nullable|string",
            "version_release_notes" => "nullable|string",

            // Stacks
            "stacks" => "nullable|array",
            "stacks.*.name" => "required|string",
            "stacks.*.version" => "nullable|string",

            // Features
            "features" => "nullable|array",
            "features.*" => "required|string",

            // Steps
            "steps" => "nullable|array",
            "steps.*.title" => "required|string",
            "steps.*.description" => "required|string",
            "steps.*.command" => "nullable|string",
            "steps.*.order" => "required|integer",
        ]);

        try {
            DB::beginTransaction();

            // Update starter kit
            $starterkit->update([
                "name" => $validated["name"],
                "slug" => $validated["slug"],
                "short_description" => $validated["short_description"],
                "description" => $validated["description"],
                "difficulty" => $validated["difficulty"],
                "setup_time_minutes" => $validated["setup_time_minutes"],
                "is_featured" => $validated["is_featured"] ?? false,
                "status" => $validated["status"],
            ]);

            // Update latest version
            if ($starterkit->latestVersion) {
                $starterkit->latestVersion->update([
                    "version" => $validated["version"],
                    "repo_url" => $validated["version_repo_url"],
                    "branch" => $validated["version_repo_branch"] ?? "main",
                    "install_type" => $validated["version_install_type"],
                    "install_command" => $validated["version_install_command"],
                    "release_notes" => $validated["version_release_notes"],
                ]);
            } else {
                // Create new version if doesn't exist
                $starterkit->versions()->create([
                    "version" => $validated["version"],
                    "repo_url" => $validated["version_repo_url"],
                    "branch" => $validated["version_repo_branch"] ?? "main",
                    "install_type" => $validated["version_install_type"],
                    "install_command" => $validated["version_install_command"],
                    "release_notes" => $validated["version_release_notes"],
                    "is_latest" => true,
                ]);
            }

            // Update stacks
            $starterkit->stacks()->delete();
            if (!empty($validated["stacks"])) {
                foreach ($validated["stacks"] as $stack) {
                    $starterkit->stacks()->create([
                        "name" => $stack["name"],
                        "version" => $stack["version"] ?? null,
                        "image" => null, // Field nullable
                    ]);
                }
            }

            // Update features
            $starterkit->features()->delete();
            if (!empty($validated["features"])) {
                foreach ($validated["features"] as $feature) {
                    $starterkit->features()->create(["name" => $feature]);
                }
            }

            // Update steps
            $starterkit->steps()->delete();
            if (!empty($validated["steps"])) {
                foreach ($validated["steps"] as $step) {
                    $starterkit->steps()->create([
                        "title" => $step["title"],
                        "description" => $step["description"],
                        "command" => $step["command"] ?? null, // Nullable
                        "order" => $step["order"],
                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route("admin.starter-kits.index")
                ->with("success", "Starter kit berhasil diupdate");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Failed to update starter kit: " . $e->getMessage(), [
                "starter_kit_id" => $starterkit->id,
                "slug" => $slug,
                "validated_data" => $validated,
                "trace" => $e->getTraceAsString(),
            ]);

            return back()
                ->withInput()
                ->withErrors([
                    "error" =>
                        "Failed to update starter kit: " . $e->getMessage(),
                ]);
        }
    }

    public function destroy($slug)
    {
        try {
            $starterkit = StarterKit::where("slug", $slug)->firstOrFail();
            $starterkit->delete();

            return back()->with("success", "Delete Starter Kit Successfully");
        } catch (\Exception $e) {
            Log::error("Failed to delete starter kit: " . $e->getMessage());

            return back()->withErrors([
                "error" => "Failed to delete starter kit: " . $e->getMessage(),
            ]);
        }
    }
}
