import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "./ui/Button";

export default function ServiceForm({
    onSubmit,
    fields = [],
    submitButtonText = "Submit",
    loading: externalLoading = false,
    onSuccess,
    onError,
    initialValues = {},
    validate,
}) {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files?.[0] : value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (validate) {
            const validationErrors = validate(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        }

        setLoading(true);
        try {
            await onSubmit(formData);
            toast.success("Operation completed successfully");
            setFormData(initialValues);
            setErrors({});
            if (onSuccess) onSuccess();
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error?.message || "Operation failed";
            toast.error(errorMessage);
            if (onError) onError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name} className="block text-sm font-medium text-slate-700">
                        {field.label}
                    </label>

                    {field.type === "textarea" ? (
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            rows={field.rows || 3}
                            className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder={field.placeholder}
                        />
                    ) : field.type === "select" ? (
                        <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">{field.placeholder || "Select..."}</option>
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type || "text"}
                            value={
                                field.type === "file" ? "" : formData[field.name] || ""
                            }
                            onChange={handleChange}
                            className="mt-2 w-full rounded border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder={field.placeholder}
                            accept={field.accept}
                        />
                    )}

                    {errors[field.name] && (
                        <p className="mt-1 text-xs text-red-600">{errors[field.name]}</p>
                    )}
                </div>
            ))}

            <Button
                type="submit"
                variant="primary"
                disabled={loading || externalLoading}
                className="w-full"
            >
                {loading || externalLoading ? "Processing..." : submitButtonText}
            </Button>
        </form>
    );
}
