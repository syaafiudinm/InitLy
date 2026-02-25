<?php

namespace App\Http\Controllers;

use App\Models\StarterKit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavedStarterKitController extends Controller
{
    public function toggle(string $slug)
    {
        $kit = StarterKit::where("slug", $slug)->firstOrFail();
        $user = Auth::user();

        $isSaved = $user
            ->savedStarterKits()
            ->where("starter_kit_id", $kit->id)
            ->exists();

        if ($isSaved) {
            $user->savedStarterKits()->detach($kit->id);
            $saved = false;
        } else {
            $user->savedStarterKits()->attach($kit->id);
            $saved = true;
        }

        return back()->with([
            "saved" => $saved,
            "message" => $saved
                ? "Starter kit disimpan."
                : "Starter kit dihapus dari simpanan.",
        ]);
    }

    public function index()
    {
        $savedKits = Auth::user()
            ->savedStarterKits()
            ->with("latestVersion")
            ->get();

        return Inertia::render("Auth/SavedKits", [
            "savedKits" => $savedKits,
        ]);
    }
}
