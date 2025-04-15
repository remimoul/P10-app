"use client";

import { PaginationProps } from "@/lib/types";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const GoBack = currentPage > 1;
  const GoNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-2 pt-8">
      {/* Previous */}
      <button
        onClick={() => GoBack && onPageChange(currentPage - 1)}
        disabled={!GoBack}
        className={`px-3 py-1.5 text-sm rounded-full border transition-all
          ${
            GoBack
              ? "text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-400"
              : "text-gray-300 border-gray-200 cursor-not-allowed"
          }`}
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 text-sm font-semibold rounded-full border transition-all
            ${
              page === currentPage
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-red-500 hover:text-red-600"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => GoNext && onPageChange(currentPage + 1)}
        disabled={!GoNext}
        className={`px-3 py-1.5 text-sm rounded-full border transition-all
          ${
            GoNext
              ? "text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-400"
              : "text-gray-300 border-gray-200 cursor-not-allowed"
          }`}
      >
        Next →
      </button>
    </div>
  );
};
