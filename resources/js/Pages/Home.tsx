import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="mb-8">
                        <div className="w-[900px]">
                            <section className="">
                                <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16">
                                    <h1 className="mb-6 text-4xl font-semibold tracking-tighter text-heading md:text-5xl lg:text-6xl text-gray-700">
                                        We invest in the world’s potential
                                    </h1>
                                    <p className="mb-8 font-light md:text-xl text-gray-700">
                                        Here at Flowbite we focus on markets
                                        where technology, innovation, and
                                        capital can unlock long-term value and
                                        drive economic growth.
                                    </p>
                                    <div className="space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
                                        <Link
                                            href="/starter-kit"
                                            className="inline-flex items-center justify-center bg-gray-700 text-white rounded-sm box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-5 py-3 focus:outline-none"
                                        >
                                            Getting started
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                            <span>Laravel 12</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                            <span>React 18</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                            <span>Inertia.js</span>
                        </div>
                    </div>
                    <h1 className="text-lg font-light text-gray-900 mt-8 tracking-tight">
                        This App Build With Laravel Inertia React StarterKit
                    </h1>

                    <p className="text-gray-500 text-sm mb-8">By InitLy</p>
                </div>
            </div>
        </>
    );
}
