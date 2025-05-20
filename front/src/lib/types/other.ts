import FaqItems from "@/lib/data/faqItems";

// faq page
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQListProps {
  items: typeof FaqItems;
}

export interface FAQItem {
  question: string;
  answer: string;
}

//pagination

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}