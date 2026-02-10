import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <nav className="mx-auto max-w-6xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* LOGO */}
                    <Link href="/" className="text-lg font-bold tracking-tight">
                        InitLy
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden items-center gap-6 md:flex">
                        <Link
                            href="/"
                            className="text-sm text-slate-600 transition hover:text-slate-900"
                        >
                            Home
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm text-slate-600 transition hover:text-slate-900"
                        >
                            Login
                        </Link>
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition hover:bg-slate-50 md:hidden"
                    >
                        ☰
                    </button>
                </div>

                {/* MOBILE MENU */}
                {open && (
                    <div className="pb-4 md:hidden">
                        <div className="flex flex-col gap-4 border-t border-slate-200 pt-4">
                            <Link
                                href="/"
                                className="text-sm text-slate-600 transition hover:text-slate-900"
                            >
                                Home
                            </Link>
                            <Link
                                href="/login"
                                className="text-sm text-slate-600 transition hover:text-slate-900"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
