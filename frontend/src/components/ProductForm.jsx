import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./ui/Button";

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  category: Yup.string().required("Category is required"),
});

export default function ProductForm({ product, categories, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState(product?.product_images || []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      category: product?.category?._id || product?.category || "",
      product_images: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await onSubmit({
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.category,
          product_images: values.product_images,
        });

        if (!product) {
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
          <label htmlFor="name">Product Name</label>
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
          <label htmlFor="category">Category</label>
            <select
              className="input-field mt-2"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="field-error">{formik.errors.category}</div>
            )}
        </div>

        <div>
          <label htmlFor="price">Price</label>
            <input
              type="number"
              className="input-field mt-2"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="field-error">{formik.errors.price}</div>
            )}
        </div>

        <div>
          <label htmlFor="product_images">Product Images</label>
            <input
              type="file"
              className="file-field mt-2"
              id="product_images"
              name="product_images"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files || []);
                formik.setFieldValue("product_images", files);
                setPreviewImages(
                  files.length ? files.map((file) => URL.createObjectURL(file)) : []
                );
              }}
            />
            {previewImages.length ? (
              <div className="upload-preview">
                {previewImages.map((image, index) => (
                  <img key={`${image}-${index}`} src={image} alt={`Preview ${index + 1}`} />
                ))}
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
        {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
      </Button>
    </form>
  );
}
