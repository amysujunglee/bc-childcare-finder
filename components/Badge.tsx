"use client";

interface BadgeProps {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "default";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  size = "sm",
  children,
  className = "",
}: BadgeProps) {
  const variantClasses: Record<string, string> = {
    primary: "bg-primary-dark text-white",
    secondary: "bg-neutral-border text-primary-dark",
    accent: "bg-primary-green text-white",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    default: "bg-gray-200 text-gray-800",
  };

  const sizeClasses: Record<string, string> = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
