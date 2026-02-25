import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import UsageModal from "@/Components/UsageModal";

export default function Home() {
    const [showUsage, setShowUsage] = useState(false);

    return (
        <MainLayout>
            <Head title="InitLy - Quick Starter Kit Installer" />

            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 sm:mb-12 lg:mb-16">
                        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800">
                            Welcome to{" "}
                            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                                InitLy
                            </span>
                        </h1>

                        <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                            Skip the boilerplate and jumpstart your project with
                            production-ready starter kits. Build faster, ship
                            sooner.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                            <Link
                                href="/starter-kit"
                                className="
                                    w-full sm:w-auto
                                    inline-flex items-center justify-center gap-2
                                    border border-gray-800
                                    bg-gray-800
                                    text-white
                                    font-medium
                                    px-6 sm:px-8 py-3 sm:py-4
                                    rounded-lg
                                    shadow-[3px_3px_0px] shadow-gray-500
                                    transition-all duration-200
                                    hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:bg-gray-800
                                    active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px] active:shadow-gray-500
                                "
                            >
                                <span>🚀</span>
                                Explore Starter Kits
                            </Link>

                            {/* Usage Button — neobrutalism style */}
                            <button
                                onClick={() => setShowUsage(true)}
                                className="
                                    w-full sm:w-auto
                                    inline-flex items-center justify-center gap-2
                                    border border-gray-800
                                    bg-white
                                    text-gray-800
                                    font-medium
                                    px-6 sm:px-8 py-3 sm:py-4
                                    rounded-lg
                                    shadow-[3px_3px_0px] shadow-gray-800
                                    transition-all duration-200
                                    hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
                                    active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px] active:shadow-gray-800
                                "
                            >
                                {/* Terminal icon */}
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 256 256"
                                    height="18"
                                    width="18"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z" />
                                </svg>
                                How to use
                            </button>

                            <div className="flex items-center text-sm text-gray-500">
                                <span className="hidden sm:inline">
                                    or run:
                                </span>
                                <code className="ml-2 px-3 py-1 bg-gray-200 rounded text-gray-800 font-mono text-xs sm:text-sm">
                                    npx create-initly
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* CLI Command Showcase */}
                    <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-left max-w-2xl mx-auto">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-400 text-xs sm:text-sm ml-2">
                                Terminal
                            </span>
                        </div>
                        <div className="font-mono text-xs sm:text-sm">
                            <div className="text-gray-400 mb-1 sm:mb-2">
                                $ npx create-initly laravel-react
                            </div>
                            <div className="text-green-400 mb-1">
                                ✓ Fetching starter kit...
                            </div>
                            <div className="text-green-400 mb-1">
                                ✓ Cloning repository...
                            </div>
                            <div className="text-green-400 mb-1">
                                ✓ Installing dependencies...
                            </div>
                            <div className="text-yellow-400 mb-2 sm:mb-3">
                                🎉 Ready to code!
                            </div>
                            <div className="text-gray-400">
                                <span className="text-blue-400">cd</span>{" "}
                                laravel-react-starter &&
                                <span className="text-blue-400 ml-1">
                                    npm run dev
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <UsageModal
                isOpen={showUsage}
                onClose={() => setShowUsage(false)}
            />
        </MainLayout>
    );
}
