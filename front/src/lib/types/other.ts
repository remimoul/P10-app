import FaqItems from "@/lib/data/faqItems";

//navbar
export type AccountButtonProps = {
  onClick: () => void;
  className?: string;
};

//footer
export interface NextRaceCardProps {
  socialClass: string;
  raceName?: string;
  raceDate?: string;
  raceTime?: string;
}

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
