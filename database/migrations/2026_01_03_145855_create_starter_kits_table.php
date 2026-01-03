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
        Schema::create("starter_kits", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("slug")->unique();
            $table->string("short_description");
            $table->text("description");
            $table->enum("difficulty", [
                "beginner",
                "intermediate",
                "advanced",
            ]);
            $table->unsignedSmallInteger("setup_time_minutes")->default(5);
            $table->boolean("is_featured")->default(false);
            $table->enum("status", ["draft", "published"])->default("draft");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("starter_kits");
    }
};
