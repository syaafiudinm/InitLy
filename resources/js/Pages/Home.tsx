import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function Home() {
    return (
        <MainLayout>
            <Head title="InitLy - Quick Starter Kit Installer" />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Content */}
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
                                className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <span className="mr-2">🚀</span>
                                Explore Starter Kits
                            </Link>

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
        </MainLayout>
    );
}
