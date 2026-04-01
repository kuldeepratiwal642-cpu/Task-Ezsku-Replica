import React from "react";
import { WEB_URL } from "../config/ApiConfig";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function CategoryCard({
    category,
    onEdit,
    onDelete,
    showActions = true,
}) {
    const categoryImage = category?.category_image
        ? `${WEB_URL}/${category.category_image}`
        : null;

    return (
        <Card className="flex flex-col overflow-hidden transition hover:shadow-lg">
            {/* Category Image */}
            <div className="h-40 bg-gradient-to-br from-blue-50 to-slate-100">
                {categoryImage ? (
                    <img
                        src={categoryImage}
                        alt={category.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-slate-300">
                                {category.name?.[0]?.toUpperCase() || "C"}
                            </div>
                            <p className="mt-2 text-xs text-slate-400">{category.name}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Info */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold text-slate-900">
                    {category.name}
                </h3>

                <p className="mt-2 flex-1 line-clamp-2 text-sm text-slate-600">
                    {category.description || "No description provided."}
                </p>

                {showActions && (
                    <div className="mt-4 flex gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => onEdit?.(category)}
                            className="flex-1"
                        >
                            Edit
                        </Button>
                        <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete?.(category._id)}
                            className="flex-1"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
