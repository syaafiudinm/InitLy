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
        Schema::create("starter_kit_stats", function (Blueprint $table) {
            $table
                ->foreignId("starter_kit_id")
                ->primary()
                ->constrained()
                ->cascadeOnDelete();
            $table->unsignedBigInteger("installs_count")->default(0);
            $table->timestamp("last_installed_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("starter_kit_stats");
    }
};
