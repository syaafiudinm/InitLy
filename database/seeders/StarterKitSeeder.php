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
                    "repo_url" => "https://github.com/syaafiudinm/InitLy.git",
                    "branch" => "main",
                    "install_type" => "git",
                    "install_command" => "composer install && npm install",
                    "releases_notes" =>
                        "Initial release with Laravel 11 and Inertia.js",
                    "is_latest" => true,
                ],
                "stacks" => [
                    ["name" => "Laravel", "version" => "11.x"],
                    ["name" => "Vue", "version" => "3.x"],
                    ["name" => "Inertia.js", "version" => "1.x"],
                    ["name" => "Tailwind CSS", "version" => "3.x"],
                ],
                "features" => [
                    "Authentication (Login, Register, Password Reset)",
                    "User Dashboard",
                    "Tailwind CSS styling",
                    "Hot Module Replacement (HMR)",
                    "TypeScript support",
                    "ESLint & Prettier configured",
                ],
            ],
            [
                "kit" => [
                    "name" => "MERN Stack",
                    "slug" => "mern-stack",
                    "short_description" =>
                        "MongoDB, Express, React, and Node.js starter",
                    "description" =>
                        "Full MERN stack boilerplate dengan React, Redux Toolkit, MongoDB, Express.js, dan JWT authentication. Perfect untuk membangun REST API dan modern web apps.",
                    "difficulty" => "intermediate",
                    "setup_time_minutes" => 15,
                    "is_featured" => true,
                    "status" => "published",
                ],
                "version" => [
                    "version" => "2.1.0",
                    "repo_url" => "https://github.com/example/mern-starter.git",
                    "branch" => "main",
                    "install_type" => "git",
                    "install_command" =>
                        "npm install && cd client && npm install",
                    "releases_notes" => "Updated to React 18 and Redux Toolkit",
                    "is_latest" => true,
                ],
                "stacks" => [
                    ["name" => "MongoDB", "version" => "7.x"],
                    ["name" => "Express", "version" => "4.x"],
                    ["name" => "React", "version" => "18.x"],
                    ["name" => "Node.js", "version" => "20.x"],
                    ["name" => "Redux Toolkit", "version" => "2.x"],
                ],
                "features" => [
                    "JWT Authentication",
                    "Redux state management",
                    "REST API structure",
                    "MongoDB with Mongoose",
                    "Environment variables setup",
                    "Error handling middleware",
                ],
            ],
            [
                "kit" => [
                    "name" => "Next.js + Prisma",
                    "slug" => "nextjs-prisma",
                    "short_description" =>
                        "Next.js 14 with Prisma ORM and PostgreSQL",
                    "description" =>
                        "Modern Next.js starter dengan App Router, Prisma ORM, PostgreSQL, NextAuth.js, dan Tailwind CSS. Support Server Components dan API Routes.",
                    "difficulty" => "beginner",
                    "setup_time_minutes" => 8,
                    "is_featured" => false,
                    "status" => "published",
                ],
                "version" => [
                    "version" => "1.5.0",
                    "repo_url" =>
                        "https://github.com/example/nextjs-prisma.git",
                    "branch" => "main",
                    "install_type" => "git",
                    "install_command" => "npm install && npx prisma generate",
                    "releases_notes" => "Added Next.js 14 App Router support",
                    "is_latest" => true,
                ],
                "stacks" => [
                    ["name" => "Next.js", "version" => "14.x"],
                    ["name" => "Prisma", "version" => "5.x"],
                    ["name" => "PostgreSQL", "version" => "16.x"],
                    ["name" => "NextAuth.js", "version" => "4.x"],
                    ["name" => "Tailwind CSS", "version" => "3.x"],
                ],
                "features" => [
                    "App Router (Next.js 14)",
                    "Server Components",
                    "Prisma ORM setup",
                    "Authentication with NextAuth",
                    "TypeScript configured",
                    "API Routes examples",
                ],
            ],
            [
                "kit" => [
                    "name" => "Django REST API",
                    "slug" => "django-rest",
                    "short_description" => "Django with Django REST Framework",
                    "description" =>
                        "Production-ready Django REST API boilerplate dengan JWT auth, PostgreSQL, Celery untuk async tasks, dan comprehensive testing setup.",
                    "difficulty" => "advanced",
                    "setup_time_minutes" => 20,
                    "is_featured" => false,
                    "status" => "published",
                ],
                "version" => [
                    "version" => "3.0.0",
                    "repo_url" =>
                        "https://github.com/example/django-rest-starter.git",
                    "branch" => "main",
                    "install_type" => "git",
                    "install_command" =>
                        "pip install -r requirements.txt && python manage.py migrate",
                    "releases_notes" => "Major update with Django 5.0",
                    "is_latest" => true,
                ],
                "stacks" => [
                    ["name" => "Django", "version" => "5.0"],
                    ["name" => "Django REST Framework", "version" => "3.14"],
                    ["name" => "PostgreSQL", "version" => "16.x"],
                    ["name" => "Celery", "version" => "5.3"],
                    ["name" => "Redis", "version" => "7.x"],
                ],
                "features" => [
                    "JWT Authentication",
                    "Django REST Framework",
                    "Celery async tasks",
                    "Redis caching",
                    "Swagger API documentation",
                    "Unit & integration tests",
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

            // Initialize stats
            $kit->stats()->create([
                "starter_kit_id" => $kit->id,
                "installs_count" => 0,
                "last_installed_at" => null,
            ]);
        }
    }
}
