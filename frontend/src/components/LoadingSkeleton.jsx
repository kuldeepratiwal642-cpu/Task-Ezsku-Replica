import React from "react";
import Card from "./ui/Card";

export default function LoadingSkeleton({
    count = 1,
    type = "card", // "card", "text", "line"
    rows = 3,
}) {
    if (type === "text") {
        return (
            <div className="space-y-2">
                {[...Array(rows)].map((_, i) => (
                    <div
                        key={i}
                        className="h-4 w-full animate-pulse rounded bg-slate-200"
                    />
                ))}
            </div>
        );
    }

    if (type === "line") {
        return (
            <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
        );
    }

    // Default: card skeleton
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(count)].map((_, i) => (
                <Card key={i} className="p-4">
                    <div className="space-y-4">
                        {/* Header */}
                        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

                        {/* Image placeholder */}
                        <div className="h-40 w-full animate-pulse rounded bg-slate-100" />

                        {/* Content lines */}
                        {[...Array(rows)].map((_, j) => (
                            <div
                                key={j}
                                className={`h-3 animate-pulse rounded bg-slate-200 ${j === rows - 1 ? "w-2/3" : "w-full"
                                    }`}
                            />
                        ))}

                        {/* Button placeholder */}
                        <div className="h-10 w-full animate-pulse rounded bg-slate-300" />
                    </div>
                </Card>
            ))}
        </div>
    );
}
