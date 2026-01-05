<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StarterKitController;

Route::get("/user", function (Request $request) {
    return $request->user();
})->middleware("auth:sanctum");

Route::prefix("v1")->group(function () {
    Route::get("/starter-kits", [StarterKitController::class, "index"]);
    Route::get("/starter-kits/{slug}", [StarterKitController::class, "show"]);
    Route::post("/starter-kits/{slug}/track-install", [
        StarterKitController::class,
        "trackInstall",
    ]);
    Route::get("/stacks", [StarterKitController::class, "stacks"]);
});
