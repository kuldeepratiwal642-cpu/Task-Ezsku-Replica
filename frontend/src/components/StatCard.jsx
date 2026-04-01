import React from "react";
import Card from "./ui/Card";

export default function StatCard({ title, value }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-semibold text-slate-900">{value}</h3>
    </Card>
  );
}
