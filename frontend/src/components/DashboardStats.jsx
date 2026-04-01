import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dashboardService } from "../services/dashboardService";
import Card from "./ui/Card";
import StatCard from "./StatCard";

export default function DashboardStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await dashboardService.getStats();
            setStats(response?.data || response);
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message || "Failed to load statistics";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-32 animate-pulse bg-slate-100" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Card className="p-6 text-center">
                <p className="text-sm text-red-600">{error}</p>
            </Card>
        );
    }

    const defaultStats = [
        {
            title: "Total Products",
            value: stats?.totalProducts || 0,
            change: stats?.productChange || 0,
        },
        {
            title: "Total Categories",
            value: stats?.totalCategories || 0,
            change: stats?.categoryChange || 0,
        },
        {
            title: "Total Sales",
            value: `Rs. ${stats?.totalSales || 0}`,
            change: stats?.salesChange || 0,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {defaultStats.map((stat) => (
                <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                />
            ))}
        </div>
    );
}
