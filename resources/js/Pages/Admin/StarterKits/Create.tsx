import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface FormData {
    name: string;
    slug: string;
    short_description: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    setup_time_minutes: number;
    is_featured: boolean;
    status: "draft" | "published";
    version: string;
    version_repo_url: string;
    version_repo_branch: string;
    version_install_type: "git" | "npm" | "composer";
    version_install_command: string;
    version_release_notes: string;
    stacks: Array<{ name: string; version: string }>;
    features: string[];
    steps: Array<{
        title: string;
        description: string;
        command: string;
        order: number;
    }>;
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: "",
        slug: "",
        short_description: "",
        description: "",
        difficulty: "beginner",
        setup_time_minutes: 10,
        is_featured: false,
        status: "draft",
        version: "1.0.0",
        version_repo_url: "",
        version_repo_branch: "main",
        version_install_type: "git",
        version_install_command: "",
        version_release_notes: "",
        stacks: [],
        features: [],
        steps: [],
    });

    const [newStack, setNewStack] = useState({ name: "", version: "" });
    const [newFeature, setNewFeature] = useState("");
    const [newStep, setNewStep] = useState({
        title: "",
        description: "",
        command: "",
    });

    // Generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim();
    };

    const handleNameChange = (name: string) => {
        setData("name", name);
        if (!data.slug) {
            setData("slug", generateSlug(name));
        }
    };

    const addStack = () => {
        if (newStack.name) {
            setData("stacks", [...data.stacks, newStack]);
            setNewStack({ name: "", version: "" });
        }
    };

    const removeStack = (index: number) => {
        setData(
            "stacks",
            data.stacks.filter((_, i) => i !== index),
        );
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setData("features", [...data.features, newFeature.trim()]);
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        setData(
            "features",
            data.features.filter((_, i) => i !== index),
        );
    };

    const addStep = () => {
        if (newStep.title && newStep.description) {
            setData("steps", [
                ...data.steps,
                { ...newStep, order: data.steps.length + 1 },
            ]);
            setNewStep({ title: "", description: "", command: "" });
        }
    };

    const removeStep = (index: number) => {
        const updatedSteps = data.steps
            .filter((_, i) => i !== index)
            .map((step, i) => ({ ...step, order: i + 1 }));
        setData("steps", updatedSteps);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/admin/create/starter-kit");
    };

    return (
        <AdminLayout>
            <Head title="Create Starter Kit" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-700 mb-2">
                                Create Starter Kit
                            </h1>
                            <p className="text-gray-500">
                                Add a new starter kit to your collection
                            </p>
                        </div>
                        <Link
                            href="/admin/starter-kits"
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            ← Back to Starter Kits
                        </Link>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.name}
                                        onChange={(e) =>
                                            handleNameChange(e.target.value)
                                        }
                                        placeholder="Laravel React Starter Kit"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Slug *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        placeholder="laravel-react-starter-kit"
                                    />
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Short Description *
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    value={data.short_description}
                                    onChange={(e) =>
                                        setData(
                                            "short_description",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="A modern Laravel application with React frontend"
                                    maxLength={255}
                                />
                                {errors.short_description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.short_description}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Detailed description of your starter kit..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Difficulty *
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.difficulty}
                                        onChange={(e) =>
                                            setData(
                                                "difficulty",
                                                e.target.value as any,
                                            )
                                        }
                                    >
                                        <option value="beginner">
                                            Beginner
                                        </option>
                                        <option value="intermediate">
                                            Intermediate
                                        </option>
                                        <option value="advanced">
                                            Advanced
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Setup Time (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.setup_time_minutes}
                                        onChange={(e) =>
                                            setData(
                                                "setup_time_minutes",
                                                parseInt(e.target.value),
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status *
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                "status",
                                                e.target.value as any,
                                            )
                                        }
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-gray-700 focus:ring-gray-700 border-gray-300 rounded"
                                        checked={data.is_featured}
                                        onChange={(e) =>
                                            setData(
                                                "is_featured",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        Featured starter kit
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Version Information */}
                        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Version Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Version *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.version}
                                        onChange={(e) =>
                                            setData("version", e.target.value)
                                        }
                                        placeholder="1.0.0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Install Type *
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.version_install_type}
                                        onChange={(e) =>
                                            setData(
                                                "version_install_type",
                                                e.target.value as any,
                                            )
                                        }
                                    >
                                        <option value="git">Git Clone</option>
                                        <option value="npm">NPM Package</option>
                                        <option value="composer">
                                            Composer Package
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Repository URL *
                                </label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    value={data.version_repo_url}
                                    onChange={(e) =>
                                        setData(
                                            "version_repo_url",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="https://github.com/username/repo"
                                />
                                {errors.version_repo_url && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.version_repo_url}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Repository Branch
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.version_repo_branch}
                                        onChange={(e) =>
                                            setData(
                                                "version_repo_branch",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="main"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Install Command
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                        value={data.version_install_command}
                                        onChange={(e) =>
                                            setData(
                                                "version_install_command",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="composer install"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Release Notes
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    value={data.version_release_notes}
                                    onChange={(e) =>
                                        setData(
                                            "version_release_notes",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="What's new in this version..."
                                />
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Tech Stack
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <input
                                    type="text"
                                    className="px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    placeholder="Technology name (e.g. Laravel)"
                                    value={newStack.name}
                                    onChange={(e) =>
                                        setNewStack({
                                            ...newStack,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    className="px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    placeholder="Version (e.g. 10.x)"
                                    value={newStack.version}
                                    onChange={(e) =>
                                        setNewStack({
                                            ...newStack,
                                            version: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={addStack}
                                    className="bg-gray-700 text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Add Stack
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data.stacks.map((stack, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 px-3 py-2 rounded-full text-sm flex items-center gap-2"
                                    >
                                        <span>
                                            {stack.name}{" "}
                                            {stack.version &&
                                                `v${stack.version}`}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeStack(index)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Features
                            </h2>

                            <div className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    placeholder="Feature name (e.g. Authentication)"
                                    value={newFeature}
                                    onChange={(e) =>
                                        setNewFeature(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Add Feature
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 px-3 py-2 rounded-full text-sm flex items-center gap-2"
                                    >
                                        <span>{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Installation Steps */}
                        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Installation Steps
                            </h2>

                            <div className="space-y-4 mb-4">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    placeholder="Step title (e.g. Clone Repository)"
                                    value={newStep.title}
                                    onChange={(e) =>
                                        setNewStep({
                                            ...newStep,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    rows={2}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    placeholder="Step description"
                                    value={newStep.description}
                                    onChange={(e) =>
                                        setNewStep({
                                            ...newStep,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none"
                                    placeholder="Command (optional)"
                                    value={newStep.command}
                                    onChange={(e) =>
                                        setNewStep({
                                            ...newStep,
                                            command: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={addStep}
                                    className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Add Step
                                </button>
                            </div>

                            <div className="space-y-3">
                                {data.steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-4 rounded-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                                                        {step.order}
                                                    </span>
                                                    <h4 className="font-medium text-gray-700">
                                                        {step.title}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {step.description}
                                                </p>
                                                {step.command && (
                                                    <code className="text-xs bg-gray-200 px-2 py-1 rounded">
                                                        {step.command}
                                                    </code>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeStep(index)
                                                }
                                                className="text-gray-500 hover:text-red-600 ml-4"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-4 pt-6">
                            <Link
                                href="/admin/starter-kits"
                                className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-gray-700 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing
                                    ? "Creating..."
                                    : "Create Starter Kit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
