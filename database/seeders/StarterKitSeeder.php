<?php

namespace Database\Seeders;

use App\Models\StarterKit;
use Illuminate\Database\Seeder;

class StarterKitSeeder extends Seeder
{
    public function run(): void
    {
        $kits = [
            [
                "kit" => [
                    "name" => "Laravel + Inertia.js",
                    "slug" => "laravel-inertia",
                    "short_description" =>
                        "Modern full-stack Laravel with Vue 3 and Inertia.js",
                    "description" =>
                        "Complete starter kit dengan Laravel 11, Vue 3, Inertia.js, dan Tailwind CSS. Sudah include authentication, routing, dan best practices untuk membangun SPA modern.",
                    "difficulty" => "intermediate",
                    "setup_time_minutes" => 10,
                    "is_featured" => true,
                    "status" => "published",
                ],
                "version" => [
                    "version" => "1.0.0",
                    "repo_url" =>
                        "https://github.com/syaafiudinm/inertia-starter-kit.git",
                    "branch" => "main",
                    "install_type" => "git",
                    "install_command" => "composer install && npm install",
                    "releases_notes" =>
                        "Initial release with Laravel 11 and Inertia.js",
                    "is_latest" => true,
                ],
                "stacks" => [
                    [
                        "name" => "Laravel",
                        "version" => "11.x",
                        "image" => "laravel/laravel",
                    ],
                    [
                        "name" => "React",
                        "version" => "18.x",
                        "image" => "React/react",
                    ],
                    [
                        "name" => "Inertia.js",
                        "version" => "1.x",
                        "image" => "inertiajs/inertia",
                    ],
                    [
                        "name" => "Tailwind CSS",
                        "version" => "4.x",
                        "image" => "tailwindcss/tailwindcss",
                    ],
                    [
                        "name" => "TypeScript",
                        "version" => "4.x",
                        "image" => "typescript/typescript",
                    ],
                ],
                "features" => [
                    "Exclude Authentication",
                    "Tailwind CSS styling",
                    "TypeScript support",
                    "ESLint & Prettier configured",
                ],
                "steps" => [
                    [
                        "title" => "Clone Repository",
                        "description" =>
                            "Clone the starter kit repository to your local machine",
                        "command" =>
                            "git clone https://github.com/syaafiudinm/InitLy.git my-project",
                        "order" => 1,
                    ],
                    [
                        "title" => "Install Dependencies",
                        "description" =>
                            "Install PHP and JavaScript dependencies",
                        "command" => "composer install && npm install",
                        "order" => 2,
                    ],
                    [
                        "title" => "Environment Setup",
                        "description" =>
                            "Copy environment file and generate application key",
                        "command" =>
                            "cp .env.example .env && php artisan key:generate",
                        "order" => 3,
                    ],
                    [
                        "title" => "Database Setup",
                        "description" => "Create database and run migrations",
                        "command" => "php artisan migrate",
                        "order" => 4,
                    ],
                    [
                        "title" => "Start Development Server",
                        "description" =>
                            "Run Laravel development server and Vite",
                        "command" => "php artisan serve & npm run dev",
                        "order" => 5,
                    ],
                ],
            ],
        ];

        foreach ($kits as $data) {
            $kit = StarterKit::create($data["kit"]);

            // Create version
            $kit->versions()->create($data["version"]);

            // Create stacks
            foreach ($data["stacks"] as $stack) {
                $kit->stacks()->create($stack);
            }

            // Create features
            foreach ($data["features"] as $feature) {
                $kit->features()->create(["name" => $feature]);
            }

            // Create steps
            if (isset($data["steps"])) {
                foreach ($data["steps"] as $step) {
                    $kit->steps()->create($step);
                }
            }

            // Initialize stats
            $kit->stats()->create([
                "starter_kit_id" => $kit->id,
                "installs_count" => 0,
                "last_installed_at" => null,
            ]);
        }
    }
}
