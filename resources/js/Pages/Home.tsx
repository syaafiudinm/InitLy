import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <MainLayout>
            <Head title="Home" />
            <section className="bg-white text-slate-900">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    {/* Header */}
                    <div className="py-20 text-center">
                        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            We invest in the world's potential
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
                            Here at Flowbite we focus on markets where
                            technology, innovation, and capital can unlock
                            long-term value and drive economic growth.
                        </p>

                        <Link
                            href="/starter-kits"
                            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
                        >
                            Getting Started
                        </Link>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-10 flex items-center justify-center gap-8 text-sm text-slate-500">
                        <TechItem label="Laravel 12" />
                        <TechItem label="React 18" />
                        <TechItem label="Inertia.js" />
                    </div>

                    {/* Footer Text */}
                    <div className="text-center">
                        <h2 className="mb-2 text-lg font-light tracking-tight text-slate-900">
                            This App Build With Laravel Inertia React StarterKit
                        </h2>
                        <p className="text-sm text-slate-500">By InitLy</p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

function TechItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-800" />
            <span>{label}</span>
        </div>
    );
}
