import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Bookmark } from "lucide-react";
import { useState } from "react";

type LatestVersion = {
    version: string;
};

type StarterKit = {
    id: number;
    name: string;
    slug: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    is_saved: boolean;
    latest_version: LatestVersion | null;
};

type IndexProps = {
    starterKits: {
        data: StarterKit[];
    };
};

export default function Index({ starterKits }: IndexProps) {
    const { auth } = usePage<{ auth: { user: any } }>().props;

    return (
        <MainLayout>
            <Head title="Starter Kits" />
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-16 flex items-start justify-between">
                    <div>
                        <h1 className="mb-4 text-4xl font-bold tracking-tight">
                            Getting Started
                        </h1>
                        <p className="max-w-2xl text-lg text-slate-600">
                            A collection of clean, development-ready starter
                            kits for modern full-stack web development.
                        </p>
                    </div>
                    {auth.user && (
                        <Link
                            href="/saved-kits"
                            className="
                                inline-flex items-center gap-2
                                border border-gray-800
                                bg-white
                                text-gray-800
                                text-sm font-medium
                                px-4 py-2.5
                                rounded-lg
                                shadow-[2px_2px_0px] shadow-gray-800
                                transition-all duration-200
                                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-800
                            "
                        >
                            <Bookmark className="h-4 w-4" />
                            My Saved Kits
                        </Link>
                    )}
                </div>

                <h2 className="mb-8 text-2xl font-semibold">Starter Kits</h2>
                <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {starterKits.data.map((kit) => (
                        <Card
                            key={kit.slug}
                            kit={kit}
                            isLoggedIn={!!auth.user}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

type CardProps = {
    kit: StarterKit;
    isLoggedIn: boolean;
};

function Card({ kit, isLoggedIn }: CardProps) {
    const [saving, setSaving] = useState(false);

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn) {
            router.visit("/login");
            return;
        }

        setSaving(true);
        router.post(
            `/starter-kit/${kit.slug}/save`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    };

    const difficultyColor = {
        beginner: "bg-green-100 text-green-700",
        intermediate: "bg-yellow-100 text-yellow-700",
        advanced: "bg-red-100 text-red-700",
    };

    return (
        <div
            className="
                group relative flex flex-col gap-3
                rounded-xl
                border border-gray-800
                bg-white
                p-6
                shadow-[3px_3px_0px] shadow-gray-800
                transition-all duration-200
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px] active:shadow-gray-800
            "
        >
            {/* Header: Name + Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href={`/starter-kit/${kit.slug}`}
                    className="font-semibold text-gray-900 hover:underline"
                >
                    {kit.name}
                </Link>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                            kit.is_saved
                                ? "text-gray-800"
                                : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                        title={kit.is_saved ? "Unsave" : "Save"}
                    >
                        <Bookmark
                            className="h-4 w-4"
                            fill={kit.is_saved ? "currentColor" : "none"}
                        />
                    </button>
                    <Link href={`/starter-kit/${kit.slug}`}>
                        <svg
                            className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Description */}
            <Link href={`/starter-kit/${kit.slug}`}>
                <p className="text-sm text-slate-600 leading-relaxed">
                    {kit.description}
                </p>
            </Link>

            {/* Footer: Version + Difficulty */}
            <div className="flex items-center gap-2 mt-auto pt-2">
                {kit.latest_version && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        v{kit.latest_version.version}
                    </span>
                )}
                {kit.difficulty && (
                    <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[kit.difficulty]}`}
                    >
                        {kit.difficulty}
                    </span>
                )}
            </div>
        </div>
    );
}
