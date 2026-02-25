import { useState, useEffect, useRef } from "react";

const MOCK_STEPS = [
    {
        order: 1,
        title: "Run the installer",
        description:
            "Jalankan perintah berikut di terminal untuk mulai instalasi starter kit pilihanmu.",
        command: "npx create-initly <starter-kit-name>",
    },
    {
        order: 2,
        title: "Masuk ke direktori project",
        description:
            "Pindah ke folder project yang baru saja dibuat oleh installer.",
        command: "cd <project-name>",
    },
    {
        order: 3,
        title: "Setup Project",
        description:
            "Setiap starter kit punya langkah konfigurasi masing-masing, seperti menyalin .env atau mengatur koneksi database.",
        command: null, // contoh step tanpa command
    },
    {
        order: 4,
        title: "Jalankan aplikasi",
        description:
            "Aplikasi siap dijalankan! Buka di browser dan mulai kembangkan projectmu.",
        command: "npm run dev",
    },
];

export default function UsageModal({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [copied, setCopied] = useState(false);
    const [visible, setVisible] = useState(false);
    const [terminalLines, setTerminalLines] = useState([]);
    const terminalRef = useRef(null);

    const steps = MOCK_STEPS;
    const step = steps[currentStep];
    const isLast = currentStep === steps.length - 1;
    const isFirst = currentStep === 0;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setVisible(true), 10);
            setCurrentStep(0);
            setTerminalLines([]);
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !step?.command) {
            setTerminalLines([]);
            return;
        }

        setTerminalLines([]);

        const lines = [
            { text: `$ ${step.command}`, color: "text-white", delay: 0 },
            { text: "...", color: "text-gray-500", delay: 350 },
            { text: "✓ Done", color: "text-green-400", delay: 800 },
        ];

        const timers = lines.map(({ text, color, delay }) =>
            setTimeout(() => {
                setTerminalLines((prev) => [...prev, { text, color }]);
                if (terminalRef.current)
                    terminalRef.current.scrollTop =
                        terminalRef.current.scrollHeight;
            }, delay),
        );

        return () => timers.forEach(clearTimeout);
    }, [currentStep, isOpen]);

    useEffect(() => {
        const handler = (e) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && !isLast) setCurrentStep((s) => s + 1);
            if (e.key === "ArrowLeft" && !isFirst) setCurrentStep((s) => s - 1);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, isFirst, isLast, onClose]);

    const handleCopy = () => {
        if (!step?.command) return;
        navigator.clipboard.writeText(step.command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-xl bg-gray-100 border border-gray-700/80 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
                    visible
                        ? "scale-100 translate-y-0"
                        : "scale-95 translate-y-4"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 ">
                    <div>
                        <h2 className="text-gray=900 font-semibold text-sm">
                            How to use{" "}
                            <code className="text-yellow-500 font-mono">
                                create-initly
                            </code>
                        </h2>
                        <p className="text-gray-500 text-xs mt-0.5 ">
                            Ikuti langkah-langkah berikut untuk memulai
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-700"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="h-0.5 bg-gray-800">
                    <div
                        className="h-full bg-white transition-all duration-500 ease-out"
                        style={{
                            width: `${((currentStep + 1) / steps.length) * 100}%`,
                        }}
                    />
                </div>

                {/* Step indicators */}
                <div className="flex items-center gap-2 px-5 pt-4">
                    {steps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentStep(i)}
                            className={`flex items-center justify-center rounded-full font-mono font-bold text-xs transition-all duration-200 ${
                                i === currentStep
                                    ? "w-7 h-7 bg-white text-gray-900 shadow"
                                    : i < currentStep
                                      ? "w-5 h-5 bg-green-500/20 text-green-400 border border-green-500/40"
                                      : "w-5 h-5 bg-gray-100 text-gray-600 border border-gray-300"
                            }`}
                        >
                            {i < currentStep ? (
                                <svg
                                    className="w-2.5 h-2.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                i + 1
                            )}
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-gray-500 font-mono">
                        {currentStep + 1} / {steps.length}
                    </span>
                </div>

                {/* Content */}
                <div className="px-5 pt-4 pb-2 min-h-[200px]">
                    <h3 className="text-gray-900 font-semibold text-base">
                        {step?.title}
                    </h3>
                    <p className="text-gray-700 text-sm mt-1 mb-4 leading-relaxed">
                        {step?.description}
                    </p>

                    {/* Terminal — hanya muncul kalau ada command */}
                    {step?.command ? (
                        <div className="bg-gray-800 border border-gray-700/50 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="text-xs px-2 py-0.5 rounded transition-colors text-gray-500 hover:text-white hover:bg-gray-700 flex items-center gap-1"
                                >
                                    {copied ? (
                                        <span className="text-green-400 flex items-center gap-1">
                                            <svg
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Copied!
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <svg
                                                className="w-3 h-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Copy
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div
                                ref={terminalRef}
                                className="p-4 font-mono space-y-1.5 min-h-[80px]"
                            >
                                {terminalLines.map((line, i) => (
                                    <div
                                        key={i}
                                        className={`${line.color} text-xs leading-relaxed`}
                                    >
                                        {line.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Placeholder kalau step tidak punya command */
                        <div className="border border-dashed border-gray-700 rounded-xl p-4 text-center">
                            <p className="text-gray-500 text-xs">
                                Langkah ini tidak memerlukan perintah terminal.
                                <br />
                                Ikuti instruksi di atas sesuai starter kit kamu.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-4 mt-2">
                    <button
                        onClick={() => setCurrentStep((s) => s - 1)}
                        disabled={isFirst}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-gray-800 flex items-center gap-1.5"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back
                    </button>

                    <span className="text-gray-600 text-xs hidden sm:inline">
                        ← → navigate
                    </span>

                    <button
                        onClick={() =>
                            isLast ? onClose() : setCurrentStep((s) => s + 1)
                        }
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                            isLast
                                ? "bg-white text-gray-900 hover:bg-gray-100"
                                : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                    >
                        {isLast ? (
                            "🎉 Let's go!"
                        ) : (
                            <>
                                Next
                                <svg
                                    className="w-4 h-4"
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
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
