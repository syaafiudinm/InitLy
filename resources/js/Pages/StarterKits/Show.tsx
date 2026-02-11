import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { highlightCommand } from "@/Lib/Shiki";

type StarterKit = {
    name: string;
    slug: string;
    description: string;
    short_description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    setup_time_minutes: number;
    stacks: Stack[];
    features: string[];
    version: Version;
    steps: Step[];
    stats: Stats;
};

type Stack = {
    name: string;
    version: string;
};

type Step = {
    title: string;
    description: string;
    command: string;
    order: number;
};

type Version = {
    number: string;
    repo_url: string;
    branch: string;
    install_type: "git" | "zip" | string;
    install_command: string;
    release_notes: string | null;
};

type Stats = {
    installs: number;
    last_installed_at: string | null;
};

export default function Show({ starterKit }: { starterKit: StarterKit }) {
    return (
        <MainLayout>
            <Head title="Laravel Inertia" />
            <section className="mx-auto max-w-6xl bg-white px-6 py-16 text-slate-900">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight">
                        Install {starterKit.name}
                    </h1>
                    <p className="max-w-2xl text-lg text-slate-600">
                        {starterKit.description}
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-20">
                    {starterKit.steps.map((step) => (
                        <Step key={step.order} step={step} />
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}

function Step({ step }: { step: Step }) {
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        let mounted = true;

        highlightCommand(step.command).then((result) => {
            if (mounted) setHtml(result);
        });

        return () => {
            mounted = false;
        };
    }, [step.command]);

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Text */}
            <div className="flex gap-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-slate-600">
                    {step.order}
                </div>
                <div>
                    <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                    <p className="max-w-md text-slate-600">
                        {step.description}
                    </p>
                </div>
            </div>

            {/* Code Block */}
            <div className="relative min-w-0 rounded-xl bg-slate-900 p-6 text-sm shadow-lg">
                <div className="mb-3 text-xs text-slate-400">Terminal</div>

                {html ? (
                    <div
                        className="overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <pre className="text-slate-400">Loading...</pre>
                )}
            </div>
        </div>
    );
}
