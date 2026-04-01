import React from "react";
import Button from "./ui/Button";

export default function ConfirmDialog({
    open = false,
    title = "Confirm Action",
    message = "Are you sure?",
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    isDangerous = false,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/50"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm text-slate-600">{message}</p>

                <div className="mt-6 flex gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        variant={isDangerous ? "danger" : "primary"}
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? "Processing..." : confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
