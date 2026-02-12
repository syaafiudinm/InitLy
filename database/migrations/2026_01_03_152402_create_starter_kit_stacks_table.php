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
        Schema::create("starter_kit_stacks", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("starter_kit_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->string("name");
            $table->string("version")->nullable();
            $table->string("image")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("starter_kit_stacks");
    }
};
