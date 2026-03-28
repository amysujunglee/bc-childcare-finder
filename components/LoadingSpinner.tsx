"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-primary-green rounded-full opacity-10 animate-pulse" />
        <div className="absolute inset-1 bg-gradient-to-r from-primary-green to-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
