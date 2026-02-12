import MainLayout from "@/Layouts/MainLayout";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
            <section className="mx-auto max-w-6xl bg-gray-50 px-6 py-16 text-slate-900">
                {/* Header */}
                <div className="flex">
                    <div className="mb-16">
                        <h1 className="mb-4 text-3xl font-bold tracking-tight">
                            Install {starterKit.name}
                        </h1>
                        <p className="max-w-xl text-lg text-slate-600">
                            {starterKit.description}
                        </p>
                    </div>
                    <div className="ml-auto">
                        <a
                            href="/starter-kit"
                            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
                        >
                            <ArrowLeft className="h-6 w-6 mr-2 mt-1" />
                            Back
                        </a>
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-10">
                    {starterKit.steps.map((step) => (
                        <Step key={step.order} step={step} />
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
            // Fallback for older browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (fallbackErr) {
                console.error("Fallback copy failed:", fallbackErr);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-xs rounded border border-slate-700"
            title="Copy to clipboard"
        >
            {copied ? (
                <>
                    <Check className="h-3 w-3" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                </>
            )}
        </button>
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
                    <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                    <p className="max-w-md text-sm text-slate-600">
                        {step.description}
                    </p>
                </div>
            </div>

            {/* Code Block with Copy Button - ENHANCED */}
            <div className="relative min-w-0 rounded-xl bg-slate-900 p-6 text-sm shadow-lg">
                <div className="mb-3 text-xs text-slate-400">Terminal</div>

                <CopyButton text={step.command} />

                {html ? (
                    <div
                        className="overflow-x-auto"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <pre className="text-slate-400 text-sm">Loading...</pre>
                )}
            </div>
        </div>
    );
}
