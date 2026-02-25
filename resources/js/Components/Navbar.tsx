import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { Bookmark } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { auth } = usePage<PageProps>().props;

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            router.post("/logout");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-gray-50">
            <nav className="mx-auto max-w-6xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* LOGO */}
                    <Link href="/" className="text-lg font-bold tracking-tight">
                        InitLy
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href="/"
                            className="
                                text-sm font-medium text-slate-600
                                px-3 py-1.5 rounded-md
                                border border-transparent
                                transition-all duration-200
                                hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            "
                        >
                            Home
                        </Link>
                        <Link
                            href="/starter-kit"
                            className="
                                text-sm font-medium text-slate-600
                                px-3 py-1.5 rounded-md
                                border border-transparent
                                transition-all duration-200
                                hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            "
                        >
                            Starter Kits
                        </Link>

                        {auth.user ? (
                            <>
                                <Link
                                    href="/saved-kits"
                                    className="
                                        inline-flex items-center gap-1.5
                                        text-sm font-medium text-slate-600
                                        px-3 py-1.5 rounded-md
                                        border border-transparent
                                        transition-all duration-200
                                        hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    "
                                >
                                    <Bookmark className="h-3.5 w-3.5" />
                                    Saved
                                </Link>
                                <div className="h-4 w-px bg-slate-300" />
                                <span className="text-sm text-gray-700">
                                    {auth.user.name} 👋
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="
                                        text-sm font-medium text-red-600
                                        px-3 py-1.5 rounded-md
                                        border border-transparent
                                        transition-all duration-200
                                        hover:border-red-600 hover:shadow-[2px_2px_0px] hover:shadow-red-600
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    "
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="
                                        text-sm font-medium text-slate-600
                                        px-3 py-1.5 rounded-md
                                        border border-transparent
                                        transition-all duration-200
                                        hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                    "
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="
                                        text-sm font-medium
                                        text-white bg-gray-800
                                        px-4 py-1.5 rounded-md
                                        border border-gray-800
                                        shadow-[2px_2px_0px] shadow-gray-500
                                        transition-all duration-200
                                        hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                        active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-500
                                    "
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="
                            inline-flex items-center justify-center
                            rounded-md p-2
                            text-slate-600
                            border border-transparent
                            transition-all duration-200
                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            md:hidden
                        "
                    >
                        {open ? "✕" : "☰"}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {open && (
                    <div className="pb-4 md:hidden">
                        <div className="flex flex-col gap-2 border-t border-slate-200 pt-4">
                            <Link
                                href="/"
                                className="
                                    text-sm font-medium text-slate-600
                                    px-3 py-2 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                "
                                onClick={() => setOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/starter-kit"
                                className="
                                    text-sm font-medium text-slate-600
                                    px-3 py-2 rounded-md
                                    border border-transparent
                                    transition-all duration-200
                                    hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                "
                                onClick={() => setOpen(false)}
                            >
                                Starter Kits
                            </Link>

                            {auth.user ? (
                                <>
                                    <Link
                                        href="/saved-kits"
                                        className="
                                            inline-flex items-center gap-1.5
                                            text-sm font-medium text-slate-600
                                            px-3 py-2 rounded-md
                                            border border-transparent
                                            transition-all duration-200
                                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                        "
                                        onClick={() => setOpen(false)}
                                    >
                                        <Bookmark className="h-3.5 w-3.5" />
                                        Saved Kits
                                    </Link>
                                    <div className="border-t border-slate-200 pt-3 mt-1">
                                        <div className="flex items-center justify-between px-3">
                                            <span className="text-sm text-gray-700">
                                                {auth.user.name} 👋
                                            </span>
                                            <button
                                                onClick={() => {
                                                    setOpen(false);
                                                    handleLogout();
                                                }}
                                                className="
                                                    text-sm font-medium text-red-600
                                                    px-3 py-1.5 rounded-md
                                                    border border-transparent
                                                    transition-all duration-200
                                                    hover:border-red-600 hover:shadow-[2px_2px_0px] hover:shadow-red-600
                                                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                                "
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="border-t border-slate-200 pt-3 mt-1 flex flex-col gap-2">
                                    <Link
                                        href="/login"
                                        className="
                                            text-sm font-medium text-slate-600
                                            px-3 py-2 rounded-md
                                            border border-transparent
                                            transition-all duration-200
                                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                        "
                                        onClick={() => setOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="
                                            text-sm font-medium text-center
                                            text-white bg-gray-800
                                            px-4 py-2 rounded-md
                                            border border-gray-800
                                            shadow-[2px_2px_0px] shadow-gray-500
                                            transition-all duration-200
                                            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                                            active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px] active:shadow-gray-500
                                        "
                                        onClick={() => setOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
