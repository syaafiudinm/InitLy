<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\StarterKitController;
use App\Http\Controllers\Admin\StarterKitController as AdminStarterKitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//ini di halaman home
Route::get("/", function () {
    return Inertia::render("Home");
});

// Route::get("/starter-kits", [StarterKitController::class, "index"]);
// Route::get("/starter-kit/{id}", [StarterKitController::class, "show"]);
//ini yang ko implementasikan kemarin
Route::get("/starter-kit", [StarterKitController::class, "index"]);
Route::get("/starter-kit/{slug}", [StarterKitController::class, "show"]);

// ini rute untuk login, jadi kalau sudah login, tidak bisa masuk ke halaman login
Route::middleware("guest")->group(function () {
    Route::get("/login", [AuthController::class, "loginPage"])->name("login");
    Route::post("/login", [AuthController::class, "login"])->name(
        "login.store",
    );
});

//ini untuk logout, saya protect pakai middleware "auth"
Route::post("/logout", [AuthController::class, "logout"])
    ->middleware("auth")
    ->name("logout");

// FIX: Redirect authenticated users yang akses /admin ke /admin/starter-kits
// Route::middleware(["auth"])->group(function () {
//     Route::get("/admin/", function () {
//         return redirect()->route("admin.starter-kits.index");
//     })->name("admin.");
// });

// FIX: Admin routes dengan nama yang konsisten
Route::middleware(["auth"])
    ->prefix("admin")
    ->group(function () {
        // FIX: Starter kits routes dengan nama yang jelas
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
