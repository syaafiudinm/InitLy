<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StarterKit;
use Illuminate\Http\Request;
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
        $data = $request->validate([
            "name" => "required|string",
            "slug" => "required|unique:starter_kits",
            "short_description" => "required",
            "description" => "required",
            "difficulty" => "required",
        ]);

        StarterKit::created($data);

        return redirect()
            ->route("admin.starter-kits.index")
            ->with("success", "Starter Kit Created Successfully");
    }

    public function edit(StarterKit $starterKit)
    {
        return Inertia::render("Admin/StarterKits/Edit", [
            "starterKit" => $starterKit,
        ]);
    }

    public function update(Request $request, StarterKit $starterkit)
    {
        $data = $request->validate([
            "name" => "required|string",
            "slug" => "required|unique:starter_kits",
            "short_description" => "required",
            "description" => "required",
            "difficulty" => "required",
        ]);

        $starterkit->update($data);

        return back()->with("success", "Starter Kit Updated Successfully");
    }

    public function destroy(StarterKit $starterkit)
    {
        $starterkit->delete();

        return back()->with("success", "Delete Starter Kit Successfully");
    }
}
