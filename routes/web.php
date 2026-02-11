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

Route::get("/starter-kits", [StarterKitController::class, "index"]);
Route::get("/starter-kit/{id}", [StarterKitController::class, "show"]);
//ini yang ko implementasikan kemarin
Route::get("/starter-kit", [StarterKitController::class, "index"]);
Route::get("/starter-kit/{slug}", [StarterKitController::class, "show"]);

// ini rute untuk login, jadi kalau sudah login, tidak bisai masuk ke halaman login
Route::middleware("guests")->group(function () {
    Route::get("/login", [AuthController::class, "loginPage"]);
    Route::post("/login", [AuthController::class, "login"]);
});

//ini untuk logout, saya protect pakai middleware "auth"
Route::post("/logout", [AuthController::class, "logout"])
    ->middleware("auth")
    ->name("logout");

// ini rute starterkit untuk admin ekal, saya pakekan prefix dan sudah ku protect sama middleware "auth",
// template nama rutenya itu admin.starter-kits.index
Route::middleware(["auth"])
    ->prefix("admin")
    ->name("admin.")
    ->group(function () {
        Route::get("/starter-kits", [
            AdminStarterKitController::class,
            "index",
        ]);
        Route::get("/create/starter-kit", [
            AdminStarterKitController::class,
            "create",
        ]);
        Route::post("/create/starter-kit", [
            AdminStarterKitController::class,
            "store",
        ]);
        Route::get("/edit/starter-kit/{slug}", [
            AdminStarterKitController::class,
            "edit",
        ]);
        Route::put("/edit/starter-kit/{slug}", [
            AdminStarterKitController::class,
            "update",
        ]);
        Route::delete("/delete/starter-kit/{slug}", [
            AdminStarterKitController::class,
            "destroy",
        ]);
    });
