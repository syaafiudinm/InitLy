<?php

namespace App\Http\Controllers;

use App\Models\StarterKit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StarterKitController extends Controller
{
    public function index(Request $request)
    {
        $query = StarterKit::published()->with(["stacks", "latestVersion"]);

        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where("name", "like", "%{$search}%")->orWhere(
                    "short_description",
                    "like",
                    "%{$search}%",
                );
            });
        }

        if ($difficulty = $request->difficulty) {
            $query->difficulty($difficulty);
        }

        if ($stack = $request->stack) {
            $query->whereHas("stacks", fn($q) => $q->where("name", $stack));
        }

        return Inertia::render("StarterKits/Index", [
            "starterKits" => $query->paginate(5),
            "filters" => $request->only(["search", "difficulty", "stack"]),
        ]);
    }

    public function show(string $slug)
    {
        $starterKit = StarterKit::published()
            ->where("slug", $slug)
            ->with([
                "stacks",
                "latestVersion",
                "features",
                "screenshots",
                "steps",
            ])
            ->firstOrFail();

        return Inertia::render("StarterKits/Show", [
            "starterKit" => $starterKit,
        ]);
    }
}
