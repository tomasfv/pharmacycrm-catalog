"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

export function BackButton({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-primary-50 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="w-7 h-7 text-primary-600" />
      </button>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}
