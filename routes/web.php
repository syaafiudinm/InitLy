<?php

use App\Http\Controllers\StarterKitController;
use App\Http\Controllers\Admin\StarterKitController as AdminStarterKitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("Home");
});

Route::get("/starter-kit", [StarterKitController::class, "index"]);
Route::get("/starter-kit/{id}", [StarterKitController::class, "show"]);

Route::get("/admin/starter-kits", [AdminStarterKitController::class, "index"]);
Route::get("/admin/create/starter-kit", [
    AdminStarterKitController::class,
    "create",
]);
Route::post("admin/create/starter-kit", [
    AdminStarterKitController::class,
    "store",
]);
Route::get("/admin/edit/starter-kit/{slug}", [
    AdminStarterKitController::class,
    "edit",
]);
Route::post("/admin/edit/starter-kit/{slug}", [
    AdminStarterKitController::class,
    "update",
]);
Route::get("/admin/delete/starter-kit/{slug}", [
    AdminStarterKitController::class,
    "destroy",
]);
