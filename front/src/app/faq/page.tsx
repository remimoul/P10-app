import FaqItems from "@/lib/data/faqItems";
import FAQHeader from "@/components/Faq/FAQHeader";
import FAQList from "@/components/Faq/FAQList";

const Faq = () => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <FAQHeader />
          <FAQList items={FaqItems} />
        </div>
      </main>
    </div>
  );
};

export default Faq;
