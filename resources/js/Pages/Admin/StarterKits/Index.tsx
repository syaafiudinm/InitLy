import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Pen, Trash } from "lucide-react";

interface StarterKit {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    setup_time_minutes: number;
    status: "draft" | "published";
    is_featured: number;
    created_at: string;
    latest_version?: {
        id: number;
        starter_kit_id: number;
        version: string;
        repo_url: string;
        branch: string;
        install_type: string;
        install_command: string;
        releases_notes: string;
        is_latest: number;
        created_at: string;
        updated_at: string;
    };
    stats?: {
        installs_count: number;
    };
}

interface Props {
    starterKits: StarterKit[];
}

export default function Index({ starterKits }: Props) {
    const handleDelete = (slug: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(`/admin/starter-kits/${slug}`, {
                onSuccess: () => {
                    console.log("Starter kit deleted successfully");
                },
                onError: (error) => {
                    console.error(error);
                },
            });
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner":
                return "bg-green-100 text-green-800";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800";
            case "advanced":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (status: string) => {
        return status === "published"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800";
    };

    return (
        <AdminLayout>
            <Head title="Starter Kits" />
            <div className="min-h-screen bg-gray-50 p-4 md:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-1 md:mb-2">
                                Starter Kits
                            </h1>
                            <p className="text-sm md:text-base text-gray-500">
                                Manage your collection of starter kits
                            </p>
                        </div>
                        <Link
                            href="/admin/starter-kits/create"
                            className="bg-gray-700 text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center text-sm md:text-base"
                        >
                            + New Kit
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                        <div className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 shadow-sm">
                            <p className="text-xs md:text-sm text-gray-600">
                                Total Kits
                            </p>
                            <p className="text-xl md:text-2xl font-semibold text-gray-700">
                                {starterKits.length}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 shadow-sm">
                            <p className="text-xs md:text-sm text-gray-600">
                                Published
                            </p>
                            <p className="text-xl md:text-2xl font-semibold text-gray-700">
                                {
                                    starterKits.filter(
                                        (kit) => kit.status === "published",
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 shadow-sm">
                            <p className="text-xs md:text-sm text-gray-600">
                                Featured
                            </p>
                            <p className="text-xl md:text-2xl font-semibold text-gray-700">
                                {
                                    starterKits.filter((kit) => kit.is_featured)
                                        .length
                                }
                            </p>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-100 p-3 md:p-4 shadow-sm">
                            <p className="text-xs md:text-sm text-gray-600">
                                Total Installs
                            </p>
                            <p className="text-xl md:text-2xl font-semibold text-gray-700">
                                {starterKits.reduce(
                                    (sum, kit) =>
                                        sum + (kit.stats?.installs_count || 0),
                                    0,
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Starter Kits */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                        {starterKits.length === 0 ? (
                            <div className="text-center py-12 px-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <div className="w-8 h-8 bg-gray-400 rounded"></div>
                                </div>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">
                                    No starter kits found
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Get started by creating your first starter
                                    kit
                                </p>
                                <Link
                                    href="/admin/starter-kits/create"
                                    className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Create Starter Kit
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Mobile Card View */}
                                <div className="md:hidden divide-y divide-gray-100">
                                    {starterKits.map((kit) => (
                                        <div
                                            key={kit.id}
                                            className="p-4 space-y-3"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="font-medium text-gray-700">
                                                            {kit.name}
                                                        </p>
                                                        {kit.is_featured ===
                                                            1 && (
                                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                        {kit.short_description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <Link
                                                        href={`/admin/starter-kits/${kit.slug}/edit`}
                                                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <Pen className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                kit.slug,
                                                                kit.name,
                                                            )
                                                        }
                                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                    v
                                                    {kit.latest_version
                                                        ?.version || "N/A"}
                                                </span>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(kit.difficulty)}`}
                                                >
                                                    {kit.difficulty}
                                                </span>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(kit.status)}`}
                                                >
                                                    {kit.status}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {kit.stats
                                                        ?.installs_count ||
                                                        0}{" "}
                                                    installs
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {kit.setup_time_minutes} min
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desktop Table View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                                    Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                                    Version
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                                    Difficulty
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                                    Installs
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                                    Setup Time
                                                </th>
                                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {starterKits.map((kit) => (
                                                <tr
                                                    key={kit.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium text-gray-700">
                                                                    {kit.name}
                                                                </p>
                                                                {kit.is_featured ===
                                                                    1 && (
                                                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                                                        Featured
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {
                                                                    kit.short_description
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">
                                                            {kit.latest_version
                                                                ?.version ||
                                                                "N/A"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(kit.difficulty)}`}
                                                        >
                                                            {kit.difficulty}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(kit.status)}`}
                                                        >
                                                            {kit.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">
                                                            {kit.stats
                                                                ?.installs_count ||
                                                                0}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">
                                                            {
                                                                kit.setup_time_minutes
                                                            }{" "}
                                                            min
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={`/admin/starter-kits/${kit.slug}/edit`}
                                                                className="text-gray-600 hover:text-gray-800 transition-colors"
                                                            >
                                                                <Pen className="w-5 h-5" />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        kit.slug,
                                                                        kit.name,
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-800 transition-colors"
                                                            >
                                                                <Trash className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
