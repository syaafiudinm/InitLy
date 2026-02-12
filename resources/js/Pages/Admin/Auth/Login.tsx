import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="Admin Login" />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 px-8 py-10">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
                                Admin Login
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Sign in to manage your starter kits
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none transition-colors"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="admin@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none transition-colors"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 text-gray-700 focus:ring-gray-700 border-gray-300 rounded"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-gray-600"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? "Signing in..." : "Sign in"}
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                            <span>Laravel Inertia React</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
