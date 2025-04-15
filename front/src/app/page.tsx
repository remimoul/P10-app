import Header from "@/components/Home/Header";
import Racing from "@/components/Home/Racing";
import HowToPlay from "@/components/Home/HowToPlay";

const Home = () => {
  return (
    <div>
      <main className="min-h-screen py-14 lg:py-16 sm:py-18 bg-gray-50">
        <Header />
        <Racing />
        <HowToPlay />
      </main>
    </div>
  );
};

export default Home;
