import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./ui/Button";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
});

export default function CategoryForm({ category, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(category?.category_image || "");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      category_image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await onSubmit({
          name: values.name,
          description: values.description,
          category_image: values.category_image,
        });

        if (!category) {
          resetForm();
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name">Category Name</label>
        <input
          type="text"
          className="input-field mt-2"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="field-error">{formik.errors.name}</div>
        )}
        </div>

        <div>
          <label htmlFor="category_image">Category Image</label>
          <input
            type="file"
            className="file-field mt-2"
            id="category_image"
            name="category_image"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue("category_image", file);
              setPreview(file ? URL.createObjectURL(file) : category?.category_image || "");
            }}
          />
          {preview ? (
            <div className="upload-preview">
              <img src={preview} alt="Category preview" />
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className="textarea-field mt-2"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="field-error">{formik.errors.description}</div>
        )}
      </div>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
      </Button>
    </form>
  );
}
