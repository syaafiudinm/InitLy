<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create();

        User::factory()->create([
            "name" => "InitLy",
            "email" => "initly@admin.com",
            "password" => bcrypt("initly123"),
        ]);
    }
}
