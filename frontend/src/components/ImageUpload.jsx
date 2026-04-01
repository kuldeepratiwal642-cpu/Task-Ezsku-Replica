import React, { useState } from "react";
import Button from "./ui/Button";

export default function ImageUpload({
    onFileSelect,
    multiple = false,
    maxSize = 5 * 1024 * 1024, // 5MB
    acceptedTypes = ["image/jpeg", "image/png", "image/jpg"],
}) {
    const [preview, setPreview] = useState(multiple ? [] : null);
    const [error, setError] = useState(null);

    const validateFile = (file) => {
        if (!acceptedTypes.includes(file.type)) {
            return "Invalid file type. Please upload JPEG or PNG images.";
        }
        if (file.size > maxSize) {
            return `File size exceeds ${maxSize / 1024 / 1024}MB limit.`;
        }
        return null;
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        setError(null);

        // Validate files
        for (const file of files) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        if (multiple) {
            const newPreviews = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setPreview(newPreviews);
            onFileSelect(files);
        } else {
            const file = files[0];
            if (file) {
                setPreview({
                    file,
                    preview: URL.createObjectURL(file),
                });
                onFileSelect(file);
            }
        }
    };

    const handleRemove = (index) => {
        if (multiple) {
            const newPreviews = preview.filter((_, i) => i !== index);
            setPreview(newPreviews);
            onFileSelect(newPreviews.map((p) => p.file));
        } else {
            setPreview(null);
            onFileSelect(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* Upload Input */}
            <div className="relative">
                <input
                    type="file"
                    multiple={multiple}
                    accept={acceptedTypes.join(",")}
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                />
                <label
                    htmlFor="image-upload"
                    className="block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 p-8 text-center hover:border-blue-400 hover:bg-blue-50"
                >
                    <div className="text-3xl mb-2">📷</div>
                    <p className="font-medium text-slate-700">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                        PNG, JPG up to {maxSize / 1024 / 1024}MB
                    </p>
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded bg-red-50 p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Preview */}
            {multiple ? (
                preview && preview.length > 0 && (
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {preview.map((item, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={item.preview}
                                    alt={`Preview ${index + 1}`}
                                    className="h-24 w-24 rounded object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="absolute -right-2 -top-2 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                preview && (
                    <div className="relative w-24">
                        <img
                            src={preview.preview}
                            alt="Preview"
                            className="h-24 w-24 rounded object-cover border border-slate-200"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(0)}
                            className="absolute -right-2 -top-2 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                            ✕
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
