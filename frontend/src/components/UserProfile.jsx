import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { userService } from "../services/userService";
import { authService } from "../services/authService";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userService.getUserProfile();
            setUser(response?.data || currentUser);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to load profile");
            toast.error("Could not fetch user profile");
            setUser(currentUser);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Card className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 w-48 rounded bg-slate-200" />
                    <div className="h-4 w-96 rounded bg-slate-200" />
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">User Profile</h3>
                    <p className="mt-1 text-sm text-slate-500">Your account information</p>
                </div>

                {error && (
                    <div className="rounded bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <p className="mt-1 text-slate-900">{user?.name || "N/A"}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <p className="mt-1 text-slate-900">{user?.email || "N/A"}</p>
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={fetchUserProfile}
                        disabled={loading}
                    >
                        Refresh Profile
                    </Button>
                </div>
            </div>
        </Card>
    );
}
