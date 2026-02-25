import { Head, useForm, Link } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 px-8 py-10">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
                                Create Account
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Join InitLy to save and manage your starter kits
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none transition-colors"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Your name"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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
                                    placeholder="you@example.com"
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
                                    placeholder="Min. 8 characters"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none transition-colors"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Confirm your password"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing
                                    ? "Creating account..."
                                    : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                            <span>InitLy</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
