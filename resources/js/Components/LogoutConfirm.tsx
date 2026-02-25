import { router } from "@inertiajs/react";

type LogoutConfirmProps = {
    open: boolean;
    onClose: () => void;
};

export default function LogoutConfirm({ open, onClose }: LogoutConfirmProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal */}
            <div
                className="
                    relative w-full max-w-sm
                    rounded-md bg-gray-50 p-6
                    border border-gray-800
                    shadow-[4px_4px_0px] shadow-gray-800
                "
            >
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-400">
                    Logout Confirmation
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    Are you sure you want to logout?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="
                            text-sm font-medium text-slate-600
                            px-4 py-1.5 rounded-md
                            border border-transparent
                            transition-all duration-200
                            hover:border-gray-800 hover:shadow-[2px_2px_0px] hover:shadow-gray-800
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => router.post("/logout")}
                        className="
                            text-sm font-medium text-red-600
                            px-4 py-1.5 rounded-md
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
        </div>
    );
}
