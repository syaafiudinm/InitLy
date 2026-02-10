import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

type StarterKit = {
    id: number;
    name: string;
    slug: string;
    description: string;
};

type IndexProps = {
    starterKits: {
        data: StarterKit[];
    };
};

export default function Index({ starterKits }: IndexProps) {
    return (
        <MainLayout>
            <Head title="Starter Kits" />
            <div className="mx-auto max-w-6xl px-6 py-16">
                <div className="mb-16">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight">
                        Getting Started
                    </h1>
                    <p className="max-w-2xl text-lg text-slate-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nemo, porro officiis similique sunt a quod deserunt
                        excepturi cum harum vitae!
                        <br />
                        <br />A collection of clean, production-ready starter
                        kits for modern full-stack web development.
                    </p>
                </div>

                <h2 className="mb-8 text-2xl font-semibold">Starter Kits</h2>

                <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {starterKits.data.map((kit) => (
                        <Card key={kit.slug} kit={kit} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

type CardProps = {
    kit: StarterKit;
};

function Card({ kit }: CardProps) {
    return (
        <Link
            href={`/starter-kit/${kit.slug}`}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 transition hover:bg-slate-50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300">
                <img
                    src="https://www.neuronworks.co.id/wp-content/uploads/2024/11/laravel-logowine-677e34f3ed94c-scaled.webp"
                    alt="Logo"
                />
            </div>

            <div>
                <h3 className="font-semibold">
                    {kit.name}
                    <span className="px-2 text-slate-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                        &gt;
                    </span>
                </h3>

                <p className="mt-1 text-sm text-slate-600">{kit.description}</p>
            </div>
        </Link>
    );
}
