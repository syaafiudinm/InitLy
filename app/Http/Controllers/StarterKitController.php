<?php

namespace App\Http\Controllers;

use App\Models\StarterKit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StarterKitController extends Controller
{
    public function index()
    {
        $starterKits = StarterKit::published()
            ->with(["stacks", "latestVersion"])
            ->orderBy("is_featured", "desc")
            ->orderBy("created_at", "desc");

        return Inertia::render("StarterKits/Index", [
            "starterKits" => $starterKits->get(),
        ]);
    }

    public function show(string $slug)
    {
        $starterKit = StarterKit::published()
            ->where("slug", $slug)
            ->with(["stacks", "latestVersion", "features", "schreenshots"])
            ->firstOrFail();

        return Inertia::render("StarterKits/Show", [
            "starterKit" => $starterKit,
        ]);
    }
}
