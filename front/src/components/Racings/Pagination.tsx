"use client";

import { PaginationProps } from "@/lib/types/other";

function getPageNumbers(current: number, total: number) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l: number | undefined = undefined;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (let i = 0; i < range.length; i++) {
    if (l !== undefined) {
      if (range[i] - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (range[i] - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(range[i]);
    l = range[i];
  }
  return rangeWithDots;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const GoBack = currentPage > 1;
  const GoNext = currentPage < totalPages;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="w-full flex justify-center pt-8">
      <div
        className="flex gap-2 items-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-2 sm:overflow-x-visible"
        style={{ maxWidth: '100vw' }}
      >
        {/* Previous */}
        <button
          onClick={() => GoBack && onPageChange(currentPage - 1)}
          disabled={!GoBack}
          className={`min-w-[40px] px-3 py-2 text-lg rounded-full border transition-all
            ${
              GoBack
                ? "text-gray-600 hover:text-red-600 border-gray-300 hover:border-red-400"
                : "text-gray-300 border-gray-200 cursor-not-allowed"
            }`}
        >
          ←
        </button>

        {pageNumbers.map((page, idx) =>
          page === '...'
            ? (
              <span key={"ellipsis-" + idx} className="min-w-[40px] px-3 py-2 text-lg text-gray-400 select-none">...</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(Number(page))}
                className={`min-w-[40px] px-3 py-2 text-lg font-semibold rounded-full border transition-all
                  ${
                    page === currentPage
                      ? "bg-[var(--secondary-red)] text-white border-[var(--secondary-red)]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-red-500 hover:text-[var(--secondary-red)]"
                  }`}
              >
                {page}
              </button>
            )
        )}

        <button
          onClick={() => GoNext && onPageChange(currentPage + 1)}
          disabled={!GoNext}
          className={`min-w-[40px] px-3 py-2 text-lg rounded-full border transition-all
            ${
              GoNext
                ? "text-gray-600 hover:text-[var(--secondary-red)] border-gray-300 hover:border-[var(--secondary-red)]"
                : "text-gray-300 border-gray-200 cursor-not-allowed"
            }`}
        >
          →
        </button>
      </div>
    </div>
  );
};
