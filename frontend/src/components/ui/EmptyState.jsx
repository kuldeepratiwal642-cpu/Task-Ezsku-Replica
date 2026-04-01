import React from "react";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
