import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../components/CategoryForm";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import PageTransition from "../components/ui/PageTransition";
import Button from "../components/ui/Button";
import { WEB_URL } from "../config/ApiConfig";
import { categoryService } from "../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      if (editingCategory) {
        await categoryService.update({ id: editingCategory._id, ...payload });
        toast.success("Category updated successfully");
      } else {
        await categoryService.create(payload);
        toast.success("Category added successfully");
      }

      setEditingCategory(null);
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this category?");
    if (!confirmed) return;

    try {
      await categoryService.remove({ id });
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete category");
    }
  };

  return (
    <PageTransition>
      <div className="app-shell">
        <div className="page-header">
          <div>
            <h2 className="page-title">Categories</h2>
            <p className="page-subtitle">Create, edit, and delete categories.</p>
          </div>
          <Button
            type="button"
            variant={showForm ? "secondary" : "primary"}
            onClick={() => {
              setEditingCategory(null);
              setShowForm((prev) => !prev);
            }}
          >
            {showForm ? "Close Form" : "Add Category"}
          </Button>
        </div>

        {showForm ? (
          <Card className="mb-6">
            <CategoryForm category={editingCategory} onSubmit={handleSubmit} />
          </Card>
        ) : null}

        {loading ? (
          <Card className="p-5">
            <p className="text-sm text-slate-500">Loading categories...</p>
          </Card>
        ) : categories.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Card key={category._id} className="flex h-full flex-col overflow-hidden">
                <div className="h-44 bg-slate-100">
                  {category.category_image ? (
                    <img
                      src={`${WEB_URL}/${category.category_image}`}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-500">
                    {category.description || "No description provided."}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingCategory(category);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => handleDelete(category._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No categories found"
            description="Start by creating your first category."
            action={
              <Button type="button" variant="primary" onClick={() => setShowForm(true)}>
                Add Category
              </Button>
            }
          />
        )}
      </div>
    </PageTransition>
  );
}
