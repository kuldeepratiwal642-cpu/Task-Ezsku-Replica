import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function ServiceDataLoader({
    serviceCall,
    onLoad,
    loadingComponent = null,
    errorComponent = null,
    emptyComponent = null,
    children,
    retryKey = null,
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        loadData();
    }, [retryKey]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await serviceCall();
            setData(result);
            if (onLoad) onLoad(result);
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message || err?.message || "Failed to load data";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            loadingComponent || (
                <Card className="p-6">
                    <div className="space-y-4">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                    </div>
                </Card>
            )
        );
    }

    if (error) {
        return (
            errorComponent || (
                <Card className="p-6">
                    <div className="space-y-4">
                        <p className="text-sm text-red-600">{error}</p>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={loadData}
                            size="sm"
                        >
                            Try Again
                        </Button>
                    </div>
                </Card>
            )
        );
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return (
            emptyComponent || (
                <Card className="p-6 text-center">
                    <p className="text-sm text-slate-500">No data available</p>
                </Card>
            )
        );
    }

    return children ? children(data, loadData) : <div>{JSON.stringify(data)}</div>;
}
