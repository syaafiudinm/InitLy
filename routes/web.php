<?php

use App\Http\Controllers\StarterKitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("Home");
});

Route::get("/starter-kit", [StarterKitController::class, "index"]);
Route::get("/starter-kit/{id}", [StarterKitController::class, "show"]);

// Route::middleware(["auth"])
//     ->prefix("admin")
//     ->name("admin.")
//     ->group(function () {
//         Route::resource("starter-kits", Admin / StarterKitController::class);
//     });
