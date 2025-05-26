import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQListProps } from "@/lib/types/other";

const FAQList = ({ items }: FAQListProps) => {
  return (
    <div className="bg-gray-50 py-6 px-8 lg:px-10">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-red-600 transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg text-gray-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQList;
