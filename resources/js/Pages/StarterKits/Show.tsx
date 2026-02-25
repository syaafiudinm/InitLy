import MainLayout from "@/Layouts/MainLayout";
import { ArrowLeft, Copy, Check, Bookmark } from "lucide-react";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { highlightCommand } from "@/Lib/Shiki";

type StarterKit = {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    setup_time_minutes: number;
    stacks: Stack[];
    features: string[];
    version: Version | null;
    steps: Step[];
    stats: Stats | null;
    is_saved: boolean;
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
    const { auth } = usePage<{ auth: { user: any } }>().props;
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        if (!auth.user) {
            router.visit("/login");
            return;
        }

        setSaving(true);
        router.post(
            `/starter-kit/${starterKit.slug}/save`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <MainLayout>
            <Head title={`Install ${starterKit.name}`} />
            <section className="mx-auto max-w-6xl px-6 py-16 text-slate-900">
                {/* Header */}
                <div className="flex items-start justify-between mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Install {starterKit.name}
                            </h1>
                            {starterKit.version && (
                                <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                                    v{starterKit.version.number}
                                </span>
                            )}
                        </div>
                        <p className="max-w-xl text-lg text-slate-600">
                            {starterKit.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`
                                inline-flex items-center gap-2
                                border border-gray-800
                                text-sm font-medium
                                px-4 py-2.5
                                rounded-lg
                                shadow-[2px_2px_0px] shadow-gray-800
                                transition-all duration-200
                                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-800
                                disabled:opacity-50
                                ${starterKit.is_saved ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
                            `}
                        >
                            <Bookmark
                                className="h-4 w-4"
                                fill={
                                    starterKit.is_saved
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                            {starterKit.is_saved ? "Saved" : "Save"}
                        </button>
                        <a
                            href="/starter-kit"
                            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 mr-1" />
                            Back
                        </a>
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-10">
                    {starterKit.steps.map((step) => (
                        <StepBlock key={step.order} step={step} />
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

function StepBlock({ step }: { step: Step }) {
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
