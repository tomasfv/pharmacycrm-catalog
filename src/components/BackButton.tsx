"use client";

import { useRouter } from "next/navigation";

export function BackButton({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => router.back()}
        className="text-primary-600 flex items-center justify-center w-9 h-9 rounded-full hover:bg-primary-50 transition-colors"
      >
        <p className="text-5xl font-bold text-primary-600">←</p>
      </button>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}
