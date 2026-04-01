import React from "react";

const variantClassMap = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300",
};

export default function Button({
  as: Component = "button",
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
    variantClassMap[variant] || variantClassMap.primary
  } ${className}`.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
