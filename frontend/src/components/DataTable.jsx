import React from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    error = null,
    onRetry,
    emptyMessage = "No data available",
    rowKey = "_id",
    striped = true,
}) {
    if (loading) {
        return (
            <Card className="p-6">
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-10 animate-pulse rounded bg-slate-100"
                        />
                    ))}
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="p-6">
                <div className="space-y-4 text-center">
                    <p className="text-sm text-red-600">{error}</p>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onRetry}
                        size="sm"
                    >
                        Try Again
                    </Button>
                </div>
            </Card>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Card className="p-6 text-center">
                <p className="text-sm text-slate-500">{emptyMessage}</p>
            </Card>
        );
    }

    return (
        <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-700"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row[rowKey] || rowIndex}
                            className={`border-b border-slate-100 transition ${striped && rowIndex % 2 === 0 ? "bg-slate-50" : ""
                                } hover:bg-slate-100`}
                        >
                            {columns.map((column) => (
                                <td
                                    key={`${row[rowKey]}-${column.key}`}
                                    className="px-4 py-3 text-sm text-slate-700"
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : row[column.key] || "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
