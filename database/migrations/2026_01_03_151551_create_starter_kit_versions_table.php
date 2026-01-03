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
        Schema::create("starter_kit_versions", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("starter_kit_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->string("version");
            $table->string("repo_url");
            $table->string("branch")->default("main");
            $table->enum("install_type", ["npx", "git", "npm"]);
            $table->string("install_command");
            $table->text("releases_notes")->nullable();
            $table->boolean("is_latest")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("starter_kits_versisons");
    }
};
