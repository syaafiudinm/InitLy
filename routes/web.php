<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\StarterKitController;
use App\Http\Controllers\SavedStarterKitController;
use App\Http\Controllers\Admin\StarterKitController as AdminStarterKitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Home
Route::get("/", function () {
    return Inertia::render("Home");
})->name("home");

// Public starter kit routes
Route::get("/starter-kit", [StarterKitController::class, "index"]);
Route::get("/starter-kit/{slug}", [StarterKitController::class, "show"]);

// Guest routes (login & register) — hanya bisa diakses kalau belum login
Route::middleware("guest")->group(function () {
    Route::get("/login", [AuthController::class, "loginPage"])->name("login");
    Route::post("/login", [AuthController::class, "login"])->name(
        "login.store",
    );

    Route::get("/register", [AuthController::class, "registerPage"])->name(
        "register",
    );
    Route::post("/register", [AuthController::class, "register"])->name(
        "register.store",
    );
});

// Logout
Route::post("/logout", [AuthController::class, "logout"])
    ->middleware("auth")
    ->name("logout");

// Authenticated user routes (semua role)
Route::middleware(["auth"])->group(function () {
    // Toggle save/unsave starter kit
    Route::post("/starter-kit/{slug}/save", [
        SavedStarterKitController::class,
        "toggle",
    ])->name("starter-kit.save.toggle");

    // Halaman saved kits
    Route::get("/saved-kits", [
        SavedStarterKitController::class,
        "index",
    ])->name("saved-kits.index");
});

// Admin routes — hanya role admin
Route::middleware(["auth", "role:admin"])
    ->prefix("admin")
    ->group(function () {
        Route::get("/starter-kits", [
            AdminStarterKitController::class,
            "index",
        ])->name("admin.starter-kits.index");

        Route::get("/starter-kits/create", [
            AdminStarterKitController::class,
            "create",
        ])->name("admin.starter-kits.create");

        Route::post("/starter-kits", [
            AdminStarterKitController::class,
            "store",
        ])->name("admin.starter-kits.store");

        Route::get("/starter-kits/{slug}/edit", [
            AdminStarterKitController::class,
            "edit",
        ])->name("admin.starter-kits.edit");

        Route::put("/starter-kits/{slug}", [
            AdminStarterKitController::class,
            "update",
        ])->name("admin.starter-kits.update");

        Route::delete("/starter-kits/{slug}", [
            AdminStarterKitController::class,
            "destroy",
        ])->name("admin.starter-kits.destroy");
    });
