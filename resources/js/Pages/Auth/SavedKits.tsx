import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Bookmark, ArrowLeft, Trash2 } from "lucide-react";
import { useState } from "react";

type StarterKit = {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    version: Version;
};

type Version = {
    number: string;
    repo_url: string;
    branch: string;
    install_type: "git" | "zip" | string;
    install_command: string;
    release_notes: string | null;
};

type SavedKitsProps = {
    savedKits: StarterKit[];
};

export default function SavedKits({ savedKits }: SavedKitsProps) {
    return (
        <MainLayout>
            <Head title="My Saved Kits" />
            <div className="mx-auto max-w-6xl px-6 py-16">
                {/* Header */}
                <div className="flex items-start justify-between mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Bookmark className="h-7 w-7 text-gray-800" />
                            <h1 className="text-4xl font-bold tracking-tight">
                                My Saved Kits
                            </h1>
                        </div>
                        <p className="max-w-2xl text-lg text-slate-600">
                            Your collection of saved starter kits for quick
                            access.
                        </p>
                    </div>
                    <Link
                        href="/starter-kit"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Browse Kits
                    </Link>
                </div>

                {/* Content */}
                {savedKits.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {savedKits.map((kit) => (
                            <SavedCard key={kit.id} kit={kit} />
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300">
                <Bookmark className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
                No saved kits yet
            </h3>
            <p className="mb-8 max-w-sm text-sm text-gray-500">
                Browse our starter kits and save the ones you like for quick
                access later.
            </p>
            <Link
                href="/starter-kit"
                className="
                    inline-flex items-center justify-center gap-2
                    border border-gray-800
                    bg-gray-800
                    text-white
                    font-medium
                    px-6 py-3
                    rounded-lg
                    shadow-[3px_3px_0px] shadow-gray-500
                    transition-all duration-200
                    hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                    active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px] active:shadow-gray-500
                "
            >
                <span>🚀</span>
                Explore Starter Kits
            </Link>
        </div>
    );
}

function SavedCard({ kit }: { kit: StarterKit }) {
    const [removing, setRemoving] = useState(false);

    const handleUnsave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setRemoving(true);
        router.post(
            `/starter-kit/${kit.slug}/save`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setRemoving(false),
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
            "
        >
            {/* Unsave Button */}
            <button
                onClick={handleUnsave}
                disabled={removing}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Remove from saved"
            >
                <Trash2 className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{kit.name}</h3>
                {kit.difficulty && (
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[kit.difficulty]}`}
                    >
                        {kit.difficulty}
                    </span>
                )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {kit.short_description || kit.description}
            </p>

            {kit.version && (
                <div className="text-xs text-gray-400">
                    {kit.version.number}
                </div>
            )}

            <Link
                href={`/starter-kit/${kit.slug}`}
                className="
                    mt-2 inline-flex items-center justify-center
                    border border-gray-800
                    bg-gray-800
                    text-white
                    text-sm font-medium
                    px-4 py-2
                    rounded-lg
                    transition-colors
                    hover:bg-gray-900
                "
            >
                View Details
            </Link>
        </div>
    );
}
