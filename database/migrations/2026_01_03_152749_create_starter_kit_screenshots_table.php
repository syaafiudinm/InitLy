<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("starter_kit_screenshots", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("starter_kit_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->string("image_path");
            $table->unsignedSmallInteger("order")->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("starter_kit_screenshoots");
    }
};
