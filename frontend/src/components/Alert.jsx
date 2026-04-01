import React, { useState, useEffect } from "react";

export default function Alert({
    type = "info", // "info", "success", "error", "warning"
    title,
    message,
    onClose,
    autoClose = true,
    autoCloseDelay = 5000,
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (autoClose && visible) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, autoCloseDelay);
            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseDelay, visible, onClose]);

    if (!visible) return null;

    const bgColor = {
        info: "bg-blue-50 border-blue-200",
        success: "bg-green-50 border-green-200",
        error: "bg-red-50 border-red-200",
        warning: "bg-yellow-50 border-yellow-200",
    }[type];

    const textColor = {
        info: "text-blue-800",
        success: "text-green-800",
        error: "text-red-800",
        warning: "text-yellow-800",
    }[type];

    const borderColor = {
        info: "border-l-blue-500",
        success: "border-l-green-500",
        error: "border-l-red-500",
        warning: "border-l-yellow-500",
    }[type];

    const icon = {
        info: "ℹ️",
        success: "✓",
        error: "✕",
        warning: "⚠",
    }[type];

    return (
        <div
            className={`rounded border-l-4 ${bgColor} ${borderColor} p-4`}
            role="alert"
        >
            <div className="flex items-start gap-3">
                <span className="text-xl">{icon}</span>
                <div className="flex-1">
                    {title && (
                        <h3 className={`font-semibold ${textColor}`}>{title}</h3>
                    )}
                    <p className={`mt-${title ? "1" : "0"} text-sm ${textColor}`}>
                        {message}
                    </p>
                </div>
                <button
                    onClick={() => {
                        setVisible(false);
                        if (onClose) onClose();
                    }}
                    className={`flex-shrink-0 ${textColor} hover:opacity-75`}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
